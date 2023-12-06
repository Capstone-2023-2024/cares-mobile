import React, {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SvgContainer from '~/components/SVGContainer';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';
import {arrowUri} from '~/utils/svgIcons';
import type {HeadingTemplateProps} from '../others/home/Usertab/types';

const HeadingTemplate = (props: HeadingTemplateProps) => {
  const {handleNavigation} = useNav();
  const {currentStudent} = useUser();
  const {navigation, params, title} = props;

  return (
    <View className="flex-row justify-between px-8 py-4">
      <Text className="text-xl font-bold capitalize text-black">{title}</Text>
      <TouchableOpacity
        className={
          currentStudent.email === 'null' ? 'opacity-25' : 'opacity-100'
        }
        disabled={currentStudent.email === 'null'}
        onPress={() => handleNavigation(navigation, params)}>
        <SvgContainer uri={arrowUri} size="sm" />
      </TouchableOpacity>
    </View>
  );
};

export default HeadingTemplate;
