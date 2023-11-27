import React, {type ReactNode} from 'react';
import {View} from 'react-native';
import {useComplaints} from '../contexts/ComplaintsProvider';
import {
  useContentManipulation,
  type ContentManipulationProviderStateProps,
} from '../contexts/ContentManipulationProvider';
import {useUniversal} from '../contexts/UniversalProvider';
import {ChatHeadButton, ComplaintBoxRenderer} from './index';
import type {ComplaintBoxRendererProps} from './ComplaintBoxRenderer';

interface RenderChatHeadsProps extends ComplaintBoxRendererProps {
  children?: ReactNode;
  chatHeadOnClick: (
    value: ContentManipulationProviderStateProps['selectedChatHead'],
  ) => void;
}
const RenderChatHeads = ({
  children,
  chatHeadOnClick,
  ...rest
}: RenderChatHeadsProps) => {
  const {role} = useUniversal();
  const {otherComplaints} = useComplaints();
  const {selectedChatId, selectedChatHead} = useContentManipulation();
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
              onPress={() =>
                chatHeadOnClick(
                  value as ContentManipulationProviderStateProps['selectedChatHead'],
                )
              }
            />
          );
        })}
        {children}
      </View>
      <ComplaintBoxRenderer {...rest} />
    </View>
  );
};

export default RenderChatHeads;
