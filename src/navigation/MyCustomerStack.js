import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyCustomerList from '../screens/HomeScreens/Customers/MyCustomerList';

const Stack = createNativeStackNavigator();

const MyCustomerStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="MyCustomerList"
        component={MyCustomerList}
        options={{headerShown: false}}
      />
 
    </Stack.Navigator>
  );
};


export default MyCustomerStack;
