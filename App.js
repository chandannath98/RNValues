// export default App;
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {LogBox, Modal, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {ROOT, UNDEFINED} from './src/constants/string';
import Reducer from './src/redux/reducers/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigation from './src/navigation/MainNavigation';
import {useEffect} from 'react';
import axios from 'axios';
import { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import DeviceInfo from 'react-native-device-info';
import { Linking } from 'react-native';



LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);
const persistConfig = {
  key: ROOT,
  storage: AsyncStorage,
  blacklist: [],
};

const enhancers = [
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true,
      predicate: () => __DEV__,
    }),
  ),
];

const composeEnhancers =
  (__DEV__ &&
    typeof window !== UNDEFINED &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  compose;

const enhancer = composeEnhancers(...enhancers);

const persistedReducer = persistReducer(persistConfig, Reducer);

const store = createStore(persistedReducer, {}, enhancer);
let persistor = persistStore(store);

function App() {

const [modalVisible, setModalVisible] = useState(false)


  useEffect(() => {
    const url = 'https://rnsvalves.com/api/v1/app_store/1';
    const authToken = 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC';

    axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        console.log(response.data.data);
        console.log(DeviceInfo.getVersion())
        if(response.data.data.latest_version !=String(DeviceInfo.getVersion())){
          setModalVisible(true)
        }
        // setData(response.data.data.products)

        // Process the response data as needed
      })
      .catch(error => {
        console.error(error);
        // Handle any errors that occurred during the request
      });
  }, []);

  return (
    <Provider store={store}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.58)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 10,
              width: 300,
              height: 300,
              borderRadius: 5,
              // alignItems: 'center',
              justifyContent: 'center',
            }}>
           

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{width:"70%",textAlign:"center",fontSize:17}}>A New Version of the app is released, Please update Your App</Text>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('http://play.google.com/store/apps/details?id=com.rnvalues');
                  // setModalVisible(false);
                }}
                style={{
                  marginVertical: 20,
                  borderColor: 'green',
                  // borderWidth: 1,
                  width: 150,
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: '#00A9FF',

                }}>
                <Text
                  style={{fontSize: 17, fontWeight: '700', color: '#fff'}}>
                  Update Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
