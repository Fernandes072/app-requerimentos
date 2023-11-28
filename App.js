import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import PagesAdm from './screens/PagesAdm';
import Pages from './screens/Pages';
import CreateAccount from './screens/CreateAccount';

const Stack = createStackNavigator();

function MyStack() { 
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Pages" component={Pages} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="PagesAdm" component={PagesAdm} />
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