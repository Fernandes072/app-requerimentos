import { StyleSheet, View } from 'react-native';
import {  Button, Text } from 'react-native-elements';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {

    const [user, setUser] = useState(null);

    async function getUser(){
        try {
            setUser(await AsyncStorage.getItem('user'));
        } catch (error) {
            console.log("Erro ao buscar usuário!");
        }
    }

    async function deleteSave(){
        try {
            await AsyncStorage.removeItem('user');
            exit();
        } catch (error) {
            console.log("Erro ao deletar usuário!");
        }
    }

    const exit = () => {
      navigation.reset({ 
          index: 0,
          routes: [{ name: 'Login' }],
      });
    }
  
    return (
      <View style={styles.container}>
        <Text h1> Home </Text>
        <Button title = "Buscar" onPress={() => getUser()} />
        <Button title = "Sair" onPress={() => deleteSave()} />
        <Text> {user} </Text>  
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
});