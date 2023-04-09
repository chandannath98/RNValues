import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Splash from '../screens/splashscreen/Splash';
import DefineNavigation from './DefineNavigation';

const MainNavigation = () => {
  const [isLoad, setIsLoad] = useState(true);

  setTimeout(() => {
    setIsLoad(false);
  }, 2000);

  return <>
  {
  isLoad ? <Splash/> : <DefineNavigation/>
  }
  </>;
};

export default MainNavigation;
