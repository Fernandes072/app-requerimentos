import { useState, useRef } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import api from '../src/Services/Api';

export default function CreateAccount({navigation}) {

    const[name, setName] = useState(null);
    const[email, setEmail] = useState(null);
    const[registration, setRegistration] = useState(null);
    const[course, setCourse] = useState(null);
    const[username, setUsername] = useState(null);
    const[password, setPassword] = useState(null);
    const[confirmPassword, setConfirmPassword] = useState(null);

    const [errorName, setErrorName] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorRegistration, setErrorRegistration] = useState(null);
    const [errorCourse, setErrorCourse] = useState(null);
    const [errorUsername, setErrorUsername] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);

    const [isNameSubmitted, setIsNameSubmitted] = useState(false);
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const [isRegistrationSubmitted, setIsRegistrationSubmitted] = useState(false);
    const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);

    const emailRef = useRef(null);
    const registrationRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const isValid = async () => {
        console.log(name, email, registration, course, username, password, confirmPassword);
        let error = false;

        if (name == null || name.split(' ').length < 2) {
            setErrorName("Nome inválido!");
            error = true;
        } else {
            setErrorName(null);
        }

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (email == null || !emailRegex.test(email) || (await emailVerify())) {
            setErrorEmail("Email inválido!");
            error = true;
        } else {
            setErrorEmail(null);
        }

        if (registration == null || registration.length < 10 || (await registrationVerify())) {
            setErrorRegistration("Matrícula inválida!");
            error = true;
        } else {
            setErrorRegistration(null);
        }

        if (course == null) {
            setErrorCourse("Curso inválido!");
            error = true;
        } else {
            setErrorCourse(null);
        }

        if (username == null || username.length < 5 || (await usernameVerify())) {
            setErrorUsername("Usuário inválido!");
            error = true;
        } else {
            setErrorUsername(null);
        }

        if (password == null || password.length < 6) {
            setErrorPassword("Senha inválida!");
            error = true;
        } else {
            setErrorPassword(null);
        }

        if (password != confirmPassword) {
            setErrorConfirmPassword("Senhas não conferem!");
            error = true;
        } else {
            setErrorConfirmPassword(null);
        }
        
        return !error;
    }

    async function emailVerify(){
        let findedEmail = false;
        try{
            await api.get(`/users/email/${email}`);
            findedEmail = true;
        } catch (error) {
        }
        return findedEmail;
    }

    async function registrationVerify(){
        let findedRegistration = false;
        try {
            await api.get(`/users/${registration}`);
            findedRegistration = true;
        } catch (error) {
        }
        return findedRegistration;
    }

    async function usernameVerify(){
        let findedUsername = false;
        try {
            await api.get(`/users/username/${username}`);
            findedUsername = true;
        } catch (error) {
        }
        return findedUsername;
    }

    const createAccount = async () => {
        if ((await isValid())) {
            try {
                await api.post('/users', {
                    name: name,
                    email: email,
                    registration: registration,
                    username: username,
                    course: course,
                    password: password
                });
                back();
            } catch (error) {
                Alert.alert("Aviso","Erro ao criar conta!");
                console.log("Erro ao criar conta!");
            }
        }  
    }

    const back = () => {
        navigation.reset({ 
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <View style={styles.container}>

            <View style={styles.containerArrowBack}>
                <TouchableOpacity onPress={() => back()} style={styles.arrowBack}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={styles.containerHeader}>
                    <Image 
                        source={require('../assets/logo.png')}
                        style={ styles.logo }
                    />

                    <Text style={styles.title}>Requerimentos</Text>
                </View>

                <View style={styles.containerForm}>

                    <TextInput style={styles.input} 
                        onChangeText={value => {setName(value); setIsNameSubmitted(false)}} placeholder="Nome" returnKeyType="next" 
                        onSubmitEditing={() => {emailRef.current.focus(); setIsNameSubmitted(true); setName(name.trim())}} 
                        onBlur={() => {setIsNameSubmitted(true); setName(name.trim())}}
                        value = {isNameSubmitted ? name.trim() : name}
                    />
                    {errorName ? <Text style={styles.errorMessage}>{errorName}</Text> : null}

                    <TextInput style={styles.input} 
                        onChangeText={value => {setEmail(value); setIsEmailSubmitted(false)}} placeholder="Email" returnKeyType="next" 
                        onSubmitEditing={() => {registrationRef.current.focus(); setIsEmailSubmitted(true); setEmail(email.trim())}} ref={emailRef}
                        onBlur={() => {setIsEmailSubmitted(true); setEmail(email.trim())}}
                        value = {isEmailSubmitted ? email.trim() : email}
                    />
                    {errorEmail ? <Text style={styles.errorMessage}>{errorEmail}</Text> : null}

                    <TextInput style={styles.input} 
                        onChangeText={value => {setRegistration(value); setIsRegistrationSubmitted(false)}} placeholder="Matrícula" returnKeyType="next"
                        onSubmitEditing={() => {usernameRef.current.focus(); setIsRegistrationSubmitted(true); setRegistration(registration.trim())}} ref={registrationRef}
                        onBlur={() => {setIsRegistrationSubmitted(true); setRegistration(registration.trim())}}
                        value = {isRegistrationSubmitted ? registration.trim() : registration}
                    />
                    {errorRegistration ? <Text style={styles.errorMessage}>{errorRegistration}</Text> : null}
                    
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
                    {errorCourse ? <Text style={styles.errorMessage}>{errorCourse}</Text> : null}

                    <TextInput style={styles.input} 
                        onChangeText={value => {setUsername(value); setIsUsernameSubmitted(false)}} placeholder="Usuário" returnKeyType="next" 
                        onSubmitEditing={() => {passwordRef.current.focus(); setIsUsernameSubmitted(true); setUsername(username.trim())}} ref={usernameRef}
                        onBlur={() => {setIsUsernameSubmitted(true); setUsername(username.trim())}}
                        value = {isUsernameSubmitted ? username.trim() : username}
                    />
                    {errorUsername ? <Text style={styles.errorMessage}>{errorUsername}</Text> : null}

                    <TextInput style={styles.input} 
                        onChangeText={value => setPassword(value)} placeholder="Senha" secureTextEntry={true} returnKeyType="next" 
                        onSubmitEditing={() => confirmPasswordRef.current.focus()} ref={passwordRef}
                    />
                    {errorPassword ? <Text style={styles.errorMessage}>{errorPassword}</Text> : null}

                    <TextInput style={styles.input} 
                        onChangeText={value => setConfirmPassword(value)} placeholder="Confirmar senha" secureTextEntry={true} returnKeyType="done" 
                        onSubmitEditing={() => createAccount()} ref={confirmPasswordRef}
                    />
                    {errorConfirmPassword ? <Text style={styles.errorMessage}>{errorConfirmPassword}</Text> : null}

                    <TouchableOpacity style={styles.button}  onPress={() => createAccount()}>
                        <Text style={styles.buttonText}>Criar conta</Text>
                    </TouchableOpacity>

                    <View style={styles.containerLogin}>
                        <Text style={styles.notHave}>Já possui uma conta? </Text>
                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginText} onPress={() => back()}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEAEF'
    },
    containerHeader: {
        marginTop: '18%',
        marginBottom: '8%',
        paddingStart: '5%',
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    containerArrowBack: {
        position: 'absolute',
        top: 0,
        zIndex: 1,
        width: '100%',
        height: 70,
        backgroundColor: '#EBEAEF',
    },
    arrowBack: {
        marginLeft: '5%',
        marginTop: '10%',
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
    errorMessage: {
        color: '#FF0000',
        fontSize: 13,
        marginTop: '-3%',
        marginLeft: '2%',
    },
    pickerContainer: {
        marginBottom: 8,
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
