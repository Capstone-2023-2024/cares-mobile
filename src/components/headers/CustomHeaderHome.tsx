import {styles} from '~/styles/headerStyle';
import {View, Image, Text, TouchableOpacity} from 'react-native';

function CustomHeaderHome() {
  return (
    <View style={styles.header}>
      <Image
        source={require('~/assets/CICS.png')}
        style={styles.logoright}
        resizeMode="contain"
      />
      <Text style={styles.BSU}>CICS</Text>
      <TouchableOpacity style={styles.userIcon}>
        <Image source={require('~/assets/user.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.messagesIcon}>
        <Image source={require('~/assets/messages.png')} />
      </TouchableOpacity>
    </View>
  );
}

export default CustomHeaderHome;
