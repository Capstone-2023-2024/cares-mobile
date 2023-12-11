import {setUpPrefix} from '@cares/common/utils/date';
import {getImageFromStorage, imageDimension} from '@cares/common/utils/media';
import {NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET} from '@env';
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '~/components/Text';
import {useComplaints} from '~/contexts/ComplaintContext';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useUniversal} from '~/contexts/UniversalContext';
import {useUser} from '~/contexts/UserContext';
import {downloadPhoto} from '~/utils/media';
import ProfilePictureContainer from './ProfilePictureContainer';
import RenderActionButtons from './RenderActionButtons';
const StyledDateTime = ({timestamp}: {timestamp: Date}) => {
  return (
    <Text className="p-4 text-xs font-thin">{setUpPrefix(timestamp)}</Text>
  );
};

const ComplaintBox = () => {
  const {currentStudentComplaints, otherComplaints, classSectionComplaints} =
    useComplaints();
  const {role} = useUser();
  const {studentsInfo, adviserInfo, currentStudentInfo} = useUniversal();
  const {selectedChatId, selectedChatHead, selectedStudent} =
    useContentManipulation();
  const [state, setState] = useState<{
    imageModal: string;
    targetStudentEmail?: string;
  }>({
    imageModal: '',
    targetStudentEmail: '',
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

  const currentStudentInfoRoot = currentStudentComplaints.filter(
    props => selectedStudent === props.studentNo,
  );
  const filterOtherComplaints = otherComplaints.filter(
    props => selectedChatId === props.id,
  );
  const filterCurrentStudent = currentStudentInfoRoot.filter(
    props => selectedChatId === props.id,
  );

  const renderThisArray =
    selectedChatHead === 'class_section'
      ? classSectionComplaints
      : filterOtherComplaints.length > 0
        ? filterOtherComplaints[0]?.messages
        : filterCurrentStudent[0]?.messages;

  const targetArray = filterOtherComplaints[0] ?? filterCurrentStudent[0];

  function formatImageName(item: string, emailOfSender?: string) {
    /** MADNESS, optimize this!! */
    const email =
      selectedChatHead === 'class_section' && typeof emailOfSender === 'string'
        ? emailOfSender
        : mayorAdviser
          ? studentEmailReference ?? 'studentReferencedEmailForStorage'
          : emailOfSender === undefined && selectedChatHead === 'class_section'
            ? 'studentReferencedEmailForStorage'
            : currentStudentInfo?.email ?? 'emailNotDefined';

    return `${email.replace(/@/, '%40')}%2F${item}`;
  }
  const imageName = formatImageName(state.imageModal, state.targetStudentEmail);
  const src = getImageFromStorage({
    imageName,
    ref: 'concerns',
    storageBucket: NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET,
  });
  // console.log({src});
  // function getFileExtention(fileUrl: string) {
  //   return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  // }

  return (
    <View className="flex-1">
      <RenderActionButtons targetArray={targetArray} />
      <Modal
        transparent
        animationType="fade"
        visible={state.imageModal.trim() !== ''}
        onRequestClose={() =>
          setState(prevState => ({...prevState, imageModal: ''}))
        }>
        <TouchableOpacity
          activeOpacity={1}
          className="h-screen bg-white"
          onLongPress={async () => {
            const imageReference = getImageFromStorage({
              imageName: formatImageName(
                state.imageModal,
                state.targetStudentEmail,
              ),
              ref: 'concerns',
              storageBucket: NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET,
            });
            console.log({imageReference});
            try {
              await downloadPhoto(imageReference);
              Alert.alert('File Downloaded Successfully.');
            } catch (err) {
              Alert.alert('Downloading photo error');
            }
          }}
          onPress={() =>
            setState(prevState => ({...prevState, imageModal: ''}))
          }>
          <View className="bg-primary p-4">
            <Text className="text-center text-paper">{state.imageModal}</Text>
          </View>
          <Image
            alt=""
            src={src}
            className="h-full w-full"
            source={require('~/assets/error.svg')}
            {...imageDimension(16)}
          />
        </TouchableOpacity>
      </Modal>
      <FlatList
        data={renderThisArray}
        keyExtractor={props => props.timestamp.toExponential()}
        renderItem={({item}) => {
          const {message, timestamp, sender, files} = item;
          const newTimestamp = new Date();
          newTimestamp.setTime(timestamp);
          const targetStudent = studentsInfo?.filter(
            props => sender === props.studentNo,
          )[0];
          const renderCondition =
            role === 'adviser'
              ? sender === adviserInfo?.email
              : sender === currentStudentInfo?.studentNo;

          return (
            <ProfilePictureContainer
              renderCondition={renderCondition}
              src={
                sender === adviserInfo?.email
                  ? adviserInfo?.src ?? ''
                  : targetStudent?.src ?? ''
              }>
              <View className="relative flex-1 p-1">
                <View>
                  <Text
                    className={`${
                      renderCondition ? 'self-end' : 'self-start'
                    } text-xs font-semibold`}>
                    {sender === adviserInfo?.email
                      ? adviserInfo?.name ??
                        adviserInfo?.email ??
                        'Deleted Faculty'
                      : targetStudent?.name ?? 'Deleted User'}
                  </Text>
                  <Text
                    className={`${
                      renderCondition ? 'self-end' : 'self-start'
                    } text-xs font-bold text-primary`}>
                    {sender === adviserInfo?.email
                      ? `${adviserInfo?.yearLevel.substring(
                          0,
                          1,
                        )}${adviserInfo?.section?.toUpperCase()} Adviser`
                      : sender}
                  </Text>
                  <Text
                    className={`${
                      renderCondition ? 'self-end' : 'self-start'
                    } text-sm`}>
                    {message}
                  </Text>
                  <FlatList
                    data={files}
                    horizontal
                    keyExtractor={props => props.valueOf()}
                    renderItem={props => {
                      const {item} = props;
                      const source = getImageFromStorage({
                        ref: 'concerns',
                        imageName: formatImageName(item, targetStudent?.email),
                        storageBucket: NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET,
                      });
                      // console.log({source});
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            setState(prevState => ({
                              ...prevState,
                              imageModal: item,
                              targetStudentEmail: targetStudent?.email,
                            }))
                          }>
                          <Image
                            alt=""
                            src={source}
                            className="h-16 w-16"
                            source={require('~/assets/error.svg')}
                            {...imageDimension(16)}
                          />
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
              <StyledDateTime timestamp={newTimestamp} />
            </ProfilePictureContainer>
          );
        }}
      />
    </View>
  );
};

export default ComplaintBox;
