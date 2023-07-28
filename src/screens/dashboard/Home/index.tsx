import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FooterNav from '~/components/FooterNav';
import Announcements from './Announcements';
import Notifications from './Notifications';
import UniversitySchedule from './UniversitySchedule';

const Home = () => {
  return (
    <View className="flex-1">
      <ScrollView>
        <View className="relative mt-2 border-b-2 border-slate-400">
          <Image
            source={require('path/to/your/user-image.jpg')}
            className="w-100 h-100 rounded-full border-2 border-black"
          />
          <Text className="-mt-4 ml-12 text-xl font-bold text-black">
            Welcome,{'\n'}Andrei!
          </Text>
          <TouchableOpacity className="mb-10 ml-auto mt-2 h-10 w-10">
            <Image
              source={require('path/to/your/ellipsis-icon.png')}
              className="h-full w-full"
            />
          </TouchableOpacity>
        </View>
        <UniversitySchedule />
        <Announcements />
        <Notifications />
      </ScrollView>
      <View>
        <FooterNav />
      </View>
    </View>
  );
};

export default Home;
