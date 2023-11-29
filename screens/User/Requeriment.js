import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import {  Button, Text } from 'react-native-elements';
import React, {useState, useEffect, useRef} from 'react';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../src/Services/Api';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function UsersAdm({navigation}) {

    const [type, setType] = useState(null);
    const [specification, setSpecification] = useState(null);
    const [reason, setReason] = useState(null);
    const [user, setUser] = useState(null);

    const [errorType, setErrorType] = useState(null);
    const [errorSpecification, setErrorSpecification] = useState(null);

    const [isReasonSubmitted, setIsReasonSubmitted] = useState(false);
    const [isSpecificationSubmitted, setIsSpecificationSubmitted] = useState(false);

    const reasonRef = useRef(null);

    async function getUser(){
        try {
            setUser(JSON.parse(await AsyncStorage.getItem('user')));
        } catch (error) {
            console.log("Erro ao buscar usuário!");
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setType(null);
            setSpecification(null);
            setReason(null);
            setErrorType(null);
            return () => {};
        }, [])
    );

    const isValid = () => {
        console.log(type, specification, reason);
        let error = false;

        if (type == null || type == "") {
            setErrorType("Tipo inválido!");
            error = true;
        } else {
            setErrorType(null);
        }

        if ((type == "Outros") && (specification == null || specification == "")) {
            setErrorSpecification("Especifição/Justificativa inválida!");
            error = true;
        } else {
            setErrorSpecification(null);
        }

        return !error;
    }

    const printSpecification = () => {
        return (
        <TextInput style={styles.input} 
            onChangeText={value => {setSpecification(value); setIsSpecificationSubmitted(false)}} placeholder="Especifição/Justificativa"
            onSubmitEditing={() => {setIsSpecificationSubmitted(true); reasonRef.current.focus()}}
            onBlur={() => {setIsSpecificationSubmitted(true)}} returnKeyType="next" 
            value = {isSpecificationSubmitted ? (specification != null ? specification.trim() : specification) : specification}
        />
        );
    }

    async function sendRequeriment() {
        if (isValid()) {
            console.log(user);
            try {
                await api.post('/requeriments', {
                    type: type,
                    specification: specification,
                    reason: reason,
                    registration: user,
                    sendDate: new Date().toLocaleString('pt-BR', {timeZone: 'America/Argentina/Buenos_Aires'})
                });
                setType(null);
                setSpecification(null);
                setReason(null);
                Alert.alert("Aviso","Requerimento enviado com sucesso!");
            } catch (error) {
                Alert.alert("Aviso","Erro ao enviar o requerimento!");
                console.log("Erro ao enviar o requerimento!");
            }
        }
    }

  
    return (
        <View style={styles.container}>

            <View style={styles.topBar}></View>

            <ScrollView>

                <View style={styles.containerHeader}>
                    <Image 
                        source={require('../../assets/logo.png')}
                        style={ styles.logo }
                    />
                </View>

                <View style={styles.containerForm}>
                    <View style={styles.pickerContainer}>

                        <Picker
                            selectedValue={type}
                            onValueChange={value => setType(value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Selecione um tipo" value="" />
                            <Picker.Item label="Atualização de Dados Pessoais" value="Atualização de Dados Pessoais" />
                            <Picker.Item label="Cancelamento de Curso" value="Cancelamento de Curso" />
                            <Picker.Item label="Colação de Grau" value="Colação de Grau" />
                            <Picker.Item label="Diploma / Certificado" value="Diploma / Certificado" />
                            <Picker.Item label="Exame de Proficiência" value="Exame de Proficiência" />
                            <Picker.Item label="Equivalência de Disciplina" value="Equivalência de Disciplina" />
                            <Picker.Item label="Histórico Escolar" value="Histórico Escolar" />
                            <Picker.Item label="Justificativa de Falta" value="Justificativa de Falta" />
                            <Picker.Item label="Licença Maternidade" value="Licença Maternidade" />
                            <Picker.Item label="Matrícula em Disciplina" value="Matrícula em Disciplina" />
                            <Picker.Item label="Reabertura de Matrícula" value="Reabertura de Matrícula" />
                            <Picker.Item label="Renovação de Matrícula" value="Renovação de Matrícula" />
                            <Picker.Item label="2ª Chamada de Prova" value="2ª Chamada de Prova" />
                            <Picker.Item label="Trancamento" value="Trancamento" />
                            <Picker.Item label="Transferência" value="Transferência" />
                            <Picker.Item label="Outros" value="Outros" />
                        </Picker>
                        {errorType ? <Text style={styles.errorMessageType}>{errorType}</Text> : null}
                    </View>

                    {type == "Outros" ? printSpecification() : null}
                    {type == "Outros" ? (errorSpecification ? <Text style={styles.errorMessage}>{errorSpecification}</Text> : null) : null}

                    <TextInput style={styles.input} 
                        onChangeText={value => {setReason(value); setIsReasonSubmitted(false)}} placeholder="Exposição de Motivos"
                        onSubmitEditing={() => {setIsReasonSubmitted(true); sendRequeriment()}}
                        onBlur={() => {setIsReasonSubmitted(true)}} ref={reasonRef} returnKeyType="done" 
                        value = {isReasonSubmitted ? (reason != null ? reason.trim() : reason) : reason}
                    />

                    <TouchableOpacity style={styles.sendButton}  onPress={() => sendRequeriment()}>
                        <Text style={styles.sendText}>Enviar Requerimento</Text>
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
    },
    containerHeader: {
        marginTop: '10%',
        height: 155,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center',
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    logo: {
        width: 300,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    containerForm: {
        flex: 1,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: '5%',
    },
    pickerContainer: {
        marginBottom: 8,
        backgroundColor: '#EBEAEF',
        marginLeft: '-4.5%',
        marginRight: '-4.5%',
    },
    picker: {
        color: '#7F7F7F',
        height: 40,
        width: '100%',
    },
    input: {
        borderBottomColor: '#457918',
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16,
        marginBottom: 12
    },
    errorMessage: {
        color: '#FF0000',
        fontSize: 13,
        marginTop: '-3%',
        marginLeft: '2%',
    },
    errorMessageType: {
        color: '#FF0000',
        fontSize: 13,
        marginTop: '-3%',
        marginLeft: '6%',
    },
    sendButton: {
        backgroundColor: '#A2E700',
        width: '70%',
        height: 40,
        borderRadius: 4,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 14
    },
    sendText: {
        color: '#457918',
        fontSize: 16,
        fontWeight: 'bold'
    },
});