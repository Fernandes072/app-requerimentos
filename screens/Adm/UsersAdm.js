import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../src/Services/Api';


//exibe todos os usuários
//permite buscar usuários pelo nome ou pela matrícula
export default function UsersAdm({navigation}) {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            getUsers();
            return () => {};
        }, [])
    );

    //se o campo de busca estiver vazio, busca todos os usuários
    useEffect(() => {
        if (search != '' && search != null) {
          searchUsers();
        } else{
            getUsers();
        }
    }, [search]);

    const goUserInfo = () => {
        navigation.navigate('UserInfoAdm');
    }

    //usa a api para buscar todos os usuários
    async function getUsers(){
        try {
            const response = await api.get(`/users`);
            setUsers(response.data);
        } catch (error) {
            console.log("Erro ao buscar usuários!");
        }
    }

    //usa a api para buscar os usuários com base na pesquisa
    async function searchUsers(){
        try {
            const response = await api.get(`/users/search/${search}`);
            setUsers(response.data);
        } catch (error) {
            console.log("Erro ao buscar pesquisa!");
        }
    }

    async function showUser (registration) {
        try {
            const response = await api.get(`/users/${registration}`);
            await AsyncStorage.setItem('infoUser', JSON.stringify(response.data));
            goUserInfo();
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

                        <TouchableOpacity onPress={() => showUser(user.registration)} style={styles.more}>
                            <View style={styles.containerUserInfo}>
                                <Text style={styles.userInfo}> <Text style={styles.titleInfo}>Matrícula: </Text>{user.registration} </Text>
                                <Text style={styles.userInfo}> <Text style={styles.titleInfo}>Nome: </Text>{user.firstName}</Text>
                                <Text style={styles.userInfo}> <Text style={styles.titleInfo}>Curso: </Text>{user.course}</Text>
                            </View>
                        </TouchableOpacity> 
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
        height: 85,
        backgroundColor: '#A2E700',
        marginBottom: '5%',
        borderRadius: 10,
    },
    more: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    containerUserInfo: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    userInfo: {
        fontSize: 16,
        marginLeft: '2%',
        marginTop: '1%',
    },
    titleInfo: {
        fontWeight: 'bold',
    },
});