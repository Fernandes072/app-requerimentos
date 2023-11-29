import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native';
import {  Button, Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../src/Services/Api';

export default function RequerimentsAdm({navigation}) {

    const [requeriment, setRequeriment] = useState();

    useEffect(() => {
        getRequeriment();
    }, []);

    const back = () => {
        console.log("back");
        navigation.pop();
    }

    async function getRequeriment(){
        try {
            setRequeriment(JSON.parse(await AsyncStorage.getItem('requeriment')));
        } catch (error) {
            console.log("Erro ao carregar requerimento!");
        }
    }

    async function deleteRequeriment(){
        try {
            await api.delete(`/requeriments/${requeriment.requerimentId}`);
            await AsyncStorage.removeItem('requeriment');
            back();
        } catch (error) {
            console.log("Erro ao apagar arquivo!");
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
                    <Text style={styles.title}>Requerimento N° {requeriment && requeriment.requerimentId}</Text>
                </View>

                <View style={styles.containerRequeriment}>

                    <View style={styles.containerRequerimentInfo}>

                        <Text style={styles.requerimentInfo}><Text style={styles.titleInfo}>Matrícula: </Text>{requeriment && requeriment.registration.registration}</Text>
                        <Text style={styles.requerimentInfo}><Text style={styles.titleInfo}>Nome: </Text>{requeriment && requeriment.registration.name}</Text>
                        <Text style={styles.requerimentInfo}><Text style={styles.titleInfo}>Email: </Text>{requeriment && requeriment.registration.email}</Text>
                        <Text style={styles.requerimentInfo}><Text style={styles.titleInfo}>Curso: </Text>{requeriment && requeriment.registration.courseId.name}</Text>
                        <Text style={styles.requerimentInfo}><Text style={styles.titleInfo}>Email: </Text>{requeriment && requeriment.registration.email}</Text>
                        <Text></Text>
                        <Text style={styles.requerimentInfo}><Text style={styles.titleInfo}>Tipo: </Text>{requeriment && requeriment.type}</Text>
                        <Text style={styles.requerimentInfo}><Text style={styles.titleInfo}>Justificativa: </Text>{requeriment && requeriment.specification}</Text>
                        <Text style={styles.requerimentInfo}><Text style={styles.titleInfo}>Motivos: </Text>{requeriment && requeriment.reason}</Text>

                    </View>

                    <TouchableOpacity style={styles.optionButton}  onPress={() => deleteRequeriment()}>
                        <Text style={styles.optionText}>Excluir Requerimento</Text>
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
    containerRequeriment: {
        flex: 1,
        width: '100%',
        marginBottom: '5%',
        paddingStart: '10%',
        paddingEnd: '5%',
    },
    containerRequerimentInfo: {
        width: '100%',
        marginTop: '3%',
    },
    requerimentInfo: {
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
        marginTop: '10%'
    },
    optionText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold'
    },
});