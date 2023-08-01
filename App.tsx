import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AccRegistered from "./src/screens/AccRegistered"
import Chats from "./src/screens/Chats"
import AccountSetting from "./src/screens/AccountSetting"
import Dashboard from "./src/screens/Dashboard"
import VerificationCode from "./src/screens/VerificationCode"
import CreatePassword from "./src/screens/CreatePass"
import Forgot from "./src/screens/Forgot"
import Register from "./src/screens/Register"
import LoginForm from "./src/screens/Login"
import { NavigationContainer } from "@react-navigation/native"

const Index =() => {
    const Stack = createNativeStackNavigator()
  return <NavigationContainer>

  <Stack.Navigator>
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="CreatePass" component={CreatePassword} />
      <Stack.Screen name="AccRegistered" component={AccRegistered} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
    </Stack.Navigator>
  </NavigationContainer> 
}

export default Index