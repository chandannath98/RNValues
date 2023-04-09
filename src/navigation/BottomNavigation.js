import * as React from 'react';
import { View, Text, Image} from 'react-native';

import Product from '../screens/HomeScreens/product';
import Target from '../screens/HomeScreens/target';
import Chat from '../screens/HomeScreens/chat';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import DashboardNavigation from './StackNavigation';
import Report from '../screens/Report';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  return (
    
    <Tab.Navigator
      initialRouteName="DashboardNavigation"
      activeColor="#000000"
      barStyle={{ backgroundColor: '#fff' }}
      labeled={false}
    >
      <Tab.Screen
        name="DashboardNavigation"
        component={DashboardNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('../assests/Dashboard/home.png')}
            style={{tintColor: color === "#000000" ? color :'#00A9FF'}}
             />

          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('../assests/Dashboard/ele.png')}
            style={{tintColor: color === "#000000" ? color :'#00A9FF'}}
             />
          ),
        }}
      />
      <Tab.Screen
        name="Target"
        component={Target}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('../assests/Dashboard/watch.png')}
            style={{tintColor: color === "#000000" ? color :'#00A9FF'}}
             />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('../assests/Dashboard/chat.png')}
            style={{tintColor: color === "#000000" ? color :'#00A9FF'}}
             />
          ),
        }}
      />
    </Tab.Navigator>
  
  );
}



export default BottomNavigation;