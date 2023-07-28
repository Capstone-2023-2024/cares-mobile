import {Image, Text, TouchableOpacity, View} from 'react-native';

const Notifications = () => {
  const NotifContainer = () => {
    return (
      <TouchableOpacity className="m-2 w-full items-center justify-center rounded-lg border bg-white">
        <View className="flex-row items-center">
          <Text>Idea Icon</Text>
          {/* <Image source={require(idea)} className='w-12 h-12 ml-2' /> */}
          <Text className="m-2 w-3/4 text-left text-base font-bold text-black">
            Final Examination (Non-graduating Students) in 7 days Final
            Examination (Non-graduating Students) in 7 days
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="mb-5 ml-1 mt-2 h-auto w-full rounded-lg bg-slate-400">
      <Text className="my-2 ml-5 text-lg font-bold text-black">
        Notifications
      </Text>
      <NotifContainer />
      <NotifContainer />
      <NotifContainer />
      <TouchableOpacity>
        <Image
          source={require('path/to/your/right-arrow-icon.png')}
          className="h-6 w-6"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Notifications;
