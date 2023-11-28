import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SvgContainer from '~/components/SVGContainer';
import {useUser} from '~/contexts/UserContext';
import type {PathListType} from '~/utils/navPaths/types';
import {arrowUri} from '~/utils/svgIcons';
import type {HeadingTemplateProps} from '../others/home/Usertab/types';

const HeadingTemplate = (props: HeadingTemplateProps) => {
  const navigate = useNavigation();
  const {currentStudent} = useUser();
  const {navigation, title} = props;

  function handleNavigation(path: PathListType) {
    navigate.dispatch(CommonActions.navigate({name: path}));
  }

  function handlePressNavigation() {
    handleNavigation(navigation);
  }

  return (
    <View className="flex-row justify-between px-8 py-4">
      <Text className="text-xl font-bold capitalize text-black">{title}</Text>
      <TouchableOpacity
        className={
          currentStudent.email === 'null' ? 'opacity-25' : 'opacity-100'
        }
        disabled={currentStudent.email === 'null'}
        onPress={handlePressNavigation}>
        <SvgContainer uri={arrowUri} size="sm" />
      </TouchableOpacity>
    </View>
  );
};

export default HeadingTemplate;
