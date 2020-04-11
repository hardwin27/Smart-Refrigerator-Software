import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

function MainMenu({navigation, route}){
    return(
        <View>
            <Button
                title="Manage Temperature"
                onPress={() => navigation.navigate('ManageTemperature')}
            />
            <Button
                title="Item List"
            />
            <Button
                title="Note"
            />
        </View>
    )
}

export default MainMenu;