import {projectName} from 'cics-mobile-client/../../shared/names';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '~/components/Background';
import FooterNav from '~/components/FooterNav';

const suggest = require('~/assets/icons/image-project_suggest.png');
const sov = require('~/assets/icons/saved-or-votes.png');
const votes = require('~/assets/icons/vote.png');
const message = require('~/assets/icons/Message.png');
const menudots = require('~/assets/icons/MenuDots.png');

interface IconButtonType {
  name: string;
  source: ImageSourcePropType;
}

const ProjectSuggestion = () => {
  return (
    <View>
      <ScrollView className="h-[92%]">
        <Background>
          <View className="mb-2 flex-row items-center justify-center gap-2 bg-paper p-6 shadow-sm">
            <Image className="h-8 w-8" source={suggest} />
            <Text className="text-xs">
              Project / Event Suggestions for {projectName}
            </Text>
            <Image className="h-8 w-8" source={suggest} />
          </View>
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
          <Suggestion />
        </Background>
      </ScrollView>
      <FooterNav />
    </View>
  );
};

const Suggestion = () => {
  return (
    <View className="mx-auto mb-2 w-5/6 rounded-3xl bg-primary/90 p-4">
      <View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-2">
            <Text className="text-white">Jhay Mark Reyes</Text>
            <Text className="text-white">3A</Text>
          </View>
          <Text className="text-white">
            24
            <Image source={sov} />
          </Text>
        </View>
        <Text className="my-4 text-center text-white">
          IT Ball and kasama po ang mga Alumni
        </Text>
        <View className="flex-row">
          <IconButton name="vote" source={votes} />
          <IconButton name="message" source={message} />
          <IconButton name="options" source={menudots} />
        </View>
      </View>
    </View>
  );
};

const IconButton = (props: IconButtonType) => {
  const {name, source} = props;
  return (
    <TouchableOpacity className="mr-2 items-center justify-center">
      <Text className="text-xs capitalize text-white">{name}</Text>
      <Image source={source} className="h-4 w-4" />
    </TouchableOpacity>
  );
};

export default ProjectSuggestion;
