import React from 'react';
import {
    View,
    Button
} from 'react-native';


const firebaseConfig = {
    apiKey: "AIzaSyCV86WqPrfS9Fty4GY_dJUPhhc0n_GBkJg",
    authDomain: "fir-basic-b562a.firebaseapp.com",
    databaseURL: "https://fir-basic-b562a.firebaseio.com",
    projectId: "fir-basic-b562a",
    storageBucket: "fir-basic-b562a.appspot.com",
    messagingSenderId: "342893901411",
    appId: "1:342893901411:web:df1c54018cee8658102a56",
    measurementId: "G-HHN0GD9G5Y"
  };
  
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
function ManageTemperature(){
    return(
        <View>
            <Text>MANAGE TEMPERATURE</Text>
        </View>
    )
}

export default ManageTemperature;