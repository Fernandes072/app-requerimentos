import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={require('./assets/logo.png')} />
      <Text style={styles.titulo}>
        Requerimentos
      </Text>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text style={styles.Text}>
        abc
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text>Button</Text>
      </TouchableOpacity>
      <Button style={styles.button} title="clique aqui">
      </Button>


      <View style={styles.titulo}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text style={styles.Text}>
        abc
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text>Button</Text>
      </TouchableOpacity>
      <Button style={styles.button} title="clique aqui">
      </Button>
    </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    width: 100,
    height: 100,
    backgroundColor: '#ff0'
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f00'
  },
});
