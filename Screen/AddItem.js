import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Picker
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from '../Components/FirebaseDatabase.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#3498DB', 
    },
    categoryText: {
        fontSize: 20,
        color: '#ffffff'
    },
    inputContainer: {
        flexDirection: 'row',
        margin: 20 
    },
    expireDateText: {
        fontSize: 20,
        color: '#ffffff',
        flex: 3
    },
    yearInput: {
        flex: 2
    },
    monthAndDateInput: {
        flex: 1
    },
    picker: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    addButtonContainer: {
        backgroundColor: '#34db34',
        borderRadius: 20,
        padding: 10
    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30
    }

})

function addData(itemName, quantity, year, month, date, category) {
    let itemQuantity = parseInt(quantity);
    itemName = itemName.replace(/ /g, "");
    firebase.database().ref('ItemList').child(itemName).set({
        category: category,
        expireDate: year+"-"+month+"-"+date,
        quantity: itemQuantity
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
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.categoryText}>Item Name: </Text>
                <TextInput
                    placeholder="Item Name"
                    autoCapitalize="words"
                    onChangeText={(text) => setItemName(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.categoryText}>Quantity: </Text>
                <TextInput
                    placeholder="Item Quantity"
                    keyboardType="numeric"
                    onChangeText={(text) => setQuantity(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.expireDateText}>Expire Date: </Text>
                <View style={styles.yearInput}>
                    <TextInput
                        placeholder="YYYY"
                        maxLength={4}
                        keyboardType="numeric"
                        onChangeText={(text) => setExpireYear(text)}
                    />    
                </View>
                
                <View style={styles.monthAndDateInput}>
                    <TextInput
                        placeholder="MM"
                        maxLength={2}
                        keyboardType="numeric"
                        onChangeText={(text) => setExpireMonth(text)}
                        style={styles.monthAndDateInput}
                    />    
                </View>

                <View style={styles.monthAndDateInput}>
                    <TextInput
                        placeholder="DD"
                        maxLength={2}
                        keyboardType="numeric"
                        onChangeText={(text) => setExpireDate(text)}
                        style={styles.monthAndDateInput}
                    />    
                </View>
            </View>
            
            <Picker
                style={styles.picker}
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
            <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {addData(itemName, quantity, expireYear, expireMonth, expireDate, category); navigation.goBack()}}    
            >
                <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddItem;