import {RecipientType} from '@cares/common/types/permission';
import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {OneSignal} from 'react-native-onesignal';
import {useComplaints} from '~/contexts/ComplaintContext';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useModal} from '~/contexts/ModalContext';
import {useUser} from '~/contexts/UserContext';
import ChatHeadButton from './ChatHeadButton';
import type {ComplaintBoxRendererProps} from './ComplaintBoxRenderer';
import ComplaintBoxRenderer from './ComplaintBoxRenderer';

interface RenderChatHeadsProps
  extends Omit<ComplaintBoxRendererProps, 'condition' | 'data'> {}
type RecipientTypeExtended = RecipientType | 'students' | 'class_section';

const RenderChatHeads = ({...rest}: RenderChatHeadsProps) => {
  const {role} = useUser();
  const {otherComplaints} = useComplaints();
  const {setMessage} = useContentManipulation();
  const {showMayorModal, setShowMayorModal, setShowStudents} = useModal();
  const {
    selectedChatId,
    selectedChatHead,
    setSelectedStudent,
    setSelectedChatId,
    setSelectedChatHead,
  } = useContentManipulation();
  const recipients: RecipientTypeExtended[] = otherComplaints.map(
    props => props.recipient,
  );

  function studentsOnPress() {
    OneSignal.User.pushSubscription;
    setSelectedChatHead('students');
    setSelectedChatId(null);
    setShowMayorModal(false);
    setShowStudents(true);
    setMessage('');
  }

  function classSectionOnPress() {
    setSelectedChatHead('class_section');
    setSelectedChatId('class_section');
    setSelectedStudent(null);
    setShowStudents(false);
    setShowMayorModal(false);
    setMessage('');
  }

  function chatHeadOnClick(props: RecipientType) {
    return role !== 'student'
      ? () => {
          setMessage('');
          selectedChatHead !== 'students' && setSelectedStudent(null);
          setSelectedChatId(null);
          setSelectedChatHead(props);
          setShowStudents(false);
          setSelectedStudent(null);
          setShowMayorModal(true);
        }
      : () => {
          setMessage('');
          setSelectedChatHead(props);
          setSelectedChatId(null);
          setShowStudents(false);
          setShowMayorModal(true);
        };
  }

  recipients.push('class_section');
  // console.log(recipients);
  if (role === 'student') {
    recipients.push('mayor');
  } else {
    if (role !== null && role !== 'faculty') {
      const roleIndex = recipients.indexOf(role);
      if (roleIndex > -1) {
        recipients.splice(roleIndex);
      }
      recipients.push('students');
      role === 'mayor' && recipients.push('adviser');
    }
  }

  return (
    <View>
      <FlatList
        horizontal
        keyExtractor={props => props}
        data={[...new Set(recipients)].sort((a, b) => a.localeCompare(b))}
        className="w-full bg-primary/30 p-4"
        renderItem={({item}) => {
          return (
            <ChatHeadButton
              key={item}
              name={
                item === 'students'
                  ? `${role === 'mayor' ? 'My Classmates' : 'Students'}`
                  : item.replace(/_/g, ' ')
              }
              condition={
                (typeof selectedChatId === 'string' &&
                  selectedChatId === 'object') ||
                selectedChatHead === item
              }
              onPress={
                item === 'students'
                  ? studentsOnPress
                  : item === 'class_section'
                    ? classSectionOnPress
                    : chatHeadOnClick(item)
              }
            />
          );
        }}
      />

      <ComplaintBoxRenderer
        data={otherComplaints
          .filter(props => selectedChatHead === props.recipient)
          .sort((a, b) => b.dateCreated - a.dateCreated)}
        condition={showMayorModal}
        {...rest}
      />
    </View>
  );
};

export default RenderChatHeads;
