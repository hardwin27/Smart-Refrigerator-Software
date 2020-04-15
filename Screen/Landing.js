import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button
} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4169E1'
    },
    landingText: {
        marginTop: 100
    }
})

function Landing({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.landingText}>Smart Refrigrator Mobile Controller</Text>
            <Button
                title="Go"
                onPress={() => navigation.navigate('MainMenu')}
            />
        </View>
        
    )
}

export default Landing;