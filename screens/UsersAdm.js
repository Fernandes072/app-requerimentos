import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import {  Button, Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../src/Services/Api';

export default function UsersAdm({navigation}) {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            getUsers();
            return () => {};
        }, [])
    );

    useEffect(() => {
        if (search != '' && search != null) {
          searchUsers();
        } else{
            getUsers();
        }
      }, [search]);

    async function getUsers(){
        try {
            const response = await api.get(`/users`);
            setUsers(response.data);
        } catch (error) {
            console.log("Erro ao buscar usuários!");
        }
    }

    async function searchUsers(){
        try {
            const response = await api.get(`/users/search/${search}`);
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.log("Erro ao buscar pesquisa!");
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

            <View style={styles.containerSearch}>
                <TextInput style={styles.input} 
                    onChangeText={value => setSearch(value)} placeholder="  Digite um nome ou matrícula"
                />
            </View>

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
                            <Text style={styles.userInfo}> {user.courseId.name}</Text>
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

    },
    containerSearch: {
        marginTop: '7%',
        height: 40,
    },
    input: {
        borderBottomColor: '#457918',
        borderTopColor: '#457918',
        borderLeftColor: '#457918',
        borderRightColor: '#457918',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 10,
        height: 40,
        fontSize: 16,
    },
    containerUsers: {
        flex: 1,
        marginTop: '3%',
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    containerUser: {
        width: '100%',
        height: 80,
        backgroundColor: '#A2E700',
        marginBottom: '5%',
        borderRadius: 10,
    },
    more: {
        alignSelf: 'flex-end',
        marginTop: '3.5%',
        marginRight: '3%'
    },
    containerUserInfo: {
        width: '85%',
        marginTop: '-6.5%',
        height: 50,
        marginLeft: '2%',
    },
    userInfo: {
        fontSize: 16,
    },
});