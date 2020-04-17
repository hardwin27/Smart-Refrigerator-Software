import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Picker
} from 'react-native';
import firebase from '../Components/FirebaseDatabase.js';

function getData(itemName, cbQuantity, cbYear, cbMonth, cbDate, cbCategory) {
    firebase.database().ref('ItemList').child(itemName).on('value', (snapshot) => {
        let itemCategory = snapshot.child('category').val();
        let itemExpireDate = snapshot.child('expireDate').val();
        let itemQuantity = snapshot.child('quantity').val();
        let arrayOfExpireDate = itemExpireDate.split("-");

        cbQuantity(itemQuantity);
        cbYear(arrayOfExpireDate[0]);
        cbMonth(arrayOfExpireDate[1]);
        cbDate(arrayOfExpireDate[2]);
        cbCategory(itemCategory);
    })
}

function editData(itemName, itemQuantity, expireDateYear, expireDateMonth, expireDateDate, itemCategory) {
    let itemExpireDate = expireDateYear + "-" + expireDateMonth + "-" + expireDateDate;
    firebase.database().ref('ItemList').child(itemName).update({
        category: itemCategory,
        expireDate: itemExpireDate,
        quantity: itemQuantity
    });
}

function EditItem({navigation, route}) {
    let {itemName} = route.params;

    const [quantity, setQuantity] = useState(0);
    const [expireYear, setExpireYear] = useState("");
    const [expireMonth, setExpireMonth] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [category, setCategory] = useState("rawFood");

    useEffect(() => {
        getData(itemName, setQuantity, setExpireYear, setExpireMonth, setExpireDate, setCategory);
    }, []);

    return(
        <View>
            <Text>{itemName}</Text>
            <Text>Quantity</Text>
            <TextInput
                placeholder="Item Quantity"
                keyboardType="numeric"
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
            />
            <Text>Expire Date</Text>
            <TextInput
                placeholder="YYYY"
                maxLength={4}
                keyboardType="numeric"
                value={expireYear}
                onChangeText={(text) => setExpireYear(text)}
            />
            <TextInput
                placeholder="MM"
                maxLength={2}
                keyboardType="numeric"
                value={expireMonth}
                onChangeText={(text) => setExpireMonth(text)}
            />
            <TextInput
                placeholder="DD"
                maxLength={2}
                keyboardType="numeric"
                value={expireDate}
                onChangeText={(text) => setExpireDate(text)}
            />
            <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
                <Picker.Item label="Raw Food" value="rawFood"/>
                <Picker.Item label="Fruit" value="fruit"/>
                <Picker.Item label="Drink" value="drink"/>
                <Picker.Item label="Sauce" value="sauce"/>
                <Picker.Item label="Snack" value="snack"/>
                <Picker.Item label="Other" value="other"/>
            </Picker>
            <Button
                title="Edit"
                onPress={() => {editData(itemName, quantity, expireYear, expireMonth, expireDate, category); navigation.goBack();}}
            />
        </View>
    )
}

export default EditItem;