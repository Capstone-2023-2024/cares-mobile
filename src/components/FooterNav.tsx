import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNav} from '~/contexts/NavigationContext';
import SvgContainer from './SvgContainer';
import {specialClass} from '~/utils/svgIcons';

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
    </View>
  );
};

export default FooterNav;
