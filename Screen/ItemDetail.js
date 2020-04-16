import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button
} from 'react-native';
import firebase from '../Components/FirebaseDatabase.js';

function getDetail(cb, item)
{
    var detail = [];
    var refDir = 'ItemList/' + item;
    firebase.database().ref(refDir).on('value', (snapshot) => {
        detail = [];
        detail.push(snapshot.key);
        detail.push(snapshot.child('expireDate').val());
        detail.push(snapshot.child('quantity').val());

        cb(detail);
    })
}

function ItemDetail({route}) {
    let {item} = route.params;
    const [arrayForDetail, setArrayForDetail] = useState([]);
    useEffect(() => {
        getDetail(setArrayForDetail, item)
    }, [])
    return(
        <View>
            <Text>Expire Date: {arrayForDetail[0]}</Text>
            <Text>Quantity: {arrayForDetail[1]}</Text>
            <Text>{arrayForDetail[2]}</Text>
        </View>
    );
}

export default ItemDetail;