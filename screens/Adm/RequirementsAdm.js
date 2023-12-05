import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../src/Services/Api';

export default function RequirementsAdm({navigation}) {

    const [requirements, setRequirements] = useState([]);

    const [search, setSearch] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            getRequirements();
            return () => {};
        }, [])
    );

    useEffect(() => {
        if (search != '' && search != null) {
            searchRequirements();
        } else{
            getRequirements();
        }
    }, [search]);

    const goRequirementInfoAdm = () => {
        navigation.navigate('RequirementInfoAdm');
    }

    async function getRequirements(){
        try {
            const response = await api.get(`/requirements`);
            setRequirements(response.data);
        } catch (error) {
            console.log("Erro ao buscar requerimentos!");
        }
    }

    async function searchRequirements(){
        try {
            const response = await api.get(`/requirements/search/${search}`);
            setRequirements(response.data);
        } catch (error) {
            console.log("Erro ao buscar pesquisa!");
        }
    }

    async function showRequirement (requirementId) {
        try {
            const response = await api.get(`/requirements/${requirementId}`);
            await AsyncStorage.setItem('infoRequirement', JSON.stringify(response.data));
            goRequirementInfoAdm();
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
    containerRequirements: {
        flex: 1,
        marginTop: '3%',
        paddingStart: '5%',
        paddingEnd: '5%',
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