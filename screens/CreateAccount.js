import { useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
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
        let finded = false;
        try {
            const response = await api.get(`/users/${registration}`);
            console.log(response.data);
            finded = true;
            if (finded) {
                throw new Error();
            }
        } catch (error) {
          console.log("Matrícula não está cadastrada!");
        }

        if (password == confirmPassword && !finded) {
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
        } else{
            console.log("Senhas não conferem!");
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
            <Pressable>
                <Text style={styles.create} onPress={() => back()}> Fazer login </Text>
            </Pressable>
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
            {/*<Picker style={styles.pickerComponent} 
                selectedValue={course}
                onValueChange={value => setCourse(value)}
            >
                <Picker.Item label="Selecione o curso" value="" />
                <Picker.Item label="Ciência da Computação" value="1" />
                <Picker.Item label="Logística" value="2" />
                <Picker.Item label="Manutenção e Suporte em Informática" value="3" />
                <Picker.Item label="Agronegócio" value="4" />

            </Picker>*/}

            <DropDownPicker
                items={[
                    {label: 'Selecione o curso', value: null},
                    {label: 'Ciência da Computação', value: '1'},
                    {label: 'Logística', value: '2'},
                    {label: 'Manutenção e Suporte em Informática', value: '3'},
                    {label: 'Agronegócio', value: '4'}
                ]}
                defaultValue={course}
                containerStyle={{height: 40, width: '90%'}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setCourse(item.value)}
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
                onPress={() => createAccountVerify()}
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
    },
    pickerComponent: {
        height: 50,
        width: '90%',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: '7F7F7F'
    }
    });
