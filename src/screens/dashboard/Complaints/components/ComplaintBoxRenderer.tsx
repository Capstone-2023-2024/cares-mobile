import React from 'react';
import type {ComplaintProps} from '@cares/types/complaint';
import type {FirestoreDatabaseProps} from '@cares/types/document';
import {recipientEscalation} from '@cares/utils/validation';
import {TouchableOpacity, View, FlatList} from 'react-native';
import {Text} from '~/components';
import {useContentManipulation} from '../contexts/ContentManipulationProvider';
import {useModal} from '../contexts/ModalProvider';
import {useUniversal} from '../contexts/UniversalProvider';
import {TurnOverMessage} from './TurnOverModal';

interface ReadComplaintProps extends ComplaintProps, FirestoreDatabaseProps {}

interface ComplaintBoxRendererProps {
  data?: ReadComplaintProps[];
  heading?: string;
  condition: boolean;
  handleNewConcern?: () => void;
}
const ComplaintBoxRenderer = ({
  data,
  heading,
  condition,
  handleNewConcern,
}: ComplaintBoxRendererProps) => {
  const {role} = useUniversal();
  const {
    selectedChatHead,
    selectedChatId,
    setSelectedStudent,
    setSelectedChatId,
  } = useContentManipulation();
  const {showMayorModal, setShowStudents, setShowMayorModal} = useModal();

  function toggleModal() {
    if (selectedChatHead === 'students') {
      selectedChatId === null && setSelectedStudent(null);
      setSelectedChatId(null);
      return setShowStudents(true);
    }
    setShowMayorModal(!showMayorModal);
  }

  function handleSelectComplaintHead(id: string) {
    if (selectedChatHead !== 'students') {
      setSelectedStudent(null);
    }
    setSelectedChatId(id);
  }

  return (
    <View className="relative">
      {condition && (
        <TouchableOpacity
          onPress={toggleModal}
          className="top-0 w-full bg-secondary/90 p-2 duration-300 ease-in-out hover:bg-secondary">
          {/** TODO: Change this to icons */}
          <Text className="text-center text-paper">
            {selectedChatId !== null ? '─' : '┼'}
          </Text>
        </TouchableOpacity>
      )}
      <View
        className={`${
          condition ? 'block' : 'hidden'
        } relative p-2 text-center ease-in-out`}>
        <View className="p-2 text-lg font-bold">
          <Text>{heading ? heading : 'Your Complaint/Concern(s)'}</Text>
        </View>
        <FlatList
          horizontal
          className="flex w-full gap-2 overflow-x-auto p-2"
          data={data}
          keyExtractor={props => props.id}
          renderItem={({item}) => {
            const {id, messages, dateCreated, status, turnOvers, recipient} =
              item;
            const date = new Date();
            const timestamp = new Date();
            const selectedMessage = messages[messages.length - 1];

            date.setTime(dateCreated);
            timestamp.setTime(selectedMessage?.timestamp ?? -28800000);
            return (
              <TouchableOpacity
                key={id}
                disabled={!condition}
                className={`${
                  selectedChatId === id
                    ? 'scale-95 bg-secondary/90 hover:bg-secondary'
                    : 'scale-90 bg-primary/60 hover:scale-95 hover:bg-primary/70'
                } rounded-lg p-2 text-start shadow-sm duration-300 ease-in-out`}
                onPress={() => handleSelectComplaintHead(id)}>
                <View className="flex gap-2">
                  <Text className="text-xs text-paper">id:</Text>
                  <Text
                    className={`${
                      selectedChatId === id
                        ? 'font-bold text-paper'
                        : 'text-secondary'
                    } text-xs duration-300 ease-in-out`}>
                    {id}
                  </Text>
                </View>
                <View className="text-sm text-paper">
                  <Text>Status:</Text>
                  <Text
                    className={`${
                      status === 'processing'
                        ? 'text-yellow-500'
                        : status === 'resolved'
                        ? 'text-green-500'
                        : 'text-red-500'
                    } pl-2 font-bold capitalize`}>
                    <TurnOverMessage
                      recipient={recipient}
                      status={status}
                      turnOvers={turnOvers}
                    />
                  </Text>
                </View>
                <Text className="text-sm text-paper">{`Recent Message: ${selectedMessage?.message.substring(
                  0,
                  selectedMessage.message.length > 6
                    ? 4
                    : selectedMessage.message.length,
                )}...`}</Text>
                <Text className="text-xs font-thin text-paper">{`Date: ${date.toLocaleDateString()}`}</Text>
              </TouchableOpacity>
            );
          }}
        />
        {handleNewConcern !== undefined &&
          selectedChatHead ===
            (role === 'mayor' ? recipientEscalation(role) : 'mayor') && (
            <TouchableOpacity
              disabled={selectedChatId === 'object'}
              className={`${
                selectedChatId === 'object'
                  ? 'bg-slate-200'
                  : 'scale-90 bg-green-400 hover:scale-95 hover:bg-green-500'
              } mx-auto w-fit rounded-lg p-2 duration-300 ease-in-out`}
              onPress={handleNewConcern}>
              <Text
                className={`${
                  selectedChatId === 'object' ? 'text-slate-300' : 'text-paper'
                }`}>
                Create new Complaint/Concern(s)
              </Text>
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
};

export type {ComplaintBoxRendererProps};
export default ComplaintBoxRenderer;
