import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import PagesAdm from './screens/Adm/PagesAdm';
import Pages from './screens/User/Pages';
import CreateAccount from './screens/CreateAccount';
import RequirementInfoAdm from './screens/Adm/RequirementInfoAdm';
import UserInfoAdm from './screens/Adm/UserInfoAdm';
import UserRequirementsAdm from './screens/Adm/UserRequirementsAdm';
import MyRequirements from './screens/User/MyRequirements';
import RequirementInfo from './screens/User/RequirementInfo';

const Stack = createStackNavigator();

function MyStack() { 
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Pages" component={Pages} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="PagesAdm" component={PagesAdm} />
      <Stack.Screen name="RequirementInfoAdm" component={RequirementInfoAdm} />
      <Stack.Screen name="UserInfoAdm" component={UserInfoAdm} />
      <Stack.Screen name="UserRequirementsAdm" component={UserRequirementsAdm} />
      <Stack.Screen name="MyRequirements" component={MyRequirements} />
      <Stack.Screen name="RequirementInfo" component={RequirementInfo} />
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