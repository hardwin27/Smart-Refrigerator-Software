import React, {useState, useEffect} from 'react';
import {
    View,
    Button,
    Text
} from 'react-native';
import firebase from '../Components/FirebaseDatabase.js';

function getTemperature(cb) {
    firebase.database().ref('SmartRefrigerator/Temperature').on('value', (snapshot) => {
        const temperatureFromDatabase = snapshot.val();
        cb(temperatureFromDatabase);
    })
}

function addTemperature(temperatureNow) {
    temperatureNow += 1
    firebase.database().ref('SmartRefrigerator').set({
        Temperature: temperatureNow
    })
}

function subsctractTemperature(temperatureNow) {
    temperatureNow -= 1
    firebase.database().ref('SmartRefrigerator').set({
        Temperature: temperatureNow
    })
}

function ManageTemperature({navigation}){
    const [temperature, setTemperature] = useState('0');
    useEffect(() => {
        getTemperature(setTemperature)
    }, [])
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