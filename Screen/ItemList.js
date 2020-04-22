import React, {useState, useEffect} from 'react';
import {
    SectionList,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from '../Components/FirebaseDatabase.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498DB'
    },
    itemCategoryContainer: {
        // backgroundColor: '#34db34',
        margin: 10,
        borderStyle: 'dashed',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 5
    },
    itemCategoryText: {
        color: '#ffffff',
        fontSize: 30,
        textAlign: 'center'
    },
    itemNameContainer: {
        margin: 10,
        borderColor: 'black'
    },
    itemNameText: {
        fontSize: 20,
        color: '#ffffff'
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

function getData(cb) {

    var rawFood = [];
    var fruit = [];
    var drink = [];
    var sauce = [];
    var snack = [];
    var other = [];

    firebase.database().ref('ItemList').orderByKey().on('value', (snapshot) => {
        rawFood = [];
        fruit = [];
        drink = [];
        sauce = [];
        snack = [];
        other = [];
        snapshot.forEach((snap) => {
            if(snap.child('category').val() == "rawFood")
            {
                rawFood.push(snap.key);
            }
            else if (snap.child('category').val() == "fruit")
            {
                fruit.push(snap.key);
            }
            else if(snap.child('category').val() == "drink")
            {
                drink.push(snap.key);
            }
            else if(snap.child('category').val() == "sauce")
            {
                sauce.push(snap.key);
            }
            else if(snap.child('category').val() == "snack")
            {
                snack.push(snap.key);
            }
            else
            {
                other.push(snap.key);
            }

            cb([
                {
                    title: "Raw Food",
                    data: rawFood
                },
                {
                    title: "Fruit",
                    data: fruit
                },
                {
                    title: "Drink",
                    data: drink
                },
                {
                    title: "Sauce",
                    data: sauce
                },
                {
                    title: "Snack",
                    data: snack
                },
                {
                    title: "Other",
                    data: other
                }
            ])

        });
    });

}

function Item({title}) {
    const navigation = useNavigation();
    return(
        <View>
            <TouchableOpacity
                style={styles.itemNameContainer}
                onPress={() => navigation.navigate('ItemDetail', {
                    item: title
                })}
            >
                <Text style={styles.itemNameText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

function ItemList({navigation}) {
    const [arrayOfData, setArrayOfData] = useState([]);
    useEffect(() => {
        getData(setArrayOfData)
    }, []);
    return(
        <View style={styles.container}>
            <ScrollView>
                <SafeAreaView>
                    <SectionList
                        sections={arrayOfData}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({item, navigation}) => <Item title={item}/>}
                        renderSectionHeader={({section: {title}}) => (
                            <View style={styles.itemCategoryContainer}>
                                <Text style={styles.itemCategoryText}>{title}</Text>
                            </View>
                        )}
                    />
                </SafeAreaView>
                <TouchableOpacity
                    style={styles.addButtonContainer}
                    onPress={() => navigation.navigate('AddItem')}
                >
                    <Text style={styles.addButtonText}>Add Item</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default ItemList;