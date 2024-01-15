import { ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import {  Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//exibe a imagem do usuário, nome e matrícula
//permite ver os requerimentos do usuário e sair da conta
export default function Profile({navigation}) {

    const [user, setUser] = useState();

    useEffect(() => {
        getUser();
    }, []);

    async function getUser(){
        try {
            setUser(JSON.parse(await AsyncStorage.getItem('user')));
        } catch (error) {
            console.log("Erro ao buscar usuário!");
        }
    }

    //ao sair da conta, deleta o Item 'user'
    async function deleteSave(){
        try {
            await AsyncStorage.removeItem('user');
            exit();
        } catch (error) {
            console.log("Erro ao deletar usuário!");
        }
    }

    //sair da conta
    const exit = () => {
      navigation.reset({ 
          index: 0,
          routes: [{ name: 'Login' }],
      });
    }

    const goMyRequirements = () => {
        navigation.navigate('MyRequirements');
    }

    return (
        <View style={styles.container}>

            <View style={styles.topBar}></View>

            <ScrollView>

                <View style={styles.containerHeader}>
                    <Image source={user && user.image != null ? {uri:user.image} : require('../assets/user.png')} style={styles.imageUser} />
                    <TouchableOpacity onPress={() => console.log("Abc")} style={styles.icon}>
                        <MaterialCommunityIcons name="account-edit" size={28} />
                    </TouchableOpacity>  
                    <Text h4> {user && user.firstName} </Text>
                    <Text h5> {user && user.registration} </Text>
                </View>

                <View style={styles.containerOptions}>
                    <TouchableOpacity style={styles.optionButton}  onPress={() => goMyRequirements()}>
                        <Text style={styles.optionText}>Meus requerimentos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton}  onPress={() => deleteSave()}>
                        <MaterialCommunityIcons name="logout" size={28} style={styles.icon}/>
                        <Text style={styles.optionText}>Sair</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
                
        </View>

    );
}
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEAEF',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        zIndex: 1,
        width: '100%',
        height: 25,
        backgroundColor: '#EBEAEF',
    },
    containerHeader: {
        marginTop: '15%',
        height: 170,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#A2E700',
    },
    icon: {
        position: 'absolute',
        top: 0,
        zIndex: 1,
        marginTop: '3%',
        alignSelf: 'flex-end',
        width: 35,
        height: 25,
    },
    imageUser: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: '3%',
        borderRadius: 50
    },
    containerOptions: {
        flex: 1,
        marginTop: '7%',
        width: '50%',
        backgroundColor: '#EBEAEF',
        marginBottom: '5%',
        marginLeft: '10%', //ou 20%
    },
    optionButton: {
        backgroundColor: '#A2E700',
        width: '100%',
        height: 40,
        borderRadius: 4,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 14
    },
    optionText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold'
    },
});