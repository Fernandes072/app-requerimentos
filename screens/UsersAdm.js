import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {  Button, Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import api from '../src/Services/Api';

export default function UsersAdm({navigation}) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers(){
        try {
            const response = await api.get(`/users`);
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.log("Erro ao buscar usuários!");
        }
    }

    async function moreOptions (registration) {
        try {
            const response = await api.get(`/users/${registration}`);
            console.log(response.data);
        } catch (error) {
            console.log("Erro ao buscar usuário!");
        }
    }
  
    return (
      <View style={styles.container}>
        
        <View style={styles.containerHeader}>
            <Text h1> Users </Text>
        </View>

        <ScrollView>
            <View style={styles.containerUsers}>
                {users.map((user) => (
                    <View key={user.registration} style={styles.containerUser}>

                        <TouchableOpacity onPress={() => moreOptions(user.registration)} style={styles.more}>
                            <Feather name="more-vertical" size={24} color="black" />
                        </TouchableOpacity>

                        <View style={styles.containerUserInfo}>
                            <Text style={styles.userInfo}> {user.registration} - {user.name}</Text>
                        </View> 
                    </View>
                ))}
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
        marginTop: '6%',
        height: 70,
        paddingStart: '5%',
        paddingEnd: '5%',
        backgroundColor: '#EBEAEF',
    },
    containerUsers: {
        flex: 1,
        marginTop: '3%',
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    containerUser: {
        width: '100%',
        height: 50,
        backgroundColor: '#A2E700',
        marginBottom: '5%',
        borderRadius: 20,
    },
    more: {
        alignSelf: 'flex-end',
        marginTop: '3.5%',
        marginRight: '3%'
    },
    containerUserInfo: {
        width: '85%',
        marginTop: '-6.5%',
        height: 25,
        marginLeft: '2%',
    },
    userInfo: {
        fontSize: 16,
    },
});