import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Followupslist from '../screens/HomeScreens/Followups/Followuplist';

const Stack = createNativeStackNavigator();

const DrawerTodayFollowups = props => {

  // console.log('====================================');
  // console.log('dddddddddd',props);
  // console.log('====================================');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Followupslist"
        component={Followupslist}
        options={{headerShown: false}}
      />
    
      
  
    </Stack.Navigator>
  );
};


export default DrawerTodayFollowups;
