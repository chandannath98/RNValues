import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LeaveScreen from '../screens/HomeScreens/Leave/LeaveScreen';
import Applyleave from '../screens/HomeScreens/Leave/Applyleave';
import CheckIn from '../screens/HomeScreens/Order/CheckIn';
import CreateOrder from '../screens/HomeScreens/Order/CreateOrder';
import CreateOrderSub from '../screens/HomeScreens/Order/CreateOrderSub';
import OrderStatus from '../screens/HomeScreens/Order/OrderStatus';
import ChooseDealer from '../screens/HomeScreens/Order/ChooseDealer';
import OrderFollowList from '../screens/HomeScreens/Order/OrderFollowList';
import OrderFollowtype from '../screens/HomeScreens/Order/OrderFollowtype';
import Camera from '../screens/HomeScreens/Order/Camera';
import Createorderestimate from '../screens/HomeScreens/Order/Createorderestimate';
import FinalOrder from '../screens/HomeScreens/Order/FinalOrder';
import Estimate from '../screens/HomeScreens/Order/Estimate';
import Followuplistupdate from '../screens/HomeScreens/Order/Followuplistupdate';



const Stack = createNativeStackNavigator();

const DrawerOrderStack = ({route}) => {
  const { itemId } = route.params;
  // console.log(itemId);
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="OrderStatus"
        component={() => <OrderStatus name={itemId} />}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ChooseDealer"
        component={ChooseDealer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckIn"
        component={CheckIn}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="CreateOrder"
        component={CreateOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateOrderSub"
        component={CreateOrderSub}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderFollowList"
        component={OrderFollowList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderFollowtype"
        component={OrderFollowtype}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="Createorderestimate"
        component={Createorderestimate}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="FinalOrder"
        component={FinalOrder}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="Estimate"
        component={Estimate}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Followuplistupdate"
        component={Followuplistupdate}
        options={{headerShown: false}}
      />
  
    </Stack.Navigator>
  );
};


export default DrawerOrderStack;
