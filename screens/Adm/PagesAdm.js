import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UsersAdm from './UsersAdm';
import Profile from '../Profile';
import RequirementsAdm from './RequirementsAdm';

//tela de navegação do usuário administrador
//a partir dessa tela, o administrador pode acessar a tela de perfil, a tela de usuários e a tela de requerimentos
const Tab = createBottomTabNavigator();

export default function PagesAdm() {
  return (
    <Tab.Navigator
      initialRouteName="UsersAdm"
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#457918',
        tabBarStyle: { backgroundColor: '#A2E700' },
        headerShown:false
      }}
    >
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
        name="RequirementsAdm"
        component={RequirementsAdm}
        options={{
          tabBarLabel: 'Requerimentos',
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