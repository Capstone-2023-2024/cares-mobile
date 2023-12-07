import type {ComplaintProps} from '@cares/types/complaint';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '~/components/Text';
import {useComplaints} from '~/contexts/ComplaintContext';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useModal} from '~/contexts/ModalContext';
import {useUser} from '~/contexts/UserContext';
import {TurnOverModal} from './TurnOverModal';

/** TODO: Add notification here */
const RenderActionButtons = ({targetArray}: {targetArray?: ComplaintProps}) => {
  const {actionButton} = useContentManipulation();
  useComplaints();
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
