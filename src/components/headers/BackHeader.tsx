import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import SvgContainer from '../SvgContainer';
import {arrowUri} from '~/utils/svgIcons';

function BackHeader() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // Perform the navigation action to go back to the HomeScreen
  };

  return (
    <View className="bg-paper h-16 flex-row items-center px-2">
      <TouchableOpacity className="rotate-180" onPress={handleGoBack}>
        <SvgContainer uri={arrowUri} size="sm" />
      </TouchableOpacity>
    </View>
  );
}

export default BackHeader;
