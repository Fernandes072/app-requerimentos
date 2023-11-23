import { StyleSheet, View } from 'react-native';
import {  Button, Text } from 'react-native-elements';

export default function HomePage({navigation}) {

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
});
