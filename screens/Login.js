import { useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

export default function Login({navigation}) {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const login = () => {
    if (username == "abc" || password == "def") {
      navigation.reset({ 
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }

  return (
    <View style={styles.container}>
      {/*<View style = {styles.topbar}></View>*/}
      <Image 
        source={require('../assets/logo.png')}
        style={ styles.logo }
      />
      <Text style={{color: '#7F7F7F', marginBottom: 20}} h1> Requerimentos </Text>
      <Input 
        placeholder="Usuário" 
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        inputContainerStyle={styles.input}
        onChangeText={value => setUsername(value)}
      />
      <Input 
        placeholder="Senha" 
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        inputContainerStyle={styles.input}
        onChangeText={value => setPassword(value)}
        secureTextEntry={true}
      />
      <Button
        title="Entrar"
        titleStyle={{ color: '#457918'}}
        buttonStyle={styles.button}
        containerStyle={styles.containerButton}
        onPress={() => login()}
      />
      <Pressable>
        <Text style={{color: '#457918', fontWeight: 'bold'}}> Criar conta </Text>
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
  topbar: {
    backgroundColor: '#A2E700',
    height: 100,
    width: '100%',
    marginTop: -240,
  }, 
  button: {
    backgroundColor: '#A2E700',
    borderRadius: 3,
    color: '#457918',
  },
  containerButton: {
    width: '50%',
    marginHorizontal: 50,
    marginVertical: 10,
    marginBottom: 20
  },
  input: {
    width: '90%',
    alignSelf: 'center',
  }
});
