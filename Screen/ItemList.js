import React, {useState, useEffect} from 'react';
import {
    SectionList,
    View,
    Text,
    SafeAreaView,
    Button,
    ScrollView
} from 'react-native';
import firebase from '../Components/FirebaseDatabase.js';

function getData(cb) {
    // var dataArray = [];
    // firebase.database().ref('itemList').orderByKey().on('value', (snapshot) => {
    //     dataArray = [];
    //     snapshot.forEach((snap) => {
    //         var key = snap.key;
    //         dataArray.push(key);
    //     })

    //     cb([
    //         {
    //             title: "Test",
    //             data: dataArray
    //         }
    //     ]);
    // });

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
    return(
        <View>
            <Button
                title={title}
            />
        </View>
    )
}

function ItemList({navigation}) {
    const [arrayOfData, setArrayOfData] = useState([]);
    useEffect(() => {
        getData(setArrayOfData)
    }, []);
    return(
        <ScrollView>
            <SafeAreaView>
                <SectionList
                    sections={arrayOfData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => <Item title={item}/>}
                    renderSectionHeader={({section: {title}}) => (
                        <Text>{title}</Text>
                    )}
                />
            </SafeAreaView>
        </ScrollView>
    )
}

export default ItemList;