import React, {type ReactNode} from 'react';
import {View} from 'react-native';
import {useComplaints} from '~/contexts/ComplaintContext';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useModal} from '~/contexts/ModalContext';
import ComplaintBoxRenderer from './ComplaintBoxRenderer';
import ChatHeadButton from './ChatHeadButton';
import type {ComplaintBoxRendererProps} from './ComplaintBoxRenderer';
import {RecipientType} from '@cares/types/permission';
import {useUser} from '~/contexts/UserContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '~/components/Text';

interface RenderChatHeadsProps
  extends Omit<ComplaintBoxRendererProps, 'condition' | 'data'> {
  children?: ReactNode;
}
const RenderChatHeads = ({children, ...rest}: RenderChatHeadsProps) => {
  const {role} = useUser();
  const {otherComplaints} = useComplaints();
  const {showMayorModal, setShowMayorModal, setShowStudents} = useModal();
  const {
    selectedChatId,
    selectedChatHead,
    setSelectedStudent,
    setSelectedChatId,
    setSelectedChatHead,
  } = useContentManipulation();
  const recipients = otherComplaints.map(props => props.recipient);

  if (role === 'student') {
    recipients.push('mayor');
  } else if (role === 'mayor') {
    const mayorIndex = recipients.indexOf(role);
    if (mayorIndex > -1) {
      recipients.splice(mayorIndex);
    }
    recipients.push('adviser');
  }
  console.log({role});
  function chatHeadOnClick(props: RecipientType) {
    console.log(props);
    return role !== 'student'
      ? () => {
          selectedChatHead !== 'students' && setSelectedStudent(null);
          setSelectedChatId(null);
          setSelectedChatHead(props);
          setShowStudents(false);
          setShowMayorModal(true);
        }
      : () => {
          setSelectedChatHead(props);
          setSelectedChatId(null);
          setShowMayorModal(true);
        };
  }

  return (
    <View>
      <View className="flex w-full flex-row justify-evenly overflow-x-auto bg-primary/30 p-4">
        {[...new Set(recipients)].map(value => {
          return (
            <ChatHeadButton
              key={value}
              name={value.replace(/_/g, ' ')}
              condition={
                (typeof selectedChatId === 'string' &&
                  selectedChatId === 'object') ||
                selectedChatHead === value
              }
              onPress={chatHeadOnClick(value)}
            />
          );
        })}
        {children}
      </View>
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
