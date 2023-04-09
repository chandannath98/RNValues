import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const LoginHeader = (props) => {
  // console.log(props);
  return (
    <View
      style={{
        width: '100%',
        height: 66,
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={() => props.name.goBack()}
        style={{
          width: '20%',
          height: 66,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../assests/Group.png')} />
      </TouchableOpacity>
      <View
        style={{
          width: '60%',
          height: 66,
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: '700', fontSize: 24}}>CRM / LOGIN</Text>
      </View>
      <View style={{width: '20%', height: 66, justifyContent: 'center'}}>
        <Image source={require('../assests/logo1.png')} />
      </View>
    </View>
  );
};

export default LoginHeader;
