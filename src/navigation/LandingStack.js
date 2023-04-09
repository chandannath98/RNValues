
import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';



const Stack = createNativeStackNavigator();

const LandingStack = () => {
  return (
   
      <Stack.Navigator>
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{headerShown:false}}/>
      </Stack.Navigator>
   
  );
}


export default LandingStack;