import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Picker
} from 'react-native';
import firebase from '../Components/FirebaseDatabase.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#3498DB', 
    },
    itemNameText: {
        fontSize: 30,
        color: '#ffffff',
        textAlign: 'center'
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
    editButtonContainer: {
        backgroundColor: '#34db34',
        borderRadius: 20,
        padding: 10
    },
    editButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30
    }

})

function getData(itemName, cbQuantity, cbYear, cbMonth, cbDate, cbCategory) {
    firebase.database().ref('ItemList').child(itemName).on('value', (snapshot) => {
        let itemCategory = snapshot.child('category').val();
        let itemExpireDate = snapshot.child('expireDate').val();
        let itemQuantity = snapshot.child('quantity').val();
        let arrayOfExpireDate = itemExpireDate.split("-");

        cbQuantity(itemQuantity.toString());
        cbYear(arrayOfExpireDate[0]);
        cbMonth(arrayOfExpireDate[1]);
        cbDate(arrayOfExpireDate[2]);
        cbCategory(itemCategory);
    })
}

function editData(itemName, itemQuantity, expireDateYear, expireDateMonth, expireDateDate, itemCategory) {
    let itemExpireDate = expireDateYear + "-" + expireDateMonth + "-" + expireDateDate;
    let quantity = parseInt(itemQuantity)
    firebase.database().ref('ItemList').child(itemName).update({
        category: itemCategory,
        expireDate: itemExpireDate,
        quantity: quantity
    });
}

function EditItem({navigation, route}) {
    let {itemName} = route.params;

    const [quantity, setQuantity] = useState("");
    const [expireYear, setExpireYear] = useState("");
    const [expireMonth, setExpireMonth] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [category, setCategory] = useState("rawFood");

    useEffect(() => {
        getData(itemName, setQuantity, setExpireYear, setExpireMonth, setExpireDate, setCategory);
    }, []);

    return(
        <View style={styles.container}>
            <Text style={styles.itemNameText}>{itemName}</Text>
            
            <View style={styles.inputContainer}>
            <Text style={styles.categoryText}>Quantity: </Text>
                <TextInput
                    placeholder="Item Quantity"
                    keyboardType="numeric"
                    value={quantity}
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
                        value={expireYear}
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
                style={styles.editButtonContainer}
                onPress={() => {editData(itemName, quantity, expireYear, expireMonth, expireDate, category); navigation.goBack();}}
            >
                <Text style={styles.editButtonText}>EDIT</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditItem;