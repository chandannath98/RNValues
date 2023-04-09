import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateCustomer from '../screens/HomeScreens/Customers/CreateCustomer';
import CreateCustomerDetails from '../screens/HomeScreens/Customers/CreateCustomerDetails';
import CreateCustomerDetailSecond from '../screens/HomeScreens/Customers/CreateCustomerDetailSecond';
import CreateCustomerDetailThird from '../screens/HomeScreens/Customers/CreateCustomerDetailThird';

const Stack = createNativeStackNavigator();

const CustomerStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="CreateCustomer"
        component={CreateCustomer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateCustomerDetails"
        component={CreateCustomerDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateCustomerDetailSecond"
        component={CreateCustomerDetailSecond}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateCustomerDetailThird"
        component={CreateCustomerDetailThird}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};


export default CustomerStack;
