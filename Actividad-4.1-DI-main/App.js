import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectionScreen from './src/screens/SelectionScreen.js';
import MatchScreen from './src/screens/MatchScreen.js';
import WinnerScreen from './src/screens/WinnerScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Selection"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0a0a0a' }
        }}
      >
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="Winner" component={WinnerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}