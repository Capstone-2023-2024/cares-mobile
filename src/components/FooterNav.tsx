import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNav} from '~/contexts/NavigationContext';
import {specialClass} from '~/utils/svgIcons';
import SvgContainer from './SvgContainer';

const FooterNav = () => {
  const {navigateTo} = useNav();
  return (
    <View>
      <View className="flex-row items-center justify-evenly p-3">
        <TouchableOpacity onPress={() => navigateTo('Special Class Takers')}>
          <SvgContainer uri={specialClass} size="sm" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterNav;
