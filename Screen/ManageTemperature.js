import React, {useState, useEffect} from 'react';
import {
    View,
    Button,
    Text
} from 'react-native';
import firebase from '../Components/FirebaseDatabase.js';

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
        <View>
            <Button
                title="+"
                onPress={() => addTemperature(temperature)}
            />
            <Text>{temperature}</Text>
            <Button
                title="-"
                onPress={() => subsctractTemperature(temperature)}
            />
        </View>
    )
}

export default ManageTemperature;