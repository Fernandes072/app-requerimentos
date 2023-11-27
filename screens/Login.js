import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../src/Services/Api';

export default function Login({navigation}) {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [errorLogin, setErrorLogin] = useState(null);

    const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);

    const passwordRef = useRef(null);

    async function loginVerify(){
        console.log(username, password);
        try {
            const response = await api.get(`/users/username/${username}`);
            if (response.data.password == password) {
                await AsyncStorage.setItem('user', JSON.stringify(response.data));
                login();
            } else{
                throw new Error();
            }
        } catch (error) {
            setErrorLogin("Usuário ou senha inválidos!");
            //Alert.alert("Aviso","Usuário ou senha inválidos!");
            console.log("Usuário ou senha inválidos!");
        }
    }

    useEffect(() => {
        loadSave();
    }, []);

    async function loadSave(){
        try {
            const user = await AsyncStorage.getItem('user');
            console.log(user);
            if (user != null) {
                login();
            }
        } catch (error) {
            console.log("Erro ao carregar usuário!");
        }
    }

    const login = () => {
        navigation.reset({ 
            index: 0,
            routes: [{ name: 'Pages' }],
        });
    }

    const createAccount = () => {
        navigation.reset({ 
            index: 1,
            routes: [{ name: 'Login' },
                    { name: 'CreateAccount' }
            ],
        });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerHeader}>
                <Image 
                    source={require('../assets/logo.png')}
                    style={ styles.logo }
                />
                <Text style={styles.title}>Requerimentos</Text>
            </View>

            <View style={styles.containerForm}>
                <TextInput style={styles.input} 
                    onChangeText={value => {setUsername(value); setIsUsernameSubmitted(false)}} placeholder="Usuário" returnKeyType="next" 
                    onSubmitEditing={() => {passwordRef.current.focus(); setIsUsernameSubmitted(true)}}
                    onBlur={() => {setIsUsernameSubmitted(true)}} autoCapitalize='none'
                    value = {isUsernameSubmitted ? (username != null ? username.trim() : username) : username}
                />

                <TextInput style={styles.input} 
                    onChangeText={value => setPassword(value)} placeholder="Senha" secureTextEntry={true} returnKeyType="done" 
                    onSubmitEditing={() => loginVerify()} ref={passwordRef} autoCapitalize='none'
                />

                {errorLogin ? <Text style={styles.errorMessage}>{errorLogin}</Text> : null}

                <TouchableOpacity style={styles.button}  onPress={() => loginVerify()}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.containerRegister}>
                    <Text style={styles.notHave}>Não possui uma conta? </Text>
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.registerText} onPress={() => createAccount()}>Registre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>    
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEAEF'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    logo: {
        width: 300,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    title:{
        color: '#7F7F7F',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '-5%',
    },
    containerForm: {
        flex: 1,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    input: {
        borderBottomColor: '#457918',
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16,
        marginBottom: 12
    },
    errorMessage: {
        color: '#FF0000',
        fontSize: 13,
        alignSelf: 'center',
        marginTop: "3%",
        marginBottom: '-3%'
    },
    button: {
        backgroundColor: '#A2E700',
        width: '70%',
        height: 40,
        borderRadius: 4,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 14
    },
    buttonText: {
        color: '#457918',
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerRegister: {
        width: '60%',
        flexDirection: 'row', 
        marginTop: 14,
        alignSelf: 'flex-end'
    },
    notHave: {
        color: '#7F7F7F',
        fontSize: 14,
    },
    registerButton: {
    },
    registerText: {
        color: '#457918',
        fontSize: 14,
        fontWeight: 'bold'
    }
});
