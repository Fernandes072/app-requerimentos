import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native';
import {  Button, Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../src/Services/Api';

export default function MyRequeriments({navigation}) {

    const [requeriments, setRequeriments] = useState([]);

    useEffect(() => {
        getRequeriments();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getRequeriments();
            return () => {};
        }, [])
    );

    const back = () => {
        console.log("back");
        navigation.pop();
    }

    async function getRequeriments(){
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const response = await api.get(`/users/${user.registration}/requeriments`);
            setRequeriments(response.data);
        } catch (error) {
            console.log("Erro ao buscar requerimentos!");
        }
    }

    const goRequerimentInfo = () => {
        navigation.navigate('RequerimentInfo');
    }

    async function showRequeriment (requerimentId) {
        try {
            const response = await api.get(`/requeriments/${requerimentId}`);
            await AsyncStorage.setItem('infoRequeriment', JSON.stringify(response.data));
            console.log(JSON.parse(await AsyncStorage.getItem('infoRequeriment')));
            goRequerimentInfo();
        } catch (error) {
            console.log("Erro ao buscar requerimento!");
        }
    }
  
    return (
      <View style={styles.container}>

        <View style={styles.topBar}></View>

        <ScrollView>
        
            <View style={styles.containerHeader}>
                <TouchableOpacity onPress={() => back()} style={styles.arrowBack}>
                    <MaterialCommunityIcons name="arrow-left" size={30} />
                </TouchableOpacity>
                <Image 
                    source={require('../../assets/logo.png')}
                    style={ styles.logo }
                />
            </View>

            <View style={styles.containerRequeriments}>
                {requeriments.map((requeriment) => (
                    <View key={requeriment.requerimentId} style={styles.containerRequeriment}>

                        <TouchableOpacity onPress={() => showRequeriment(requeriment.requerimentId)} style={styles.more}>
                            <View style={styles.containerRequerimentInfo}>
                                <Text style={styles.requerimentInfo}> <Text style={styles.titleInfo}>N° </Text>{requeriment.requerimentId}</Text>
                                <Text style={styles.requerimentInfo}> <Text style={styles.titleInfo}>Matrícula: </Text>{requeriment.registration.registration}</Text>
                                <Text style={styles.requerimentInfo}> <Text style={styles.titleInfo}>Tipo: </Text>{requeriment.type}</Text>
                                <Text style={styles.requerimentInfo}> <Text style={styles.titleInfo}>Data de envio: </Text>{requeriment.sendDate.split(' ')[0]}</Text>
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
        height: 150,
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
    containerRequeriments: {
        flex: 1,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: '5%',
        marginBottom: '3%',
    },
    containerRequeriment: {
        width: '100%',
        height: 110,
        backgroundColor: '#A2E700',
        marginBottom: '5%',
        borderRadius: 10,
    },
    more: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    containerRequerimentInfo: {
        width: '100%',
        height: '100%',
        borderRadius: 10, 
    },
    requerimentInfo: {
        fontSize: 16,
        marginLeft: '2%',
        marginTop: '1%',
    },
    titleInfo: {
        fontWeight: 'bold',
    },
});