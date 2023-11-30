import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Image, Modal, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TouchableOpacity as VanillaTouchableOpacity} from 'react-native';
import Text from '~/components/Text';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';

function Header({}: {withBack?: boolean}) {
  const {handleNavigation, initialRouteName} = useNav();
  const {currentStudent, role} = useUser();
  const {currentUser} = useAuth();
  const [modal, setModal] = useState(false);
  const route = useRoute();

  function handlePressRoute() {
    route.name.toLowerCase() === 'home'
      ? setModal(true)
      : handleNavigation(initialRouteName);
  }
  function handlePressChats() {
    if (currentStudent.section === undefined) {
      return Alert.alert('No section', 'Please set up your section first');
    }
    handleNavigation('Complaints');
  }
  const renderChatIcon = () =>
    role !== 'faculty' &&
    route.name !== 'Chats' &&
    currentUser !== null && (
      <>
        <TouchableOpacity
          disabled={currentStudent.email === 'null'}
          className="mr-2 h-12 w-12 items-center"
          onPress={handlePressChats}>
          <Image
            source={require('~/assets/chat.png')}
            className="h-full w-full"
          />
        </TouchableOpacity>
      </>
    );

  return (
    <View className="h-16 flex-row items-center justify-between bg-paper px-2">
      <Modal
        visible={modal}
        animationType="slide"
        transparent
        onRequestClose={() => setModal(false)}>
        <VanillaTouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={() => setModal(false)}>
          <View className="h-full bg-primary p-5 shadow-sm">
            <Text className="mt-10 text-center text-lg font-bold text-paper">
              CARES (Cultivating Assistance, Resolution, and Empowerment for
              Students){'\n'}
            </Text>
            <Text className="mt-2 text-justify text-paper">
              {'\t'}
              {'\t'}Welcome to CARES, the app designed to make your journey
              through the CICS smoother, more informed, and more engaging!!!
              CARES is a dedicated mobile app tailored to meet the unique needs
              of the CICS (College of Information and Computing Sciences).{' '}
              {'\n'}
              {'\n'}
              {'\t'}
              {'\t'}It serves as an inclusive hub, designed with students at its
              core. This dynamic app offers a range of essential features to
              enhance the student experience. Within CARES, you'll find an
              invaluable resource for staying informed. With its announcements
              and calendar of activities, students can effortlessly stay
              up-to-date, ensuring that no important information is missed.
              {'\n'}
              {'\n'}
              {'\t'}
              {'\t'} Additionally, CARES empowers students by providing a
              platform for project ideas and proposals, fostering creativity and
              collaboration. Lastly, this app features a chat function that
              opens a direct line of communication to address any complaints or
              concerns. We understand the importance of ensuring your voice is
              heard, and CARES is here to facilitate that process.
            </Text>
          </View>
        </VanillaTouchableOpacity>
      </Modal>
      <TouchableOpacity
        className="flex-row items-center"
        onPress={handlePressRoute}>
        <View className="justify-between">
          <Image
            source={require('~/assets/cares_icon1.png')}
            className="-ml-2 h-12 w-64"
            resizeMode="stretch"
          />
        </View>
      </TouchableOpacity>
      {renderChatIcon()}
    </View>
  );
}

export default Header;
