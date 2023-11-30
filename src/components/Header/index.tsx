import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  TouchableOpacity as VanillaTouchableOpacity,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Text from '~/components/Text';
import {useAuth} from '~/contexts/AuthContext';
import {useNav} from '~/contexts/NavigationContext';

function Header({}: {withBack?: boolean}) {
  const {currentUser} = useAuth();
  const {handleNavigation, initialRouteName} = useNav();
  const [modal, setModal] = useState(false);
  const route = useRoute();

  function handlePressRoute() {
    route.name.toLowerCase() === 'home'
      ? setModal(true)
      : handleNavigation(initialRouteName);
  }

  return (
    <View
      className={`${
        route.name.toLowerCase() === 'home' || currentUser === null
          ? 'bg-transaparent'
          : 'bg-primary/30'
      } relative h-16 flex-row items-center justify-between px-2`}>
      {route.name.toLowerCase() === 'home' && (
        <Image
          style={{opacity: 0.3}}
          source={require('~/assets/BustosImage.jpg')}
          className="absolute top-0 z-0 h-full bg-cover"
        />
      )}
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
        className="top-0 z-10 flex-row items-center"
        onPress={handlePressRoute}>
        <View className="relative justify-between">
          <Text className="absolute left-12 top-4 z-10 text-2xl font-bold uppercase text-paper">
            cares
          </Text>
          <Image
            source={
              // route.name.length > 5
              // ? require('~/assets/cares_icon_header_long_name.png')
              // :
              require('~/assets/cares_icon_header_base.png')
            }
            className="-ml-2 h-auto w-screen"
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Header;
