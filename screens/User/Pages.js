import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from '../Profile';
import SendRequirement from './SendRequirement';

//tela de navegação do usuário comum
//a partir dessa tela, o usuário pode acessar a tela de perfil e a tela de enviar requerimento
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
        name="SendRequirement"
        component={SendRequirement}
        options={{
          tabBarLabel: 'Requerimento',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
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