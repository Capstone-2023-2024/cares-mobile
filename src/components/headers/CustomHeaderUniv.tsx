import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, Image} from 'react-native';
import {styles} from '~/styles/headerStyle';

function CustomHeaderUniv() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // Perform the navigation action to go back to the HomeScreen
  };

  return (
    <View className='flex-row items-center px-2 h-16'>
      <TouchableOpacity onPress={handleGoBack}>
        <Image
          source={require('~/assets/right-arrow.png')}
          className='rotate-180 w-9 mx-[2%] h-3/4'
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

export default CustomHeaderUniv;
