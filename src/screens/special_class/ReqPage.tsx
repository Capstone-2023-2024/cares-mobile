import {View, Image, Text} from 'react-native';

const fileSent = '~/assets/filesent.png';

const ReqPage = () => {
  return (
    <View>
      <View className="mr-2 h-12 w-12">
        <Image
          source={require(fileSent)}
          className="h-full w-full"
          resizeMode="center"
        />
      </View>
      <Text className="text-xl font-bold text-white">
        Special Class request submitted
      </Text>
    </View>
  );
};

export default ReqPage;
