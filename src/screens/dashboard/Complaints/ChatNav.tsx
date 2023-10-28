import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import {NextSvg} from '~/utils/image';

export interface ChatNavProps {
  modalVisible: boolean;
  title: string;
  about: string;
}

export type ChatNavValue =
  | ChatNavProps['modalVisible']
  | ChatNavProps['title']
  | ChatNavProps['about'];

export interface TicketInfoProps {
  id: string;
  title: string;
  about: string;
  dateCreated: number;
  dateUpdated?: number;
  status: 'pending' | 'turnOvered' | 'resolved' | 'rejected';
}

const ChatNav = () => {
  // const initState: ChatNavProps = {
  //   modalVisible: false,
  //   title: '',
  //   about: '',
  // };
  // const [state, setState] = useState(initState);
  const navigation = useNavigation();

  /*TODO: Render a two options for mayors:
    Student Concerns, Personal Concern by the mayor.
    Complaints/concerns by mayors will be escalated to BM
  */
  // function handleState(key: keyof ChatNavProps, value: ChatNavValue) {
  //   setState(prevState => ({...prevState, [key]: value}));
  // }
  function handleGoBack() {
    navigation.goBack();
  }
  // function handleRequestModalClose() {
  //   Alert.alert('Modal has been closed.');
  //   handleState('modalVisible', false);
  // }
  // function handleTitleInput(title: string) {
  //   handleState('title', title);
  // }
  // function handleAboutInput(about: string) {
  //   handleState('about', about);
  // }
  // async function handleSubmitTicket() {
  //   const EMPTY = '';
  //   const dateNow = new Date().getTime();
  //   const student = await collectionRef('student')
  //     .where('email', '==', currentUser?.email)
  //     .get();
  //   const id = student.docs[0]?.id;
  //   const customId = `${id}${new Date().getTime()}`;
  //   //TODO: Need to create safe unique id
  //   // const alpha = 'abcdefghijklmnopqrstuvwxyz'
  //   // getRandomInt(0, alpha.length-1)
  //   const ticketInfo: TicketInfoProps = {
  //     id: customId,
  //     title: state.title,
  //     about: state.about,
  //     dateCreated: dateNow,
  //     dateUpdated: dateNow,
  //     status: 'pending',
  //   };

  //   if (state.about.trim() === EMPTY || state.title.trim() === EMPTY) {
  //     return Alert.alert(
  //       `${state.title.trim() === EMPTY ? 'Title' : 'About'} is empty`,
  //     );
  //   }
  //   handleState('title', '');
  //   handleState('about', '');

  //   await collectionRef('concerns')
  //     .doc(id)
  //     .collection('tickets')
  //     .add(ticketInfo);
  // }
  // function handleTicket() {
  //   handleState('modalVisible', true);
  // }

  return (
    <View className="h-16 flex-row items-center bg-paper px-2">
      <TouchableOpacity className="w-10 rotate-180" onPress={handleGoBack}>
        <NextSvg />
      </TouchableOpacity>
      {/* <Modal
        transparent
        animationType="slide"
        visible={state.modalVisible}
        onRequestClose={handleRequestModalClose}>
        <View className="m-auto h-1/2 w-2/3 rounded-lg bg-white p-2  shadow-lg">
          <TextInput
            value={state.title}
            onChangeText={handleTitleInput}
            placeholder="title"
            className="p-4"
          />
          <TextInput
            value={state.about}
            onChangeText={handleAboutInput}
            placeholder="about"
            className="p-4"
          />
          <TouchableOpacity onPress={handleSubmitTicket}>
            <Text className="self-center rounded-lg bg-primary p-2 text-xs text-paper shadow-sm">
              Submit Ticket
            </Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
      <View className="flex-1 flex-row items-center justify-center">
        <Text className="text-xl text-tertiary">Complaints/Concerns</Text>
        {/* <TouchableOpacity
          onPress={handleTicket}
          className="ml-2 rounded-lg bg-primary/10 p-2 shadow-sm">
          <Text className="text-tertiary">Ticket</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ChatNav;
