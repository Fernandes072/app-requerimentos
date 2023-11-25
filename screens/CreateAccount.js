import { useState } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import api from '../src/Services/Api';

export default function CreateAccount({navigation}) {

    const[name, setName] = useState(null);
    const[email, setEmail] = useState(null);
    const[registration, setRegistration] = useState(null);
    const[course, setCourse] = useState(null);
    const[password, setPassword] = useState(null);
    const[confirmPassword, setConfirmPassword] = useState(null);

    async function createAccountVerify(){
        console.log(name, email, registration, course, password, confirmPassword);

        let findedRegistration = false;
        try {
            const response = await api.get(`/users/${registration}`);
            console.log(response.data);
            findedRegistration = true;
        } catch (error) {
        }
        if (findedRegistration) {
            console.log("Matrícula já cadastrada!");
        }

        /*let findedEmail = false;
        try{
            const response = await api.get(`/users/${email}`);
            console.log(response.data);
            findedEmail = true;
        } catch (error) {
        }
        if (findedEmail) {
            console.log("Email já cadastrado!");
        }*/

        //fazer consulta pelo email e pela usuario

        let passwordMatch = false;
        if (password == confirmPassword) {
            passwordMatch = true;
        } else {
            console.log("Senhas não conferem!");
        }

        if (!findedRegistration && /*!findedEmail && */ passwordMatch) {
            try {
                const response = await api.post('/users', {
                    name: name,
                    email: email,
                    registration: registration,
                    course: course,
                    password: password
                });
                console.log(response.data);
                createAccount();
            } catch (error) {
                console.log("Erro ao criar conta!");
            }
        }
    }

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
            <View style={styles.containerHeader}>
                <Image 
                    source={require('../assets/logo.png')}
                    style={ styles.logo }
                />
                <Text style={styles.title}>Requerimentos</Text>
            </View>

            <View style={styles.containerForm}>
                <TextInput style={styles.input} onChangeText={value => setName(value)} placeholder="Nome"/>

                <TextInput style={styles.input} onChangeText={value => setEmail(value)} placeholder="Email"/>

                <TextInput style={styles.input} onChangeText={value => setRegistration(value)} placeholder="Matrícula"/>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={course}
                        onValueChange={value => setCourse(value)}
                        style={styles.picker}
                    >
                    <Picker.Item label="Selecione um curso" value="" />
                    <Picker.Item label="Ciência da Computação" value="1" />
                    <Picker.Item label="Logística" value="2" />
                    <Picker.Item label="Manutenção e Suporte em Informática" value="3" />
                    <Picker.Item label="Agronegócio" value="4" />
                    </Picker>
                </View>

                <TextInput style={styles.input} onChangeText={value => setPassword(value)} placeholder="Senha" secureTextEntry={true}/>

                <TextInput style={styles.input} onChangeText={value => setConfirmPassword(value)} placeholder="Confirmar senha" secureTextEntry={true}/>

                <TouchableOpacity style={styles.button}  onPress={() => createAccountVerify()}>
                    <Text style={styles.buttonText}>Criar conta</Text>
                </TouchableOpacity>

                <View style={styles.containerLogin}>
                    <Text style={styles.notHave}>Já possui uma conta? </Text>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginText} onPress={() => back()}>Login</Text>
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
    pickerContainer: {
        marginBottom: 12,
        backgroundColor: '#EBEAEF',
        marginLeft: '-4.5%',
        marginRight: '-4.5%',
    },
    picker: {
        color: '#7F7F7F',
        height: 40,
        width: '100%',
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
    containerLogin: {
        width: '47%',
        flexDirection: 'row', 
        marginTop: 14,
        alignSelf: 'flex-end'
    },
    notHave: {
        color: '#7F7F7F',
        fontSize: 14,
    },
    loginButton: {
    },
    loginText: {
        color: '#457918',
        fontSize: 14,
        fontWeight: 'bold'
    }
});
