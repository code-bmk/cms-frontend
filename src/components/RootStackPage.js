import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Display from './Display';



const Stack = createStackNavigator();

function RootStackPage() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Display" component={Display} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackPage;