import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import api from '../src/Services/Api';

export default function Login({navigation}) {

  async function logina(firstName, lastName){
    console.log(firstName, lastName);
    try {
      const response = await api.get('/actors');
      console.log(response.data);
      const users = response.data.map(item => item.name);
      for (let i = 0; i < users.length; i++) {
        if (users[i] == firstName) {
          console.log("achou");
          login();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const login = () => {
    console.log("login");
    navigation.reset({ 
        index: 0,
        routes: [{ name: 'Test' }],
    });
  }

  return (
    <View style={styles.container}>
      <Text h1> Requerimentos </Text>
      <Input 
        placeholder="Usuário" 
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        style={styles}
        onChangeText={value => setUsername(value)}
      />
      <Input 
        placeholder="Senha" 
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        style={styles}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <Button
        title="Entrar"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => logina(username, password)}
      />
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
