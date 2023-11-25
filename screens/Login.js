import { useState } from 'react';
import { StyleSheet, View, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import api from '../src/Services/Api';

export default function Login({navigation}) {

    const [registration, setRegistration] = useState(null);
    const [password, setPassword] = useState(null);

    async function loginVerify(){
        console.log("Abc");
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
            <View style={styles.containerHeader}>
                <Image 
                    source={require('../assets/logo.png')}
                    style={ styles.logo }
                />
                <Text style={styles.title}>Requerimentos</Text>
            </View>

            <View style={styles.containerForm}>
                <TextInput style={styles.input} onChangeText={value => setRegistration(value)} placeholder="Matrícula"/>

                <TextInput style={styles.input} onChangeText={value => setPassword(value)} placeholder="Senha" secureTextEntry={true}/>

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
        </View>
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
        borderBottomColor: '#7F7F7F',
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16,
        marginBottom: 12
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
