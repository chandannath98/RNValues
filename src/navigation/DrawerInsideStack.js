import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LeaveScreen from '../screens/HomeScreens/Leave/LeaveScreen';
import Applyleave from '../screens/HomeScreens/Leave/Applyleave';



const Stack = createNativeStackNavigator();

const DrawerInsideStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LeaveScreen"
        component={LeaveScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Applyleave"
        component={Applyleave}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};


export default DrawerInsideStack;
