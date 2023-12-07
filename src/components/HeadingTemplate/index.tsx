import React, {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SvgContainer from '~/components/SVGContainer';
import {useUser} from '~/contexts/UserContext';
import {arrowUri} from '~/utils/svgIcons';
import type {HeadingTemplateProps} from '../others/home/Usertab/types';
import {useNav} from '~/contexts/NavigationContext';

const HeadingTemplate = (props: HeadingTemplateProps) => {
  const {handleNavigation} = useNav();
  const {currentStudent} = useUser();
  const {navigation, title} = props;

  function handlePressNavigation() {
    handleNavigation(navigation, props.params);
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
