import { useState } from 'react';
import { StyleSheet, View, Image, Pressable, Alert } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import api from '../src/Services/Api';

export default function Login({navigation}) {

  const [registration, setRegistration] = useState(null);
  const [password, setPassword] = useState(null);

  async function loginVerify(){
    console.log(registration, password);
    try {
      const response = await api.get(`/users/${registration}`);
      console.log(response.data);
      if (response.data.password == password) {
          login();
      } else{
        throw new Error();
      }
      
    } catch (error) {
      Alert.alert("Aviso","Usuário ou senha inválidos!");
      console.log("Usuário ou senha inválidos!");
    }
  }

  const login = () => {
    navigation.reset({ 
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }

  const createAccount = () => {
    navigation.reset({ 
      index: 1,
      routes: [{ name: 'CreateAccount' }],
    });
  }

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')}
        style={ styles.logo }
      />
      <Text style={styles.h1} h1> Requerimentos </Text>
      <Input 
        placeholder="Matrícula" 
        inputContainerStyle={styles.input}
        onChangeText={value => setRegistration(value)}
      />
      <Input 
        placeholder="Senha" 
        inputContainerStyle={styles.input}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <Button
        title="Entrar"
        titleStyle={{ color: '#457918'}}
        buttonStyle={styles.button}
        containerStyle={styles.containerButton}
        onPress={() => loginVerify()}
      />
      <Pressable>
        <Text style={styles.create} onPress={() => createAccount()}> Criar conta </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAEF',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: -300,
    marginBottom: -70
  },
  button: {
    backgroundColor: '#A2E700',
    borderRadius: 3,
    color: '#457918'
  },
  containerButton: {
    width: '50%',
    marginHorizontal: 50,
    marginVertical: 10,
    marginBottom: 20
  },
  input: {
    width: '90%',
    alignSelf: 'center'
  }, 
  h1: {
    color: '#7F7F7F', 
    marginBottom: 20
  },
  create: {
    color: '#457918', 
    fontWeight: 'bold'
  }
});
