import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button
} from 'react-native';
import firebase from '../Components/FirebaseDatabase.js';

function getDetail(cb, item) {
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

function deleteItem(item) { 
    firebase.database().ref('ItemList').child(item).remove();
}

function ItemDetail({navigation, route}) {
    let {item} = route.params;
    const [arrayForDetail, setArrayForDetail] = useState([]);
    useEffect(() => {
        getDetail(setArrayForDetail, item)
    }, [])
    return(
        <View>
            <Text>{arrayForDetail[0]}</Text>
            <Text>Expire Date: {arrayForDetail[1]}</Text>
            <Text>Quantity: {arrayForDetail[2]}</Text>
            <View>
                <Button
                    title="Edit"
                    onPress={() => navigation.navigate('EditItem', {
                        itemName: item
                    })}
                />
                <Button
                    title="Delete"
                    onPress={() => {deleteItem(item); navigation.goBack();}}
                />
            </View>
        </View>
    );
}

export default ItemDetail;