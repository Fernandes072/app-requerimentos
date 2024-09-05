import { ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import {  Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../src/Services/Api';


//página de requerimentos do usuário
//exibe informações básicas dos requerimentos
export default function MyRequirements({navigation}) {

    const [requirements, setRequirements] = useState([]);

    //ao carregar a página, busca os requerimentos do usuário
    useEffect(() => {
        getRequirements();
    }, []);

    //cada vez que a página é focada, busca os requerimentos do usuário, para manter atualizado
    useFocusEffect(
        React.useCallback(() => {
            getRequirements();
            return () => {};
        }, [])
    );

    const back = () => {
        navigation.pop();
    }

    //função que usa a api para buscar os requerimentos do usuário, através do Item 'user'
    async function getRequirements(){
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const response = await api.get(`/users/${user.registration}/requirements`);
            setRequirements(response.data);
        } catch (error) {
            console.log("Erro ao buscar requerimentos!");
        }
    }

    const goRequirementInfo = () => {
        navigation.navigate('RequirementInfo');
    }

    //busca o requerimento selecionado e salva no Item 'infoRequirement'
    //para exibir as informações do requerimento na pagina RequirementInfo
    async function showRequirement (requirementId) {
        try {
            const response = await api.get(`/requirements/${requirementId}`);
            await AsyncStorage.setItem('infoRequirement', JSON.stringify(response.data));
            goRequirementInfo();
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
            </View>

            <View style={styles.containerRequirements}>
                {requirements.map((requirement) => (
                    <View key={requirement.requirementId} style={styles.containerRequirement}>

                        <TouchableOpacity onPress={() => showRequirement(requirement.requirementId)} style={styles.more}>
                            <View style={styles.containerRequirementInfo}>
                                <Text style={styles.requirementInfo}> <Text style={styles.titleInfo}>N° </Text>{requirement.requirementId}</Text>
                                <Text style={styles.requirementInfo}> <Text style={styles.titleInfo}>Matrícula: </Text>{requirement.registration.registration}</Text>
                                <Text style={styles.requirementInfo}> <Text style={styles.titleInfo}>Tipo: </Text>{requirement.type}</Text>
                                <Text style={styles.requirementInfo}> <Text style={styles.titleInfo}>Data de envio: </Text>{requirement.sendDate.split(' ')[0]}</Text>
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
    containerRequirements: {
        flex: 1,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: '5%',
        marginBottom: '3%',
    },
    containerRequirement: {
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
    containerRequirementInfo: {
        width: '100%',
        height: '100%',
        borderRadius: 10, 
    },
    requirementInfo: {
        fontSize: 16,
        marginLeft: '2%',
        marginTop: '1%',
    },
    titleInfo: {
        fontWeight: 'bold',
    },
});