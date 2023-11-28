import React, {type ReactNode} from 'react';
import {View} from 'react-native';

const TabContainer = ({children}: {children: ReactNode}) => {
  return <View className="border-b-2 border-primary py-2">{children}</View>;
};

export default TabContainer;
