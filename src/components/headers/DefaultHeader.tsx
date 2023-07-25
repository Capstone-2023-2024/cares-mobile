import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useNav} from '~/contexts/NavigationContext';

function DefaultHeader() {
  const {navigateTo} = useNav();

  return (
    <View className="h-16 flex-row items-center bg-gray-500 px-2">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => navigateTo('Dashboard Home')}>
        <View className="mr-2 h-12 w-12">
          <Image
            source={require('~/assets/CICS.png')}
            className="h-full w-full"
            resizeMode="center"
          />
        </View>
        <Text className="text-xl font-bold text-white">CICS</Text>
      </TouchableOpacity>
      <TouchableOpacity className="-top-1 ml-auto mr-2 h-9 w-9 items-center">
        <Text>User</Text>
        {/* <Image source={require('~/assets/user.png')} /> */}
      </TouchableOpacity>
      <TouchableOpacity className="-top-1 mr-2 h-9 w-9 items-center">
        <Text>Messages Icn</Text>
        {/* <Image source={require('~/assets/messages.png')} /> */}
      </TouchableOpacity>
    </View>
  );
}

export default DefaultHeader;
