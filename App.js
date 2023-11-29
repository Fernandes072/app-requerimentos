import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import PagesAdm from './screens/Adm/PagesAdm';
import Pages from './screens/User/Pages';
import CreateAccount from './screens/CreateAccount';
import RequerimentInfoAdm from './screens/Adm/RequerimentInfoAdm';
import UserInfoAdm from './screens/Adm/UserInfoAdm';
import UserRequerimentsAdm from './screens/Adm/UserRequerimentsAdm';
import MyRequeriments from './screens/User/MyRequeriments';
import RequerimentInfo from './screens/User/RequerimentInfo';

const Stack = createStackNavigator();

function MyStack() { 
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Pages" component={Pages} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="PagesAdm" component={PagesAdm} />
      <Stack.Screen name="RequerimentInfoAdm" component={RequerimentInfoAdm} />
      <Stack.Screen name="UserInfoAdm" component={UserInfoAdm} />
      <Stack.Screen name="UserRequerimentsAdm" component={UserRequerimentsAdm} />
      <Stack.Screen name="MyRequeriments" component={MyRequeriments} />
      <Stack.Screen name="RequerimentInfo" component={RequerimentInfo} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}