import type {ComplaintProps} from '@cares/types/complaint';
import React, {useState} from 'react';
import {Modal, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Text from '~/components/Text';
import {useContentManipulation} from '~/contexts/ContentManipulationContext';
import {useModal} from '~/contexts/ModalContext';

interface TurnOverMessageProps {
  recipient?: ComplaintProps['recipient'];
  status?: 'turn-over' | 'resolved' | 'processing';
  turnOvers?: number;
}

const TurnOverModal = () => {
  const {showTurnOverModal, setShowTurnOverModal} = useModal();
  const {actionButton, setTurnOverMessage} = useContentManipulation();
  const [state, setState] = useState({
    turnOverMessage: '',
  });

  function closeTurnOverModal() {
    setShowTurnOverModal(false);
  }

  function handleTurnOverMessage(turnOverMessage: string) {
    setState(prevState => ({...prevState, turnOverMessage}));
  }

  return (
    <Modal visible={showTurnOverModal} onRequestClose={closeTurnOverModal}>
      <TouchableOpacity
        className="absolute right-2 top-2 rounded-full bg-red-500 px-2"
        onPress={closeTurnOverModal}>
        <Text className="text-white">x</Text>
      </TouchableOpacity>
      <View className="h-screen items-center justify-center">
        <TextInput
          className="p-2"
          placeholder="Compose a turn-over message to send to your adviser"
          value={state.turnOverMessage}
          onChangeText={handleTurnOverMessage}
        />
        <TouchableOpacity
          disabled={state.turnOverMessage.trim() === ''}
          className={`${
            state.turnOverMessage.trim() === ''
              ? 'bg-slate-200'
              : 'bg-green-500'
          } rounded-lg p-2 duration-300 ease-in-out`}
          onPress={() => {
            setShowTurnOverModal(false);
            setTurnOverMessage(state.turnOverMessage);
            setTurnOverMessage(null);
            setState(prevState => ({...prevState, turnOverMessage: ''}));
            void actionButton('turn-over');
          }}>
          <Text
            className={`${
              state.turnOverMessage.trim() === ''
                ? 'text-slate-300'
                : 'text-paper'
            } capitalize`}>
            send
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const TurnOverMessage = ({
  recipient,
  status,
  turnOvers,
}: TurnOverMessageProps) => {
  const turnOverModified = (recipient === 'mayor' ? 0 : 1) + (turnOvers ?? -1);

  switch (turnOverModified) {
    case undefined:
      return <>{status}</>;
    case 1:
      return (
        <>
          {status === 'resolved'
            ? 'Resolved by Adviser'
            : 'Turned over to Adviser'}
        </>
      );
    case 2:
      return (
        <>
          {status === 'resolved'
            ? 'Resolved by Program Chair'
            : 'Turned over to Program Chair'}
        </>
      );
    case 3:
      return (
        <>
          {status === 'resolved'
            ? 'Resolved by Board Member'
            : 'Turned over to Board Member'}
        </>
      );
    default:
      return (
        <>{status === 'processing' ? 'ongoing' : `${status} by ${recipient}`}</>
      );
  }
};

export {TurnOverMessage, TurnOverModal};
