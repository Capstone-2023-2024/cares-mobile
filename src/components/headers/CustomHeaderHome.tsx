import {View, Image, Text, TouchableOpacity} from 'react-native';

function CustomHeaderHome() {
  return (
    <View className='flex-row items-center bg-gray-300 px-2 h-16'>
      <View className='w-2 h-3/4 border border-black -left-1/4'>
        <Image
          source={require('~/assets/CICS.png')}
          resizeMode="contain"
        />
      </View>
      <Text className='text-white font-bold text-xl -left-1/2'>CICS</Text>
      <TouchableOpacity className='-top-1 items-center ml-auto mr-2 w-9 h-9'>
        <Image source={require('~/assets/user.png')} />
      </TouchableOpacity>
      <TouchableOpacity className='-top-1 items-center mr-2 w-9 h-9'>
        <Image source={require('~/assets/messages.png')} />
      </TouchableOpacity>
    </View>
  );
}

export default CustomHeaderHome;
