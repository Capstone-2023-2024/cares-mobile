import type {
  ComplaintBaseProps,
  ComplaintProps,
} from '@cares/common/types/complaint';
import type {DocumentProps} from '@cares/common/types/media';
import {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {collectionRef} from '~/utils/firebase';
import {useComplaints} from '~/contexts/ComplaintContext';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useUniversal} from '~/contexts/UniversalContext';
import {OneSignal} from 'react-native-onesignal';
import {
  NEXT_PUBLIC_ONESIGNAL_APP_ID,
  NEXT_PUBLIC_ONESIGNAL_DEFAULT_ANDROID_CHANNEL_ID,
  NEXT_PUBLIC_ONESIGNAL_REST_API_KEY,
} from '@env';
import {NotificationProps} from '@cares/common/types/announcement';

/**TODO: Optimized this together with Mayor UI */
const RenderInputMessageContainer = () => {
  const {role, currentStudentInfo, adviserInfo, mayorInfo, queryId} =
    useUniversal();
  const {currentStudentComplaints, otherComplaints} = useComplaints();
  const {
    files,
    message,
    selectedChatId,
    selectedChatHead,
    newConcernDetails,
    setFiles,
    setMessage,
    setNewComplaints,
    setSelectedChatId,
    setSelectedChatHead,
  } = useContentManipulation();
  const [state, setState] = useState({
    sendLoading: false,
  });
  const placeholder =
    selectedChatId === 'class_section'
      ? 'Compose a message to send in your class section'
      : selectedChatHead === null && role !== 'mayor'
        ? 'Compose a new complaint'
        : 'Compose a message';

  const complaintRecord = currentStudentComplaints?.filter(
    props => props.id === selectedChatId,
  );
  const higherUpComplaintRecord = otherComplaints?.filter(
    props => props.id === selectedChatId,
  );
  const renderCondition =
    (complaintRecord.length > 0 &&
      complaintRecord[0]?.status === 'processing') ||
    (higherUpComplaintRecord.length > 0 &&
      higherUpComplaintRecord[0]?.status === 'processing');

  console.log(
    selectedChatId,
    selectedChatHead,
    newConcernDetails,
    renderCondition,
  );
  async function selectMultipleFile() {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });
      setFiles(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        ToastAndroid.show(
          'Canceled from multiple doc picker',
          ToastAndroid.SHORT,
        );
      } else {
        // console.log(err);
        Alert.alert('Image picker error');
      }
    }
  }
  async function handleUploadImage(names: string[]) {
    try {
      files.forEach(async ({uri}, index) => {
        Alert.alert(uri.toString(), names.toString());
        const reference = storage().ref(
          `concerns/${currentStudentInfo?.email}/${names[index]}`,
        );
        await reference.putFile(uri);
      });
      setFiles([]);
    } catch (err) {
      ToastAndroid.show('Error', ToastAndroid.SHORT);
      // console.log(err);
    }
  }
  function handleMessage(props: string) {
    setMessage(props);
  }
  /** TODO: Add notification. If sender is anonymous, currentStudentInfo is not loaded properly */
  async function handleSend() {
    setState(prevState => ({...prevState, sendLoading: true}));
    try {
      async function notifResponse(notifData: NotificationProps) {
        return await fetch('https://onesignal.com/api/v1/notifications', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Basic ${NEXT_PUBLIC_ONESIGNAL_REST_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            app_id: `${NEXT_PUBLIC_ONESIGNAL_APP_ID}`,
            ...notifData,
          }),
        });
      }
      if (
        (message.trim() !== '' || files.length > 0) &&
        currentStudentInfo?.studentNo !== 'null' &&
        queryId !== null
      ) {
        const isImage = files.length > 0;
        let complaint: ComplaintBaseProps = {
          timestamp: new Date().getTime(),
          sender:
            role === 'adviser'
              ? currentStudentInfo?.email ?? 'adviser'
              : currentStudentInfo?.studentNo ?? 'anonymous',
          message,
        };
        if (isImage) {
          const holder: DocumentProps['files'] = [];
          files.forEach((v, index) => {
            const date = new Date();
            const ISOString = date
              .toISOString()
              .substring(0, 10)
              .replace(/-/g, '_');
            const time = date.toTimeString().substring(0, 5).replace(':', '');
            const divider = '_';
            const fileName = `${ISOString}${divider}${time}${divider}${index}.png`;
            holder.push(fileName ?? '');
          });
          complaint = {...complaint, files: holder};
          isImage && handleUploadImage(holder);
        }
        const complaintDocRef = collectionRef('complaints').doc(queryId);
        if (typeof selectedChatId === 'string') {
          if (
            selectedChatId === 'object' &&
            typeof newConcernDetails === 'object'
          ) {
            const data: ComplaintProps = {
              messages: [complaint],
              ...newConcernDetails,
            };
            try {
              const document = await complaintDocRef
                .collection('individual')
                .add(data);
              setSelectedChatHead(role === 'mayor' ? 'adviser' : 'mayor');
              setSelectedChatId(document.id);
              setNewComplaints(undefined);
              setState(prevState => ({...prevState, sendLoading: false}));
              return setMessage('');
            } catch (err) {
              Alert.alert(
                'err',
                'Sending message through complaints => individual',
              );
            }
          } else if (selectedChatId === 'class_section') {
            const section = adviserInfo?.section ?? currentStudentInfo?.section;
            const yearLevel =
              adviserInfo?.yearLevel ?? currentStudentInfo?.yearLevel;
            OneSignal.User.addTag('class_section', `${yearLevel}${section}`);
            const notifData: NotificationProps = {
              contents: {
                en: complaint.message,
              },
              headings: {
                en: `${
                  currentStudentInfo?.name ?? 'Adviser'
                } sent a message in your class section`,
              },
              filters: [
                {
                  field: 'tag',
                  key: 'class_section',
                  relation: '=',
                  value: `${yearLevel}${section}`,
                },
              ],
              priority: 10,
              name: 'class_section',
              android_channel_id: `${NEXT_PUBLIC_ONESIGNAL_DEFAULT_ANDROID_CHANNEL_ID}`,
            };

            const jsonedRes = await (await notifResponse(notifData)).json();
            await complaintDocRef
              .collection('group')
              .add({...complaint, notif_id: jsonedRes});

            ToastAndroid.show('message sent!', ToastAndroid.SHORT);
            setState(prevState => ({...prevState, sendLoading: false}));
            return setMessage('');
          }
          /** ELSE: This is for student forwarding messages to the existing complaint */
          const docRef = complaintDocRef
            .collection('individual')
            .doc(selectedChatId);
          try {
            const filterOtherComplaints = otherComplaints.filter(
              props => props.id === selectedChatId,
            );
            const foo = () => {
              switch (filterOtherComplaints[0]?.recipient) {
                case 'mayor':
                  return mayorInfo?.studentNo ?? 'mayor';
                case 'adviser':
                  return adviserInfo?.email ?? 'adviser';
                default:
                  return filterOtherComplaints[0]?.recipient ?? '';
              }
            };
            const receiver =
              filterOtherComplaints[0]?.messages.filter(
                props => props.sender !== complaint.sender,
              )[0]?.sender ?? foo();
            const notifData: NotificationProps = {
              name: 'individual_complaint',
              contents: {
                en: complaint.message,
              },
              headings: {
                en: `${currentStudentInfo?.name} sent a message`,
              },
              priority: 8,
              android_channel_id: `${NEXT_PUBLIC_ONESIGNAL_DEFAULT_ANDROID_CHANNEL_ID}`,
              include_external_user_ids: [receiver],
            };
            const jsonRes = await (await notifResponse(notifData)).json();
            await docRef.update({
              messages: firebase.firestore.FieldValue.arrayUnion({
                ...complaint,
                notif_id: jsonRes.id,
              }),
            });
            ToastAndroid.show('message sent!', ToastAndroid.SHORT);
            setMessage('');
            return setState(prevState => ({...prevState, sendLoading: false}));
          } catch (err) {
            Alert.alert(
              'Failed in forwarding messages to the existing complaint',
            );
            return setState(prevState => ({...prevState, sendLoading: false}));
          }
        }
        Alert.alert('selectedChatId is null');
        return setState(prevState => ({...prevState, sendLoading: false}));
      }
    } catch (err) {
      ToastAndroid.show('Error in sending message', ToastAndroid.SHORT);
      setState(prevState => ({...prevState, sendLoading: false}));
    }
    setState(prevState => ({...prevState, sendLoading: false}));
    Alert.alert('Individual Complaints Collection in state is undefined');
  }
  console.log(files);

  return (
    <KeyboardAvoidingView
      className={`${
        renderCondition ||
        selectedChatId === 'object' ||
        selectedChatHead === 'class_section'
          ? 'block'
          : 'hidden'
      } h-18 bottom-0 w-full flex-row items-center border-t-2 bg-paper p-2`}>
      <TouchableOpacity
        disabled={currentStudentInfo?.email === 'null'}
        onPress={selectMultipleFile}
        className="mr-2">
        <Image
          source={require('~/assets/add_document.png')}
          className="h-10 w-10"
        />
      </TouchableOpacity>
      <TextInput
        value={message}
        multiline
        className="mr-2 flex-1 rounded-lg border border-black bg-paper"
        placeholder={placeholder}
        onChangeText={handleMessage}
      />
      <TouchableOpacity
        onPress={() => void handleSend()}
        className={`${
          state.sendLoading || (message.trim() === '' && files.length <= 0)
            ? 'scale-90 opacity-30'
            : 'scale-95'
        } duration-100 ease-in-out`}
        disabled={
          state.sendLoading || (message.trim() === '' && files.length <= 0)
        }>
        <Image source={require('~/assets/send.png')} className="h-9 w-9" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RenderInputMessageContainer;
