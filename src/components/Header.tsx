import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Modal, TouchableOpacity, View, Alert} from 'react-native';
import {Text} from '~/components';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';
import {projectName} from '~/utils/config';

function Header({}: {withBack?: boolean}) {
  const {handleNavigation, initialRouteName} = useNav();
  const {currentStudent, role} = useUser();
  const {currentUser} = useAuth();
  const [modal, setModal] = useState(false);
  const route = useRoute();

  function handlePressRoute() {
    handleNavigation(initialRouteName);
  }
  function handlePressChats() {
    if (currentStudent.section === undefined) {
      return Alert.alert('No section', 'Please set up your section first');
    }
    handleNavigation('Chats');
  }
  const renderChatIcon = () =>
    role !== 'faculty' &&
    route.name !== 'Chats' &&
    currentUser !== null && (
      <>
        <TouchableOpacity
          disabled={currentStudent.email === 'null'}
          className="mr-2 h-8 w-8 items-center"
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
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPressOut={() => setModal(false)}>
          <View className="h-screen rounded-lg bg-primary p-6 shadow-sm">
            <Text className="text-center text-lg font-bold text-paper">
              CARES (Cultivating Assistance, Resolution, and Empowerment for
              Students)
            </Text>
            <Text className="my-auto h-max text-center text-paper">
              Welcome to CARES, the app designed to make your journey through
              the CICS smoother, more informed, and more engaging!!! CARES is a
              dedicated mobile app tailored to meet the unique needs of the CICS
              (College of Information and Computing Sciences). It serves as an
              inclusive hub, designed with students at its core. This dynamic
              app offers a range of essential features to enhance the student
              experience. Within CARES, you'll find an invaluable resource for
              staying informed. With its announcements and calendar of
              activities, students can effortlessly stay up-to-date, ensuring
              that no important information is missed. Additionally, CARES
              empowers students by providing a platform for project ideas and
              proposals, fostering creativity and collaboration. Lastly, this
              app features a chat function that opens a direct line of
              communication to address any complaints or concerns. We understand
              the importance of ensuring your voice is heard, and CARES is here
              to facilitate that process.
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        onLongPress={() => setModal(true)}
        className="flex-row items-center"
        onPress={handlePressRoute}>
        <View className="h-8 w-8 bg-paper">
          <Image
            source={require('~/assets/cares_icon.png')}
            className="h-full w-full"
            resizeMode="center"
          />
        </View>
        <Text className="ml-2 text-base font-bold uppercase text-primary">
          {projectName}
        </Text>
      </TouchableOpacity>
      {renderChatIcon()}
    </View>
  );
}

export default Header;
