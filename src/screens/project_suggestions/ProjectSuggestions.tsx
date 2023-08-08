import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FooterNav from '~/components/FooterProjectS';
import BackHeader from '~/components/headers/BackHeader';
import {bsuBg} from '~/utils/imagePaths';

const suggest = require('~/assets/icons/image-project_suggest.png');
const sov = require('~/assets/icons/saved-or-votes.png');
const votes = require('~/assets/icons/vote.png');
const message = require('~/assets/icons/Message.png');
const menudots = require('~/assets/icons/MenuDots.png');

const SuggestionPage = () => {
  return (
    <View className="flex-1">
      <ScrollView>
        <ImageBackground source={bsuBg}>
          <BackHeader />
          <View>
            <View>
              <Image source={suggest} />
              <Text>Project / Event Suggestions for CICS</Text>
              <Image source={suggest} />
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
      <View>
        <View>
          <Text>Jhay Mark</Text>
          <Text>
            24
            <Image source={sov} />
          </Text>
        </View>
        <Text>IT Ball and kasama po ang mga Alumni</Text>

        <View>
          <TouchableOpacity>
            <Image source={votes} />
            <Text>Vote</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={message} />
            <Text>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={menudots} />
            <Text>Options</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SuggestionPage;
