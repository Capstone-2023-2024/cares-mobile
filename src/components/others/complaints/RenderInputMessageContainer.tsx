import {NotificationProps} from '@cares/common/types/announcement';
import type {
  ComplaintBaseProps,
  ComplaintProps,
  ReadComplaintProps,
} from '@cares/common/types/complaint';
import type {DocumentProps} from '@cares/common/types/media';
import {NEXT_PUBLIC_ONESIGNAL_DEFAULT_ANDROID_CHANNEL_ID} from '@env';
import {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {OneSignal} from 'react-native-onesignal';
import {useComplaints} from '~/contexts/ComplaintContext';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useUniversal} from '~/contexts/UniversalContext';
import {useUser} from '~/contexts/UserContext';
import {collectionRef} from '~/utils/firebase';
import {storageReferenceName} from '~/utils/image';
import {notification} from '~/utils/notification';

/**TODO: Optimized this together with Mayor UI */
const RenderInputMessageContainer = () => {
  const {role} = useUser();
  const {currentStudentInfo, adviserInfo, mayorInfo, queryId, studentsInfo} =
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
  const mayorAdviser = role === 'adviser' || selectedChatHead === 'students';
  const filteredStudentComplaints = [
    ...(mayorAdviser ? currentStudentComplaints : otherComplaints),
  ];
  const studentNoReference = filteredStudentComplaints.filter(
    props => props.id === selectedChatId,
  )[0]?.studentNo;
  const studentEmailReference = studentsInfo?.filter(
    props => studentNoReference === props.studentNo,
  )[0]?.email;
  const email = mayorAdviser
    ? studentEmailReference ?? 'studentReferencedEmailForStorage'
    : currentStudentInfo?.email ?? 'emailNotDefined';
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
        const reference = storage().ref(
          storageReferenceName(email, names, index),
        );
        console.log({'Email reference for uploading image': email});
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
  // console.log({selectedChatId});
  /** TODO: Add notification. If sender is anonymous, currentStudentInfo is not loaded properly */
  async function handleSend() {
    setState(prevState => ({...prevState, sendLoading: true}));
    try {
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
              ? adviserInfo?.email ?? 'adviser'
              : currentStudentInfo?.studentNo ?? 'anonymous',
          message,
        };
        if (isImage) {
          const holder: DocumentProps['files'] = [];
          files.forEach((v, index) => {
            const date = new Date();
            const fileName = `${date.getTime()}_${index}.png`;
            holder.push(fileName ?? '');
          });
          complaint = {...complaint, files: holder};
          isImage && handleUploadImage(holder);
        }
        const complaintDocRef = collectionRef('complaints').doc(queryId);
        if (typeof selectedChatId === 'string') {
          /** New Complaints here */
          if (
            selectedChatId === 'object' &&
            typeof newConcernDetails === 'object'
          ) {
            const data: ComplaintProps = {
              messages: [complaint],
              ...newConcernDetails,
            };
            console.log({data});
            const chatHeadInRole = role === 'mayor' ? 'adviser' : 'mayor';
            const messagesLastIndex = data.messages.length - 1;
            const {message, sender} = data.messages[messagesLastIndex];
            const senderName =
              studentsInfo?.filter(props => props.studentNo === sender)[0]
                .name ?? 'anonymous';
            let notifData: NotificationProps = {
              contents: {
                en: message,
              },
              headings: {
                en: `${senderName} sent you a message`,
              },
              priority: 10,
              name: chatHeadInRole,
              android_channel_id: `${NEXT_PUBLIC_ONESIGNAL_DEFAULT_ANDROID_CHANNEL_ID}`,
            };
            if (chatHeadInRole === 'mayor') {
              notifData = Object.assign(
                {include_external_user_ids: [mayorInfo?.studentNo ?? '']},
                notifData,
              );
            } else if (chatHeadInRole === 'adviser') {
              notifData = Object.assign(
                {include_external_user_ids: [adviserInfo?.email ?? '']},
                notifData,
              );
            }
            console.log('in new complaints');
            let complaintHolder = data;
            const response = await notification(notifData);
            response.id.trim() !== '' &&
              (complaintHolder.messages[messagesLastIndex].notif_id =
                response.id);
            const document = await complaintDocRef
              .collection('individual')
              .add(complaintHolder);
            setSelectedChatHead(chatHeadInRole);
            setSelectedChatId(document.id);
            setNewComplaints(undefined);
            setState(prevState => ({...prevState, sendLoading: false}));

            return setMessage('');
          } else if (selectedChatId === 'class_section') {
            const section = adviserInfo?.section ?? currentStudentInfo?.section;
            const yearLevel =
              adviserInfo?.yearLevel ?? currentStudentInfo?.yearLevel;
            OneSignal.User.addTag('class_section', `${yearLevel}${section}`);
            const notifData: NotificationProps = {
              contents: {
                en:
                  complaint.message.trim() === ''
                    ? files.map(props => props.name).toString()
                    : complaint.message,
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
            const response = await notification(notifData);
            await complaintDocRef
              .collection('group')
              .add({...complaint, notif_id: response.id});

            ToastAndroid.show('message sent!', ToastAndroid.SHORT);
            setState(prevState => ({...prevState, sendLoading: false}));
            return setMessage('');
          }
          /** ELSE: This is for student forwarding messages to the existing complaint */
          const docRef = complaintDocRef
            .collection('individual')
            .doc(selectedChatId);

          async function receiver() {
            const complaintRef = (
              await docRef.get()
            ).data() as ReadComplaintProps;
            console.log(complaintRef.turnOvers);
            const turnOverExists = typeof complaintRef.referenceId === 'string';
            const recipient = filteredStudentComplaints
              .filter(props => props.id === selectedChatId)[0]
              ?.messages.filter(props => props.sender !== complaint.sender)[0]
              .sender;
            return turnOverExists ? complaintRef.recipient : recipient;
          }
          const notifData: NotificationProps = {
            name: 'individual_complaint',
            contents: {
              en:
                complaint.message.trim() === ''
                  ? files.map(props => props.name).toString()
                  : complaint.message,
            },
            headings: {
              en: `${currentStudentInfo?.name} sent a message`,
            },
            priority: 8,
            android_channel_id: `${NEXT_PUBLIC_ONESIGNAL_DEFAULT_ANDROID_CHANNEL_ID}`,
            include_external_user_ids: [await receiver()],
          };
          const response = await notification(notifData);

          console.log(complaint, response, notifData, 'Else');
          await docRef.update({
            messages: firebase.firestore.FieldValue.arrayUnion({
              ...complaint,
              notif_id: response.id,
            }),
          });
          ToastAndroid.show('message sent!', ToastAndroid.SHORT);
          setMessage('');
          return setState(prevState => ({...prevState, sendLoading: false}));
        }
        Alert.alert('selectedChatId is null');
        return setState(prevState => ({...prevState, sendLoading: false}));
      }
    } catch (err) {
      const error = err as Record<any, any>;
      console.log(err);
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
      return setState(prevState => ({...prevState, sendLoading: false}));
    }
  }

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
