import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Productsubcategory from '../screens/HomeScreens/productsubcategory';
import MyDrawer from './Drawer';
import Product from '../screens/HomeScreens/product';
import ProductDetails from '../screens/HomeScreens/productdetails';
import DrawerInsideStack from './DrawerInsideStack';
import DrawerOrderStack from './DrawerOrderStack';
import DrawerTodayFollowups from './DrawerTodayFollowups';
import CustomerStack from './CustomerStack';
import MyCustomerStack from './MyCustomerStack';
import DrawerCheckinStack from './DrawerCheckinStack';
import CheckInList from '../screens/HomeScreens/Checkin/CheckInList';
import CreateCheckinsecond from '../screens/HomeScreens/Checkin/CreateCheckinsecond';
import CreateCheckin from '../screens/HomeScreens/Checkin/CreateCheckin';
import CreateOrder from '../screens/HomeScreens/Order/CreateOrder';
import CreateOrderSub from '../screens/HomeScreens/Order/CreateOrderSub';
import OrderFollowList from '../screens/HomeScreens/Order/OrderFollowList';
import OrderFollowtype from '../screens/HomeScreens/Order/OrderFollowtype';
import Camera from '../screens/HomeScreens/Order/Camera';
import ExpenseCreate from '../screens/HomeScreens/Expense/ExpenseCreate';
import ExpenseList from '../screens/HomeScreens/Expense/ExpenseList';

const Stack = createNativeStackNavigator();

const DashboardNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyDrawer"
        component={MyDrawer}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Productsubcategory"
        component={Productsubcategory}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Product"
        component={Product}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="DrawerInsideStack"
        component={DrawerInsideStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawerOrderStack"
        component={DrawerOrderStack}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="DrawerTodayFollowups"
        component={DrawerTodayFollowups}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomerStack"
        component={CustomerStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawerCheckinStack"
        component={DrawerCheckinStack}
        options={{headerShown: false}}
      />
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
        name="ExpenseList"
        component={ExpenseList}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="ExpenseCreate"
        component={ExpenseCreate}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;
