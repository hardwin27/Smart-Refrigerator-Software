import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import firebase from '../Components/FirebaseDatabase.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#3498DB', 
    },
    dataText: {
        fontSize: 20,
        margin: 10,
        color: '#ffffff',
    },
    allButtonContainer: {
        margin: 10,
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#34db34',
        borderRadius: 20,
        padding: 10,
        margin: 10,
        flex: 1
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20
    }
})

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
        <View style={styles.container}>
            <Text style={styles.dataText}>{arrayForDetail[0]}</Text>
            <Text style={styles.dataText}>Expire Date: {arrayForDetail[1]}</Text>
            <Text style={styles.dataText}>Quantity: {arrayForDetail[2]}</Text>
            <View style={styles.allButtonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EditItem', {
                        itemName: item
                    })}
                >
                    <Text style={styles.buttonText}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {deleteItem(item); navigation.goBack();}}
                >
                    <Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ItemDetail;