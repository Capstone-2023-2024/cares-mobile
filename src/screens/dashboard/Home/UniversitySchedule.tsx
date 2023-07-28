import {useNav} from '~/contexts/NavigationContext';
import {TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import {Pin} from '~/utils/svgIcons';

const UniversitySchedule = () => {
  const {navigateTo} = useNav();
  // const imagePaths = useImagePath();
  const UniSchedContainer = () => {
    return (
      <TouchableOpacity
        className="mb-2 ml-2 h-16 w-64 items-start justify-center rounded-xl border bg-red-600"
        onPress={() => navigateTo('Dashboard University Schedule')}>
        <View className="flex-row items-center">
          <Pin />
          {/* <Text>Pin Icon</Text> */}
          {/* <Image source={require(pin)} className='w-12 h-12 mx-2' /> */}
          <Text className="text-base text-white">
            Final Examination (Non-graduating Students) in 7 days
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="mb-2 mt-2 border-b-2 border-slate-400">
      <Text className="mb-2 ml-2 text-lg font-bold text-black">
        University Schedule
      </Text>

      <TouchableOpacity
        className="right-[-85%] top-[-20%]"
        onPress={() => navigateTo('Dashboard University Schedule')}>
        <Image
          source={require('path/to/your/right-arrow-icon.png')}
          className="h-6 w-6"
        />
      </TouchableOpacity>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <UniSchedContainer />
        <UniSchedContainer />
        <UniSchedContainer />
      </ScrollView>
    </View>
  );
};

export default UniversitySchedule;
