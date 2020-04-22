import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498DB',
        borderRadius: 20
    },
    outline: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbdbdb',
        padding: 20
    },
    landingText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 40,
        marginBottom: 100,
        fontWeight: 'bold'
    },
    landingButton: {
        backgroundColor: '#34db34',
        borderRadius: 20
    },
    landingButtonText: {
        color: '#ffffff',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 60,
        marginRight: 60,
        fontSize: 30,
        fontWeight: 'bold'
    }
})

function Landing({navigation}){
    const welcomingText = "Nize\nSmart Refrigator"
    return(
        <View style={styles.outline}>
            <View style={styles.container}>
                <Text style={styles.landingText}>{welcomingText}</Text>
                <TouchableOpacity
                    style={styles.landingButton}
                    onPress={() => navigation.navigate('MainMenu')}
                >
                    <Text style={styles.landingButtonText}>GO</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

export default Landing;