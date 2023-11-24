import { useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

export default function CreateAccount({navigation}) {

    const[name, setName] = useState(null);
    const[email, setEmail] = useState(null);
    const[registration, setRegistration] = useState(null);
    const[course, setCourse] = useState(null);
    const[username, setUsername] = useState(null);
    const[password, setPassword] = useState(null);
    const[confirmPassword, setConfirmPassword] = useState(null);

    const createAccount = () => {
        navigation.reset({ 
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    const back = () => {
        navigation.reset({ 
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/logo.png')}
                style={ styles.logo }
            />
            <Text style={styles.h1} h1> Criar Conta </Text>
            <Input 
                placeholder="Nome Completo" 
                inputContainerStyle={styles.input}
                onChangeText={value => setName(value)}
            />
            <Input 
                placeholder="Email" 
                inputContainerStyle={styles.input}
                onChangeText={value => setEmail(value)}
            />
            <Input 
                placeholder="Matrícula" 
                inputContainerStyle={styles.input}
                onChangeText={value => setRegistration(value)}
            />
            <Input 
                placeholder="Curso" 
                inputContainerStyle={styles.input}
                onChangeText={value => setCourse(value)}
            />
            <Input 
                placeholder="Usuário" 
                inputContainerStyle={styles.input}
                onChangeText={value => setUsername(value)}
            />
            <Input 
                placeholder="Senha" 
                inputContainerStyle={styles.input}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
            />
            <Input 
                placeholder="Confirmar Senha" 
                inputContainerStyle={styles.input}
                onChangeText={value => setConfirmPassword(value)}
                secureTextEntry={true}
            />
            <Button
                title="Criar conta"
                titleStyle={{ color: '#457918'}}
                buttonStyle={styles.button}
                containerStyle={styles.containerButton}
                onPress={() => createAccount()}
            />
            <Pressable>
                <Text style={styles.create} onPress={() => back()}> Fazer login </Text>
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
        marginBottom: -40
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
        alignSelf: 'center',
        marginBottom: -10
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
