import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3498DB',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row' 
    },
    button: {
        backgroundColor: '#34db34',
        margin: 10,
        height: 150,
        width: 150,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

function MainMenu({navigation}){
    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ManageTemperature')}
            >
                <Text style={styles.buttonText}>Manage Temperature</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ItemList')}
            >
                <Text style={styles.buttonText}>Item List</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MainMenu;