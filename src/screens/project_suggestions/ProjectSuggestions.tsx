import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Text} from '~/components';
import BackHeader from '~/components/BackHeader';
import FooterNav from '~/components/FooterProjectS';

// Import the images directly without using constants
const suggest = require('~/assets/icons/image-project_suggest.png');
const sov = require('~/assets/icons/saved-or-votes.png');
const votes = require('~/assets/icons/vote.png');
const message = require('~/assets/icons/Message.png');
const menudots = require('~/assets/icons/MenuDots.png');
const bsu = '~/assets/BSUBACKGROUND.png';
const SuggestionPage = () => {
  return (
    <View className="flex-1">
      <ScrollView>
        <ImageBackground
          source={require(bsu)} // Replace with your background image path
          imageStyle={{opacity: 0.7}} // Set the opacity of the background image
        >
          <BackHeader />
          {/* Project Suggestions Section */}
          <View className="border-black-500 mb-5 w-full self-center border-2 bg-red-800">
            <View className="m-5 flex-row items-center self-center">
              <Image className="h-12 w-12" source={suggest} />
              <Text className="flex-1 text-center text-lg font-bold text-white">
                Project / Event Suggestions for CICS
              </Text>
              <Image className="h-12 w-12" source={suggest} />
            </View>
          </View>

          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
        </ImageBackground>
      </ScrollView>
      <View>
        <FooterNav />
      </View>
    </View>
  );
};

const Suggestion = () => {
  return (
    <View>
      {/* Individual Suggestion */}
      <View className="mb-5 h-40 w-4/5 self-center rounded-3xl bg-gray-300">
        <View className="m-2 flex-row justify-between">
          <Text className="mt-2 text-black">Jhay Mark Reyes - BSIT 3A</Text>
          <Text className="text-black">
            24
            <Image source={sov} />
          </Text>
        </View>
        <Text className="mt-2 text-center text-lg font-semibold text-black">
          IT Ball and kasama po ang mga Alumni
        </Text>
        <View className="m-10 flex-row items-center justify-around">
          <TouchableOpacity className="flex-row items-center">
            <Image className="h-5 w-5" source={votes} />
            <Text className="ml-2 text-black">Vote</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Image className="h-5 w-5" source={message} />
            <Text className="ml-2 text-black">Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Image className="h-5 w-5" source={menudots} />
            <Text className="ml-2 text-black">Options</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SuggestionPage;
