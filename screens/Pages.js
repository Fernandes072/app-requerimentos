import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UsersAdm from './UsersAdm';
import HomeAdm from './HomeAdm';
import Profile from './Profile';


const Tab = createBottomTabNavigator();

export default function Pages() {
  return (
    <Tab.Navigator
      initialRouteName="HomeAdm"
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#457918',
        tabBarStyle: { backgroundColor: '#A2E700' },
        headerShown:false
      }}
    >
      <Tab.Screen
        name="HomeAdm"
        component={HomeAdm}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UsersAdm"
        component={UsersAdm}
        options={{
          tabBarLabel: 'Usuários',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-supervisor" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/*export default function HomePage({navigation}) {

  const exit = () => {
    navigation.reset({ 
        index: 0,
        routes: [{ name: 'Login' }],
    });
  }

  return (
    <View style={styles.container}>
      <Text h1> Requerimentosa </Text>
      <Button title = "Sair" onPress={() => exit()} />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});*/
