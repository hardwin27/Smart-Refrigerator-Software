import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Picker
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from '../Components/FirebaseDatabase.js';

function addData(itemName, quantity, year, month, date, category) {
    itemName = itemName.replace(/ /g, "");
    firebase.database().ref('ItemList').child(itemName).set({
        category: category,
        expireDate: year+"-"+month+"-"+date,
        quantity: quantity
    });
}

function back() {
    const navigation = useNavigation();
    navigation.goBack();
}

function addButtonClicked({navigation: {goBack}}, itemName, quantity, expireYear, expireMonth, expireDate, category) {
    const navigation = useNavigation(); 
    addData(itemName, quantity, expireYear, expireMonth, expireDate, category);
    navigation.goBack();
}

function AddItem({navigation}) {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [expireYear, setExpireYear] = useState("");
    const [expireMonth, setExpireMonth] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [category, setCategory] = useState("rawFood");

    return(
        <View>
            <Text>Item Name: </Text>
            <TextInput
                placeholder="Item Name"
                autoCapitalize="words"
                onChangeText={(text) => setItemName(text)}
            />
            <Text>Quantity</Text>
            <TextInput
                placeholder="Item Quantity"
                keyboardType="numeric"
                onChangeText={(text) => setQuantity(text)}
            />
            <Text>Expire Date</Text>
            <TextInput
                placeholder="YYYY"
                maxLength={4}
                keyboardType="numeric"
                onChangeText={(text) => setExpireYear(text)}
            />
            <TextInput
                placeholder="MM"
                maxLength={2}
                keyboardType="numeric"
                onChangeText={(text) => setExpireMonth(text)}
            />
            <TextInput
                placeholder="DD"
                maxLength={2}
                keyboardType="numeric"
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
                title="Add"
                onPress={() => {addData(itemName, quantity, expireYear, expireMonth, expireDate, category); navigation.goBack()}}    
            />
        </View>
    )
}

export default AddItem;