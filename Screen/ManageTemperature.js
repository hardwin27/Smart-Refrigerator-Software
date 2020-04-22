import React, {useState, useEffect} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import firebase from '../Components/FirebaseDatabase.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498DB'
    },
    text: {
        fontSize: 50,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    }
})

function getTemperature(cb) {
    firebase.database().ref('Temperature/temperature').on('value', (snapshot) => {
        const temperatureFromDatabase = snapshot.val();
        cb(temperatureFromDatabase);
    });
}

function addTemperature(temperatureNow) {
    temperatureNow += 1
    firebase.database().ref('Temperature').set({
        temperature: temperatureNow
    });
}

function subsctractTemperature(temperatureNow) {
    temperatureNow -= 1
    firebase.database().ref('Temperature').set({
        temperature: temperatureNow
    });
}

function ManageTemperature({navigation}){
    const [temperature, setTemperature] = useState('0');
    useEffect(() => {
        getTemperature(setTemperature)
    }, []);
    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => addTemperature(temperature)}
            >
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{temperature}</Text>
            <TouchableOpacity
                onPress={() => subsctractTemperature(temperature)}
            >
                <Text style={styles.text}>-</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ManageTemperature;