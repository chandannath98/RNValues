import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/HomeScreens/dashboard';
import CustomDrawer from "./CustomDrawer";
import Product from "../screens/HomeScreens/product";
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard"
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerTitle:null,
      headerTransparent:true,
      headerLeft:null,
      title:null,
      headerShown:false,
      drawerStyle:{
  
      }
    }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard}/>
    </Drawer.Navigator>
  );
}

export default MyDrawer;