
import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainLogin from '../screens/AuthScreens/MainLogin';
import Login from '../screens/AuthScreens/Login';



const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
   
      <Stack.Navigator>
        <Stack.Screen name="MainLogin" component={MainLogin} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      </Stack.Navigator>
   
  );
}


export default AuthNavigation;