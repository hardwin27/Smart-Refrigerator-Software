import React, {Fragment} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './Screen/Landing.js'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainMenu from './Screen/MainMenu.js'
import ManageTemperature from './Screen/ManageTemperature.js';
import ItemList from './Screen/ItemList.js';

const Stack = createStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "LandingPage" component={Landing} options={{headerShown: false}}/>
        <Stack.Screen name="MainMenu" component={MainMenu} options={{headerLeft: null}}/>
        <Stack.Screen name="ManageTemperature" component={ManageTemperature}/>
        <Stack.Screen name="ItemList" component={ItemList}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;