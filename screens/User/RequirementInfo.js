import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native';
import {  Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


//exibe todas as informações do requerimento selecionado
export default function RequirementsInfoAdm({navigation}) {

    const [requirement, setRequirement] = useState();

    useEffect(() => {
        getRequirement();
    }, []);

    const back = () => {
        navigation.pop();
    }

    //pega as informações armazenadas no Item 'infoRequirement', para exibir na tela
    async function getRequirement(){
        try {
            setRequirement(JSON.parse(await AsyncStorage.getItem('infoRequirement')));
        } catch (error) {
            console.log("Erro ao carregar requerimento!");
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
                    <Text style={styles.title}>Requerimento N° {requirement && requirement.requirementId}</Text>
                </View>

                <View style={styles.containerRequirement}>

                    <View style={styles.containerRequirementInfo}>

                        <Text style={styles.requirementInfo}><Text style={styles.titleInfo}>Matrícula: </Text>{requirement && requirement.registration.registration}</Text>
                        <Text style={styles.requirementInfo}><Text style={styles.titleInfo}>Nome: </Text>{requirement && requirement.registration.firstName} {requirement && requirement.registration.lastName}</Text>
                        <Text style={styles.requirementInfo}><Text style={styles.titleInfo}>Email: </Text>{requirement && requirement.registration.email}</Text>
                        <Text style={styles.requirementInfo}><Text style={styles.titleInfo}>Telefone: </Text>{requirement && requirement.registration.phoneNumber}</Text>
                        <Text style={styles.requirementInfo}><Text style={styles.titleInfo}>Curso: </Text>{requirement && requirement.registration.course}</Text>
                        <Text></Text>
                        <Text style={styles.requirementInfo}><Text style={styles.titleInfo}>Tipo: </Text>{requirement && requirement.type}</Text>
                        <Text style={styles.requirementInfo}><Text style={styles.titleInfo}>Justificativa: </Text>{requirement && requirement.specification}</Text>
                        <Text style={styles.requirementInfo}><Text style={styles.titleInfo}>Motivos: </Text>{requirement && requirement.reason}</Text>
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
    containerRequirement: {
        flex: 1,
        width: '100%',
        marginBottom: '5%',
        paddingStart: '10%',
        paddingEnd: '5%',
    },
    containerRequirementInfo: {
        width: '100%',
        marginTop: '3%',
    },
    requirementInfo: {
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