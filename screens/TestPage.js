import { StyleSheet, View } from 'react-native';
import {  Button, Text } from 'react-native-elements';
import api from '../src/Services/Api';

export default function TestPage({navigation}) {

    const fetchData = async () => {
        try {
            const response = await api.get('/actors');
            console.log(response.data);
        } catch (error) {
            console.log(error);
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
      <Text h1> Requerimentosabc </Text>
      <Button title = "Sair" onPress={() => exit()} />
      <Button title = "Fetch" onPress={() => fetchData()} />  
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
