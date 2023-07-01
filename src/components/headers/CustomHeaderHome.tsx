import {View, Image, Text, TouchableOpacity} from 'react-native';

function CustomHeaderHome() {
  return (
    <View className="h-16 flex-row items-center bg-gray-500 px-2">
      <View className="mr-2 h-12 w-12">
        <Image
          source={require('~/assets/CICS.png')}
          className="h-full w-full"
          resizeMode="center"
        />
      </View>
      <Text className="text-xl font-bold text-white">CICS</Text>
      <TouchableOpacity className="-top-1 ml-auto mr-2 h-9 w-9 items-center">
        <Image source={require('~/assets/user.png')} />
      </TouchableOpacity>
      <TouchableOpacity className="-top-1 mr-2 h-9 w-9 items-center">
        <Image source={require('~/assets/messages.png')} />
      </TouchableOpacity>
    </View>
  );
}

export default CustomHeaderHome;
