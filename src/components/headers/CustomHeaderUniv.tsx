import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, Image} from 'react-native';
import {styles} from '~/styles/headerStyle';

function CustomHeaderUniv() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // Perform the navigation action to go back to the HomeScreen
  };

  return (
    <View style={styles.headerU}>
      <TouchableOpacity onPress={handleGoBack}>
        <Image
          source={require('~/assets/right-arrow.png')}
          style={styles.logoleft}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

export default CustomHeaderUniv;
