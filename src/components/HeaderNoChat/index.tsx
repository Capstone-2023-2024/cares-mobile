import React, {useState} from 'react';
import {Image, Modal, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '~/components/Text';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';

function Header({}: {withBack?: boolean}) {
  const {handleNavigation, initialRouteName} = useNav();
  useUser();
  useAuth();
  const [modal, setModal] = useState(false);

  function handlePressRoute() {
    handleNavigation(initialRouteName);
  }

  const [infoModalVisible, setInfoModalVisible] = useState(false);

  function handleInfoButtonPress() {
    setInfoModalVisible(true);
  }

  function closeModal() {
    setInfoModalVisible(false);
  }

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
          <View className="h-screen bg-primary p-5 shadow-sm">
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
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={infoModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}>
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPressOut={closeModal}>
          <View className="mx-8 my-72 h-56 rounded-2xl border-2 bg-primary p-5 shadow-sm">
            <View className="flex-col items-center">
              <Image
                source={require('~/assets/info.png')}
                className="-ml-2 h-8 w-8 invert"
                resizeMode="stretch"
                style={{tintColor: 'white'}}
              />
              <Text className="mt-2 text-start text-xl font-bold text-paper">
                Raise a Concern/Complaints
              </Text>
            </View>
            <Text className="mt-6 text-justify text-paper">
              {'\t'}
              {'\t'}To address concerns or complaints, contact your mayors and
              engage with your class section for discussions and solutions.
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        onLongPress={() => setModal(true)}
        className="flex-row items-center"
        onPress={handlePressRoute}>
        <View className="justify-between">
          <Image
            source={require('~/assets/cares_icon1.png')}
            className="h-16 w-36"
            resizeMode="stretch"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleInfoButtonPress}>
        <Image
          source={require('~/assets/info.png')}
          className="mr-2 h-10 w-10"
          resizeMode="center"
        />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
