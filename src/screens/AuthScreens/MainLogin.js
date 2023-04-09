// In App.js in a new project

import * as React from 'react';
import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Layout from '../../utils/layout';
import {RadioButton, Text} from 'react-native-paper';
const MainLogin = ({navigation}) => {
  const [value, setValue] = React.useState('first');

  return (
    <Layout>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assests/MainLogin/image2.png')}
          style={{position: 'absolute', width: '100%', height: '100%'}}
          resizeMode="cover">
          <View
            style={{
              flex: 1.5,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 275, height: 220}}
              source={require('../../assests/MainLogin/image1.png')}
            />
          </View>

          <View style={{flex: 2}}>
            <RadioButton.Group
              onValueChange={newValue => setValue(newValue)}
              value={value}>
              <View
                style={{
                  width: '100%',

                  alignItems: 'center',
                  marginTop: 50,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    width: 247,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderRadius: 13,
                    elevation: 5,
                  }}>
                  <View style={{width: '20%'}}>
                    <Image
                      source={require('../../assests/MainLogin/facebook1.png')}
                    />
                  </View>

                  <View style={{width: '50%'}}>
                    <Text>Field Executive</Text>
                  </View>

                  <View style={{width: '20%'}}>
                    <RadioButton value="first" />
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: '100%',

                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    width: 247,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderRadius: 13,
                    elevation: 5,
                  }}>
                  <View style={{width: '20%'}}>
                    <View
                      style={{
                        backgroundColor: '#3B5998',
                        width: 29,
                        height: 29,
                        borderRadius: 29 * 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{height: 20, width: 20}}
                        source={require('../../assests/MainLogin/client1.png')}
                      />
                    </View>
                    {/*  */}
                  </View>

                  <View style={{width: '50%'}}>
                    <Text>Salesmen</Text>
                  </View>

                  <View style={{width: '20%'}}>
                    <RadioButton value="second" />
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: '100%',

                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    width: 247,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderRadius: 13,
                    elevation: 5,
                  }}>
                  <View style={{width: '20%'}}>
                    <Image
                      source={require('../../assests/MainLogin/linkedin1.png')}
                    />
                  </View>

                  <View style={{width: '50%'}}>
                    <Text>CRM</Text>
                  </View>

                  <View style={{width: '20%'}}>
                    <RadioButton value="third" />
                  </View>
                </View>
              </View>
            </RadioButton.Group>

            <View
              style={{
                width: '100%',

                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login',{
                  itemId:value
                })}
                style={{
                  width: 277,
                  height: 58,
                  backgroundColor: '#00A9FF',
                  borderRadius: 30,
                  elevation: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', fontWeight: '700', fontSize: 17}}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 0.5, justifyContent:'flex-end'}}>
          <Image
          style={{width:428,height:95,position:'absolute'}}
           source={require('../../assests/SplashScreen/Vector_13.png')}
          />
        <Image
          style={{width:428,height:116}}
           source={require('../../assests/SplashScreen/Vector_14.png')}
          />
         
          </View>
          
        </ImageBackground>
      </View>
    </Layout>
  );
}

export default MainLogin;
