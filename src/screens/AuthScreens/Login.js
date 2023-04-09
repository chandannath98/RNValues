// In App.js in a new project

import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';

import Layout from '../../utils/layout';
import CheckBox from '@react-native-community/checkbox';
import LoginHeader from '../../utils/LoginHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/authaction';
import Loader from '../../utils/Loader';

const Login = ({ route, navigation }) => {
  const { itemId } = route.params;
  // console.log(itemId);
  const [text, onChangeText] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');

  const [UserNameError, setUserNameError] = useState('');
  const [PasswordError, setPasswordError] = useState('');

  const isLoading = useSelector(state => state.loader.isLoading);

  const dispatch = useDispatch();
  const handleLogin = data => dispatch(actions.handleLogin({ data, navigation }));

  const handleSubmit = async () => {
    //###############-- UserName --############
    // var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var passw = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
    );
    var UserNameValid = false;
    if (UserName.length === 0) {
      setUserNameError("Email is required * ");
    } else if (reg.test(UserName) === false) {
      setUserNameError("You have entered a invalid email address * ");
    } else {
      setUserNameError('');
      UserNameValid = true;
    }

    //###############-- Password --############

    var passwordValid = false;
    if (Password.length === 0) {
      setPasswordError("Password is required *");
    } else if (Password.length < 8) {
      setPasswordError("Password should be minimum 8 characters *");
    }

    else {
      setPasswordError('');
      passwordValid = true;
    }
    if (UserNameValid && passwordValid) {
      // alert("heelo")
      const data = {
        email: UserName,
        password: Password,
      };
      handleLogin(data);
    }
    //navigation.navigate('FirstStepVerification');
  };

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        {/* <Loader loading={isLoading} /> */}
        <ImageBackground
          source={require('../../assests/MainLogin/image2.png')}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          resizeMode="cover">
          <LoginHeader name={navigation} />
          <KeyboardAwareScrollView>
            <View style={{ flex: 1 }}>
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Image source={require('../../assests/Frame.png')} />
              </View>
              <View style={{ width: '100%', paddingHorizontal: 20 }}>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontSize: 18, fontWeight: '500' }}>Login</Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    borderRadius: 12,
                    height: 60,
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    marginTop: 20,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '15%',
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image source={require('../../assests/Vector.png')} />
                  </View>

                  <TextInput
                    style={{ width: '85%', height: 60 }}
                    placeholder="Username"
                    onChangeText={text => setUserName(text)}
                    maxLength={50}
                    value={UserName}
                  />
                </View>
                {UserNameError.length > 0 ? (
                  <Text style={{
                    color: "red",
                    marginLeft: 25,
                  }}>{UserNameError}</Text>
                ) : null}

                <View
                  style={{
                    width: '100%',
                    borderRadius: 12,
                    height: 60,
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    marginTop: 20,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '15%',
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image source={require('../../assests/Lock.png')} />
                  </View>

                  <TextInput
                    style={{ width: '85%', height: 60 }}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={Password}
                  />
                </View>
                {PasswordError.length > 0 ? (
                  <Text style={{
                    color: "red",
                    marginLeft: 25,
                  }}>{PasswordError}</Text>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>
                      Remember me
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={{
                    width: '100%',
                    height: 58,
                    borderRadius: 30,
                    backgroundColor: '#00A9FF',
                    marginTop: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ justifyContent: 'flex-end' }}>
              <Image
                style={{ width: 428, height: 95, position: 'absolute' }}
                source={require('../../assests/SplashScreen/Vector_13.png')}
              />
              <Image
                style={{ width: 428, height: 116 }}
                source={require('../../assests/SplashScreen/Vector_14.png')}
              />
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    </Layout>
  );
};

export default Login;
