import {useNav} from '~/contexts/NavigationContext';
import {TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import {Pin} from '~/utils/svgIcons';
import SvgContainer from '~/components/SvgContainer';

const UniversitySchedule = () => {
  const arrowUri = 'https://www.svgrepo.com/show/533621/arrow-sm-right.svg';
  const pin = 'https://www.svgrepo.com/show/527843/pin.svg';
  const {navigateTo} = useNav();
  const UniSchedContainer = () => {
    return (
      <TouchableOpacity
        className="m-2 w-64 items-start justify-center rounded-full bg-primary px-2 py-4"
        onPress={() => navigateTo('Dashboard University Schedule')}>
        <View className="flex-row items-center">
          <SvgContainer uri={pin} size="sm" />
          <View className="ml-2">
            <Text className="text-xs text-white">Final Examination</Text>
            <Text className="text-xs text-white">
              (Non-graduating Students) in 7 days
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="py-6 shadow-sm">
      <View className="flex-row justify-around">
        <Text className="text-lg text-black">University Schedule</Text>
        <TouchableOpacity
          onPress={() => navigateTo('Dashboard University Schedule')}>
          <SvgContainer uri={arrowUri} size="sm" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <UniSchedContainer />
        <UniSchedContainer />
        <UniSchedContainer />
      </ScrollView>
    </View>
  );
};

export default UniversitySchedule;
