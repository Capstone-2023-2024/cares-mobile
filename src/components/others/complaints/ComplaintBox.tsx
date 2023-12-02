import {setUpPrefix} from '@cares/utils/date';
import {getImageFromStorage, imageDimension} from '@cares/utils/media';
import {NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET} from '@env';
import React, {useState} from 'react';
import {FlatList, Image, Modal, TouchableOpacity, View} from 'react-native';
import Text from '~/components/Text';
import {useComplaints} from '~/contexts/ComplaintContext';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useModal} from '~/contexts/ModalContext';
import {useUniversal} from '~/contexts/UniversalContext';
import ProfilePictureContainer from './ProfilePictureContainer';
import RenderActionButtons from './RenderActionButtons';
import {useUser} from '~/contexts/UserContext';

const StyledDateTime = ({timestamp}: {timestamp: Date}) => {
  return (
    <Text className="p-4 text-xs font-thin">{setUpPrefix(timestamp)}</Text>
  );
};

const ComplaintBox = () => {
  const {showMayorModal} = useModal();
  const {currentStudentComplaints, otherComplaints, classSectionComplaints} =
    useComplaints();
  const {role} = useUser();
  const {studentsInfo, adviserInfo, currentStudentInfo} = useUniversal();
  const {selectedChatId, selectedChatHead, selectedStudent} =
    useContentManipulation();
  const [state, setState] = useState({
    imageModal: '',
  });

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

  function formatImageName(item: string) {
    return `${currentStudentInfo?.email.replace(/@/, '%40')}%2F${item}`;
  }
  console.log({showMayorModal});
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
          className="h-screen bg-white"
          onPress={() =>
            setState(prevState => ({...prevState, imageModal: ''}))
          }>
          <View className="bg-primary p-4">
            <Text className="text-center text-paper">{state.imageModal}</Text>
          </View>
          <Image
            alt=""
            src={getImageFromStorage({
              imageName: formatImageName(state.imageModal),
              ref: 'concerns',
              storageBucket: NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET,
            })}
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
          // console.log({ studentsInfo });
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
                        imageName: formatImageName(item),
                        storageBucket: NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET,
                      });
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            setState(prevState => ({
                              ...prevState,
                              imageModal: item,
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
