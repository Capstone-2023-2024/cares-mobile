import {useNav} from '~/contexts/NavigationContext';
import {TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';

const Announcements = () => {
  const {navigateTo} = useNav();
  const AnnouncementContainer = () => {
    return (
      <TouchableOpacity
        className="mb-2 ml-2 h-auto w-[320] items-center justify-center rounded-lg border bg-white shadow-md"
        onPress={() => navigateTo('Dashboard Announcements')}>
        <View className="flex-row items-center">
          <Text className="mb-2 mt-2 text-center text-base font-bold text-black">
            <Text>Pin Icon</Text>
            {/* <Image source={require(pin)} className='w-12 h-12 mx-2' /> */}
            CITE DEPARTMENT {'\n'}
            {'\n'}
            Heads up, future engineers!As per Office Memorandum from the Office
            of the Director for Administrative and Management Services
            Division... {'\n'}
            {'\n'}(Read More)
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="mb-2 mt-2 border-b-2 border-slate-400">
      <Text className="mb-2 ml-2 text-xl font-bold text-black">
        Announcements
      </Text>
      <TouchableOpacity
        className="-right-[85%] -top-[13%]"
        onPress={() => navigateTo('Dashboard Announcements')}>
        <Image
          source={require('path/to/your/right-arrow-icon.png')}
          className="h-6 w-6"
        />
      </TouchableOpacity>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <AnnouncementContainer />
        <AnnouncementContainer />
        <AnnouncementContainer />
      </ScrollView>
    </View>
  );
};

export default Announcements;
