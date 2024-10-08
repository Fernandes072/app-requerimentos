import { ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../src/Services/Api';


//exibe todas as informações do usuário selecionado
//permite excluir o usuário
//permite ver os requerimentos do usuário
export default function UserInfoAdm({navigation}) {

    const [user, setUser] = useState();

    useEffect(() => {
        getUser();
    }, []);

    const back = () => {
        navigation.pop();
    }

    const goRequirements = () => {
        navigation.navigate('UserRequirementsAdm');
    }

    async function getUser(){
        try {
            setUser(JSON.parse(await AsyncStorage.getItem('infoUser')));
        } catch (error) {
            console.log("Erro ao carregar usuário!");
        }
    }

    //usa a api para apagar o usuário selecionado
    async function deleteUser(){
        try {
            await api.delete(`/users/${user.registration}`);
            await AsyncStorage.removeItem('infoUser');
            back();
        } catch (error) {
            console.log("Erro ao apagar usuário!");
        }
    }
  
    return (
        <View style={styles.container}>

            <View style={styles.topBar}></View>

            <ScrollView>

                <View style={styles.containerHeader}>
                    <TouchableOpacity onPress={() => back()} style={styles.arrowBack}>
                        <Image 
                            source={require('../../assets/arrow-left.png')}
                            style={{ width: 30, height: 30 }}
                            testID="Voltar"
                        />
                    </TouchableOpacity>
                    <Image 
                        source={require('../../assets/logo.png')}
                        style={ styles.logo }
                    />
                    <Text style={styles.title}>{user && user.registration}</Text>
                </View>

                <View style={styles.containerUser}>

                    <View style={styles.containerUserInfo}>
                        <Text style={styles.userInfo}><Text style={styles.titleInfo}>Nome: </Text>{user && user.firstName} {user && user.lastName}</Text>
                        <Text style={styles.userInfo}><Text style={styles.titleInfo}>Email: </Text>{user && user.email}</Text>
                        <Text style={styles.userInfo}><Text style={styles.titleInfo}>Telefone: </Text>{user && user.phoneNumber}</Text>
                        <Text style={styles.userInfo}><Text style={styles.titleInfo}>Curso: </Text>{user && user.course}</Text>
                    </View>

                    <TouchableOpacity style={styles.optionButton}  onPress={() => goRequirements()}>
                        <Text style={styles.optionText}>Requerimentos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton}  onPress={() => deleteUser()}>
                        <Text style={styles.optionText}>Excluir Usuário</Text>
                    </TouchableOpacity>

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
    topBar: {
        position: 'absolute',
        top: 0,
        zIndex: 1,
        width: '100%',
        height: 25,
        backgroundColor: '#EBEAEF',
    },
    arrowBack: {
        width: 50,
        height: 50,
        marginTop: '-7%',
    },
    containerHeader: {
        marginTop: '16%',
        height: 200,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    logo: {
        width: 300,
        height: 150,
        marginTop: '-7%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    title:{
        color: '#7F7F7F',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: '2%',
    },
    containerUser: {
        flex: 1,
        width: '100%',
        marginBottom: '5%',
        paddingStart: '10%',
        paddingEnd: '5%',
    },
    containerUserInfo: {
        width: '100%',
        marginTop: '3%',
        marginBottom: '5%',
    },
    userInfo: {
        fontSize: 16,
        marginTop: '1%',
    },
    titleInfo: {
        fontWeight: 'bold',
    },
    optionButton: {
        backgroundColor: '#A2E700',
        width: '80%',
        height: 40,
        borderRadius: 4,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '5%'
    },
    optionText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold'
    },
});