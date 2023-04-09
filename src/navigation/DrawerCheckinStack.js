import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckInList from '../screens/HomeScreens/Checkin/CheckInList';
import CreateCheckin from '../screens/HomeScreens/Checkin/CreateCheckin';
import CreateCheckinsecond from '../screens/HomeScreens/Checkin/CreateCheckinsecond';
import Checkincamera from '../screens/HomeScreens/Checkin/Checkincamera';
import OrderFollowList from '../screens/HomeScreens/Checkin/OrderFollowList';
const Stack = createNativeStackNavigator();

const DrawerCheckinStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="CheckInList"
        component={CheckInList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateCheckin"
        component={CreateCheckin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateCheckinsecond"
        component={CreateCheckinsecond}
        options={{headerShown: false}}
      />
          <Stack.Screen
        name="Checkincamera"
        component={Checkincamera}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="OrderFollowList"
        component={OrderFollowList}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};


export default DrawerCheckinStack;
