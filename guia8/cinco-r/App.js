import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaCarga from './src/screens/PantallaCarga';
import RsPantalla from './src/screens/RsPantalla';

const Stack = createStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Carga" component={PantallaCarga} />
        <Stack.Screen name="RsPantalla" component={RsPantalla} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};