import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const Dashboardheader = props => {
  return (
    <View style={{height: 60, width: '100%', flexDirection: 'row',alignItems:'center'}}>
      <TouchableOpacity
        onPress={() => props.name.navigation.toggleDrawer()}
        style={{
          height: 50,
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../../assests/Dashboard/Group393.png')} />
      </TouchableOpacity>
      <View style={{height: 50, width: '15%', justifyContent: 'center'}}>
        <Image source={require('../../assests/Dashboard/logo1.png')} />
      </View>
      <View style={{height: 50, width: '40%'}}></View>

      {/* <View
        style={{
          height: 50,
          width: '15%',
          justifyContent: 'center',
        }}>
        <Image source={require('../../assests/Dashboard/search.png')} />
      </View>
      <View style={{height: 50, width: '15%', justifyContent: 'center'}}>
        <Image source={require('../../assests/Dashboard/Group395.png')} />
      </View> */}
    </View>
  );
};
export default Dashboardheader;
