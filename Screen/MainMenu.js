import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

function MainMenu({navigation}){
    return(
        <View>
            <Button
                title="Manage Temperature"
                onPress={() => navigation.navigate('ManageTemperature')}
            />
            <Button
                title="Item List"
                onPress={() => navigation.navigate('ItemList')}
            />
            <Button
                title="Note"
            />
        </View>
    )
}

export default MainMenu;