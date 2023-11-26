import React from 'react';
import type {ComplaintProps} from '@cares/types/complaint';
import {TouchableOpacity, View} from 'react-native';
import {useContentManipulation} from '../contexts/ContentManipulationProvider';
import {useModal} from '../contexts/ModalProvider';
import {useUniversal} from '../contexts/UniversalProvider';
import {TurnOverModal} from './TurnOverModal';
import {Text} from '~/components';

/** TODO: Add notification here */
const RenderActionButtons = ({targetArray}: {targetArray?: ComplaintProps}) => {
  const {actionButton, selectedChatId, selectedChatHead} =
    useContentManipulation();
  const {role} = useUniversal();
  const {showTurnOverModal, setShowTurnOverModal} = useModal();

  const condition =
    targetArray?.status === 'processing' &&
    role === targetArray?.recipient &&
    selectedChatHead !== 'class_section' &&
    selectedChatId !== 'class_section';

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
      {showTurnOverModal && <TurnOverModal />}
    </View>
  );
};

export default RenderActionButtons;
