import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import {  Button, Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../src/Services/Api';

export default function RequerimentsAdm({navigation}) {

    const [requeriments, setRequeriments] = useState([]);

    const [search, setSearch] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            getRequeriments();
            return () => {};
        }, [])
    );

    useEffect(() => {
        if (search != '' && search != null) {
            searchRequeriments();
        } else{
            getRequeriments();
        }
    }, [search]);

    async function getRequeriments(){
        try {
            const response = await api.get(`/requeriments`);
            setRequeriments(response.data);
        } catch (error) {
            console.log("Erro ao buscar requerimentos!");
        }
    }

    async function searchRequeriments(){
        try {
            const response = await api.get(`/requeriments/search/${search}`);
            console.log(response.data);
            setRequeriments(response.data);
        } catch (error) {
            console.log("Erro ao buscar pesquisa!");
        }
    }

    async function moreOptions (requerimentId) {
        try {
            const response = await api.get(`/requeriments/${requerimentId}`);
            console.log(response.data);
        } catch (error) {
            console.log("Erro ao buscar requerimento!");
        }
    }
  
    return (
      <View style={styles.container}>
        
        <View style={styles.containerHeader}>

            <View style={styles.containerSearch}>
                <TextInput style={styles.input} 
                    onChangeText={value => setSearch(value)} placeholder="  Matrícula / Número do requerimento"
                />
            </View>

        </View>

        <ScrollView>
            <View style={styles.containerRequeriments}>
                {requeriments.map((requeriment) => (
                    <View key={requeriment.requerimentId} style={styles.containerRequeriment}>

                        <TouchableOpacity onPress={() => moreOptions(requeriment.requerimentId)} style={styles.more}>
                            <View style={styles.containerRequerimentInfo}>
                                <Text style={styles.requerimentInfo}> N° {requeriment.requerimentId}</Text>
                                <Text style={styles.requerimentInfo}> Matrícula: {requeriment.registration.registration}</Text>
                                <Text style={styles.requerimentInfo}> Tipo: {requeriment.type}</Text>
                                <Text style={styles.requerimentInfo}> Data de envio: {requeriment.sendDate.split(' ')[0]}</Text>
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
    containerRequeriments: {
        flex: 1,
        marginTop: '3%',
        paddingStart: '5%',
        paddingEnd: '5%',
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
});