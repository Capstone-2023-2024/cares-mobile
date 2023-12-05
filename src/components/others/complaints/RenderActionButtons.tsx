import React from 'react';
import type {ComplaintProps} from '@cares/common/types/complaint';
import {TouchableOpacity, View} from 'react-native';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useModal} from '~/contexts/ModalContext';
import {TurnOverModal} from './TurnOverModal';
import Text from '~/components/Text';
import {useUser} from '~/contexts/UserContext';

/** TODO: Add notification here */
const RenderActionButtons = ({targetArray}: {targetArray?: ComplaintProps}) => {
  const {actionButton} = useContentManipulation();
  const {role} = useUser();
  const {setShowTurnOverModal} = useModal();

  const condition =
    targetArray?.status === 'processing' && targetArray?.recipient === role;

  return (
    <View
      className={`${
        condition ? 'flex' : 'hidden'
      } items-center justify-center gap-2`}>
      <TouchableOpacity
        className="rounded-lg bg-green-500 p-2"
        onPress={() => void actionButton('resolved')}>
        <Text className="capitalize text-paper">resolve</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="rounded-lg bg-yellow-500 p-2"
        onPress={() => setShowTurnOverModal(true)}>
        <Text className="capitalize text-paper">turn-over</Text>
      </TouchableOpacity>
      <TurnOverModal />
    </View>
  );
};

export default RenderActionButtons;
