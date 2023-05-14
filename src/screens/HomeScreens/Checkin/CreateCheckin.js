import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import {useFocusEffect} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { Alert } from 'react-native';

const CreateOrder = ({route, navigation}) => {
  const loginData = useSelector(state => state.auth.loginData);

  const Checkindropdownlist = useSelector(
    state => state.CheckInList.createcheckindropdownlist,
  );

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imagepath, setimagepath] = useState(null);

  const [image2, setImage2] = useState(null);
  const [uploading2, setUploading2] = useState(false);
  const [transferred2, setTransferred2] = useState(0);
  const [imagepath2, setimagepath2] = useState(null);

  const [sendtoapi, setsendtoapi] = useState(null);

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBsc_32ip44ZxiwytqSxKdczopDmUAFpow';

  const [totaldistance, settotaldistance] = useState(null);
  const [comment, setcomment] = useState(null);
  // const [longitude, setlongitude] = useState(null);
  // const [latitude, setlatitude] = useState(null);
  const [pincode, setpincode] = useState(null);
  const [distance_km, setdistance_km] = useState(null);
  const [distance_time, setdistance_time] = useState(null);
  const [useloader, setuseloader] = useState(false);

  const [Name, setName] = useState('');
  const [FirmName, setFirmName] = useState('');
  const [GSTno, setGSTno] = useState('');
  const [Pancard, setPancard] = useState('');
  const [States, setStates] = useState('');
  const [City, setCity] = useState('');
  const [Address, setAddress] = useState('');
  const [MobileNo, setMobileNo] = useState('');
  const [WhatsappNo, setWhatsappNo] = useState('');
  const [AlternateNo, setAlternateNo] = useState('');
  const [showProgressBar, setShowProgessBar] = useState(false)
  const [uploadProgress,setUploadProgress] = useState(0)

  //  #######################################################

  const [position, setPosition] = useState({
    latitude: 10,

    longitude: 10,

    latitudeDelta: 0.001,

    longitudeDelta: 0.001,

    accuracy: 10,

    altitude: 10,

    heading: 10,

    speed: 10,
  });
  const [state, setState] = useState({data: null, error: false, loading: true});

  const [statenew, setStatenew] = useState({
    data: null,
    error: false,
    loading: true,
  });

  useEffect(() => {
    let intervalId;
    openLocationSettings();
    return () => clearInterval(intervalId);
  }, []);
  const openLocationSettings = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        
  
        if (granted) {
          // console.log(granted)
          GetLocation();
        } else {
          const shouldShowAlert = true
  
          if (shouldShowAlert) {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Permission',
                message: 'This app needs to access your location',
                buttonPositive: 'OK',
              },
            );
  
            const granted = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
  
            if (granted) {
              GetLocation();
            } else {
              Alert.alert(
                'Location Permission Required',
                'Please grant permission in Permission setting of app setting',
                [
                  {
                    text: 'OK',
                    onPress: () => Linking.openSettings(),
                  },
                ],
              );
            }
          } else {
            Alert.alert(
              'Location Permission Required',
              'Please grant permission in Permission setting of app setting',
              [
                {
                  text: 'OK',
                  onPress: () => Linking.openSettings(),
                },
              ],
            );
          }
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      Linking.openSettings();
    }
  };
  
  const GetLocation = () => {
    const goToLocationSettings = () => {
      Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
  
    }
  
    const showAlert = () => {
      clearInterval(intervalId);
      Alert.alert(
        "Location Required",
        "Please open location",
        [
          {
            text: "OK",
            onPress: () =>{ goToLocationSettings()
            navigation.goBack()
            }
          }
        ]
      );
    }
  
    const intervalId = setInterval(() => {
      setState(state => ({ data: state.data, error: false, loading: true }));
  
      try {
        Geolocation.getCurrentPosition(
         
            //do stuff with location
            (position) => {
              const crd = position.coords;
              setPosition({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09,
                accuracy: crd.accuracy,
                altitude: crd.altitude,
                heading: crd.heading,
                speed: crd.speed,
              });
          },
          (error) => {
            console.log(error);
            clearInterval(intervalId);
            showAlert();
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 300000 }
        );
  
        Geolocation.watchPosition(
          (position) => {
            const crd = position.coords;
            setPosition({
              latitude: crd.latitude,
              longitude: crd.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.09,
              accuracy: crd.accuracy,
              altitude: crd.altitude,
              heading: crd.heading,
              speed: crd.speed,
            });
          },
          (error) => {
            console.log(error);
            clearInterval(intervalId);
            showAlert();
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 300000 }
        );
      } catch (error) {
        console.log(error);
        clearInterval(intervalId);
        showAlert();
      }
    }, 2000);
  }


    

  useFocusEffect(
    useCallback(() => {
      getDirections();
    }, [position]),
  );
  const getDirections = async () => {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/diretions/json?origin=${position.latitude},${position.longitude}&destination=${Filterdealer[0].Address}&key=${GOOGLE_MAPS_APIKEY}`,
      );
      // console.log('====================================');
      // console.log(resp);
      // console.log('====================================');

      let respJson = await resp.json();
      // console.log(respJson.routes[0].legs[0].start_address);

      const Tested = respJson.routes[0].legs[0].steps[1].html_instructions;

      const regex = /(<([^>]+)>)/gi;

      const result = Tested.replace(regex, '');

      const totaldis = respJson.routes[0].legs[0].distance.text;
      const removestring = totaldis.replace('km', ' ');
      const convertintdis = parseInt(removestring);

      const totaltime = respJson.routes[0].legs[0].duration.text;
      const removestringtime = totaltime.replace('mins', ' ');
      const convertintime = parseInt(removestringtime);

      const currentaddres = respJson.routes[0].legs[0].start_address;
      console.log('====================================');
      console.log(convertintdis);
      console.log('====================================');

      settotaldistance(convertintdis);
      setdistance_km(convertintdis);
      setdistance_time(convertintime);
      setpincode(currentaddres);
    } catch (error) {
      return error;
    }
  };

  useEffect(
    () => dropdowngetfunc(),

    [],
  );

  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);

  const [selectedcattype, setSelectedcattype] = useState('');
  const [cattype, setcattype] = useState([]);

  const [selectedsubcattype, setSelectedsubcattype] = useState('');
  const [subcattype, setsubcattype] = useState([]);

  const dropdowngetfunc = () => {
    let newArray = Checkindropdownlist.data.counter_sale_type.map(
      (item, index) => {
        return {key: item, value: item};
      },
    );
    //Set Data Variable
    setData(newArray);
    let newArraycattype = Checkindropdownlist.data.counter_type.map(
      (item, index) => {
        return {key: item, value: item};
      },
    );
    //Set Data Variable
    setcattype(newArraycattype);

    let newArraysubcattype = Checkindropdownlist.data.counter_subtype.map(
      (item, index) => {
        return {key: item, value: item};
      },
    );
    //Set Data Variable
    setsubcattype(newArraysubcattype);
  };

  const requestCameraPermission = async () => {
    setuseloader(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,

        {
          title: 'App Camera Permission',

          message: 'App needs access to your camera ',

          buttonNeutral: 'Ask Me Later',

          buttonNegative: 'Cancel',

          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        selectImage();

        console.log('Camera permission given');
      } else {
        setuseloader(false);
        console.log('Camera permission denied');
      }
    } catch (err) {
      setuseloader(false);
      console.warn(err);
    }
  };

  const selectImage = () => {
    const options = {
      maxWidth: 2000,

      maxHeight: 2000,

      storageOptions: {
        skipBackup: true,

        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        setuseloader(false);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        setuseloader(false);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        setuseloader(false);
      } else {
        const source = {uri: response.assets[0].uri};
        setImage(source);
        setuseloader(false);
      }
    });
  };

  const requestCameraPermission2 = async () => {
    setuseloader(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,

        {
          title: 'App Camera Permission',

          message: 'App needs access to your camera ',

          buttonNeutral: 'Ask Me Later',

          buttonNegative: 'Cancel',

          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        selectImage2();

        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
        setuseloader(false);
      }
    } catch (err) {
      setuseloader(false);
      console.warn(err);
    }
  };

  const selectImage2 = () => {
    const options = {
      maxWidth: 500,

      maxHeight: 500,

      storageOptions: {
        skipBackup: true,

        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        setuseloader(false);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        setuseloader(false);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        setuseloader(false);
      } else {
        const source = {uris: response.assets[0].uri};
        //setimagepath(filename)
        setImage2(source);
        setuseloader(false);
      }
    });
  };

  const editUserProfile = async () => {
    setShowProgessBar(true)
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    const {uris} = image2;
    const filename2 = uris.substring(uris.lastIndexOf('/') + 1);

    var datas = new FormData();
    datas.append('salesmenable_id', loginData.data.ID);
    datas.append('longitude', position.longitude);
    datas.append('latitude', position.latitude);
    datas.append('distance_km', 30);
    datas.append('distance_time', 30);
    datas.append('name', Name);
    datas.append('firm_name', FirmName);
    // datas.append('GSTno', GSTno);
    // datas.append('Pancard', Pancard);
    datas.append('state', States);
    datas.append('city', City);
    datas.append('address', Address);
    datas.append('phone', MobileNo);
    datas.append('pincode', Address);
    // datas.append('WhatsappNo', WhatsappNo);
    // datas.append('AlternateNo', AlternateNo);
    datas.append('counter_sale_type', selected);
    datas.append('counter_type', selectedcattype);
    datas.append('counter_subtype', selectedsubcattype);
    datas.append('photo_one', {
      uri: image?.uri,
      name: filename,
      type: 'image/jpg',
    });
    datas.append('photo_two', {
      uri: image2?.uris,
      name: filename2,
      type: 'image/jpg',
    });

    // navigation.navigate("CreateCheckinsecond",{formdata:datas})

    await axios
      .post('https://rnsvalves.com/api/v1/new-check-ins', datas, {
        headers: {
          Authorization: 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC',
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => onProgessEvent(progressEvent) ,
      })
      .then(response => {
        setShowProgessBar(false)
        if(response.data.status===200){
        let sendstatus = response.data.data.status;
        //  console.log('response========>',response.data.data.status);
        let udid = response.data.data.uuid;
        storeData(sendstatus, udid);
        //  await AsyncStorage.setItem('@storage_Key', value)
        setTimeout(() => {
          
          navigation.replace('CreateCheckinsecond');
        }, 1000);
        // navigation.goBack()
        // console.log(navigation.replace)
        }else{
          try{

            Alert.alert(response.data.message?.phone[0])
            Alert.alert("response.data.message?.phone[0]")
            console.log(response.data.message)
          }catch{

            Alert.alert("Something went wrong, Please check the form")
          }
        }
      })
      .catch(error => {
        console.log('response========>', error);
        setShowProgessBar(false)
      });
  };

  const onProgessEvent = (progressEvent)=>{
    const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total)*100);
    setUploadProgress(percentCompleted);
  }

  const storeData = async (value, udid) => {
    try {
      // console.log('====================================');
      // console.log(udid);
      // console.log('====================================');
      await AsyncStorage.setItem('Checkinstatus', value);
      await AsyncStorage.setItem('udiddata', udid);
    } catch (e) {
      // saving error
    }
  };

  const [Nameerror, setNameerror] = useState('');
  const [FirmNameerror, setFirmNameerror] = useState('');
  const [Stateserror, setStateserror] = useState('');
  const [Cityerror, setCityerror] = useState('');
  const [Addresserror, setAddresserror] = useState('');
  const [MobileNoerror, setMobileNoerror] = useState('');
  const [selectederror, setselectederror] = useState('');
  const [selectedcattypeerror, setselectedcattypeerror] = useState('');
  const [selectedsubcattypeerror, setselectedsubcattypeerror] = useState('');
  const [imageerror, setimageerror] = useState('');
  const [image2error, setimage2error] = useState('');

  const CheckInValidation = async () => {
    var NameValid = false;
    if (Name.length === 0) {
      setNameerror('Name required. *');
    } else {
      setNameerror('');
      NameValid = true;
    }

    var FirmNameValid = false;
    if (FirmName.length === 0) {
      setFirmNameerror('FirmName required. *');
    } else {
      setFirmNameerror('');
      FirmNameValid = true;
    }

    var StatesValid = false;
    if (States.length === 0) {
      setStateserror('States required. *');
    } else {
      setStateserror('');
      StatesValid = true;
    }

    var CityValid = false;
    if (City.length === 0) {
      setCityerror('City required. *');
    } else {
      setCityerror('');
      CityValid = true;
    }

    var AddressValid = false;
    if (Address.length === 0) {
      setAddresserror('Address required. *');
    } else {
      setAddresserror('');
      AddressValid = true;
    }

    var MobileNoValid = false;
    if (MobileNo.length === 0) {
      setMobileNoerror('MobileNo required. *');
    } else {
      setMobileNoerror('');
      MobileNoValid = true;
    }

    var selectedValid = false;
    if (selected.length === 0) {
      setselectederror('Sale Type required. *');
    } else {
      setselectederror('');
      selectedValid = true;
    }

    var selectedcattypeValid = false;
    if (selectedcattype.length === 0) {
      setselectedcattypeerror('Category Type required. *');
    } else {
      setselectedcattypeerror('');
      selectedcattypeValid = true;
    }

    var selectedsubcattypeValid = false;
    if (selectedsubcattype.length === 0) {
      setselectedsubcattypeerror('Sub Category Type required. *');
    } else {
      setselectedsubcattypeerror('');
      selectedsubcattypeValid = true;
    }

    var imageValid = false;
    if (image == null) {
      setimageerror('Upload Image 1*');
    } else {
      setimageerror('');
      imageValid = true;
    }

    var image2Valid = false;
    if (image2 == null) {
      setimage2error('Upload Image 2*');
    } else {
      setimage2error('');
      image2Valid = true;
    }
    var UserlatValid = false;
    if (position.latitude == 10) {
      Alert.alert(
        'Location Not Available',
        'Please Turn on Location',
        [
          {
            text: 'OK',
            onPress: () => Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS'),
          },
        ],
      );
    } 
     else {
      UserlatValid = true;
    }

    //###############-- Password --############

    var UserlongValid = false;
    if (position.longitude == 10) {
      Alert.alert(
        'Location Not Available',
        'Please Turn on Location',
        [
          {
            text: 'OK',
            onPress: () => Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS'),
          },
        ],
      );

    } 
    else {
      UserlongValid = true;
    }

    if (
      NameValid &&
      FirmNameValid &&
      StatesValid &&
      CityValid &&
      AddressValid &&
      MobileNoValid &&
      selectedValid &&
      selectedcattypeValid &&
      selectedsubcattypeValid &&
      imageValid &&
      image2Valid &&
      UserlatValid &&
      UserlongValid
      ) {
      editUserProfile();
    }
  };
  const width = Dimensions.get('screen').width - 40

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {useloader ? <Loader /> : null}
      <ImageBackground
        style={{flex: 0.085}}
        source={require('../../../assests/Dashboard/UserloginBG.png')}>
        <View style={{height: 60, width: '100%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: '15%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assests/Dashboard/arrowwhite.png')}
            />
          </TouchableOpacity>
          <View style={{width: '100%', height: 60, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '400',
                color: '#fff',
                marginLeft: 15,
              }}>
              Create Check In
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          width: '100%',
          flex: 0.91,
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}>
        <KeyboardAwareScrollView style={{flex: 1, width: '100%'}}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              flex: 0.9,
              // elevation: 5,
              borderRadius: 10,
              // paddingHorizontal: 15,
              paddingVertical: 15,
            }}>
            {/* <Text style={{ fontSize: 12, fontWeight: '500' }}>Create Order</Text> */}

            <View
              style={{
                width: '100%',
                // flexDirection: 'row',
                // justifyContent: 'space-between',
              }}>
              <View style={{width: '100%', marginTop: 10}}>
                <Text
                  style={{fontSize: 28, fontWeight: '600', color: '#000000'}}>
                  Create New Check in
                </Text>

                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Name
                    </Text>
                    <TextInput
                      onChangeText={text => setName(text)}
                      value={Name}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    />
                    {Nameerror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {Nameerror}
                      </Text>
                    ) : null}
                  </View>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Firm Name
                    </Text>
                    <TextInput
                      value={FirmName}
                      onChangeText={text => setFirmName(text)}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    />
                    {FirmNameerror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {FirmNameerror}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      GST no. (* Optional )
                    </Text>
                    <TextInput
                      value={GSTno}
                      onChangeText={text => setGSTno(text)}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Pan card. (* Optional )
                    </Text>
                    <TextInput
                      value={Pancard}
                      onChangeText={text => setPancard(text)}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                </View>

                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      State
                    </Text>
                    <TextInput
                      onChangeText={text => setStates(text)}
                      value={States}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    />
                    {Stateserror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {Stateserror}
                      </Text>
                    ) : null}
                  </View>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      City
                    </Text>
                    <TextInput
                      onChangeText={text => setCity(text)}
                      value={City}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    />
                    {Cityerror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {Cityerror}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '100%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Address
                    </Text>
                    <TextInput
                      onChangeText={text => setAddress(text)}
                      value={Address}
                      style={{
                        height: 45,
                        width: '98%',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    />
                    {Addresserror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {Addresserror}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Mobile No.
                    </Text>
                    <TextInput
                      value={MobileNo}
                      onChangeText={text => setMobileNo(text)}
                      maxLength={10}
                      keyboardType={'number-pad'}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    />
                    {MobileNoerror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {MobileNoerror}
                      </Text>
                    ) : null}
                  </View>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Whatsapp No. (* Optional )
                    </Text>
                    <TextInput
                      value={WhatsappNo}
                      onChangeText={text => setWhatsappNo(text)}
                      maxLength={10}
                      keyboardType={'number-pad'}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    />
                        
                  </View>
                </View>

                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Alternate No. (* Optional )
                    </Text>
                    <TextInput
                      value={AlternateNo}
                      onChangeText={text => setAlternateNo(text)}
                      maxLength={10}
                      keyboardType={'number-pad'}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                  <View
                    style={{width: '50%', marginTop: 10, paddingHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Sale Type
                    </Text>
                    <SelectList setSelected={setSelected} data={data} />
                    {selectederror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {selectederror}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View
                    style={{width: '50%', marginTop: 10, paddingHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Category Type
                    </Text>
                    <SelectList
                      setSelected={setSelectedcattype}
                      data={cattype}
                    />
                   {selectedcattypeerror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {selectedcattypeerror}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    style={{width: '50%', marginTop: 10, paddingHorizontal: 5}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Sub Category Type
                    </Text>
                    <SelectList
                      setSelected={setSelectedsubcattype}
                      data={subcattype}
                    />
                     {selectedsubcattypeerror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {selectedsubcattypeerror}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      IMAGE 1 (Selfie **)
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        onPress={() => requestCameraPermission()}>
                        <Image
                          source={require('../../../assests/iconcamera.png')}
                          // style={{height:50,width:50}}
                        />
                      </TouchableOpacity>
                      {image !== null ? (
                        <Image
                          source={{uri: image.uri}}
                          style={{height: 80, width: 80}}
                        />
                      ) : (
                        <Image
                          source={require('../../../assests/user_icon.png')}
                          // style={{height:50,width:50}}
                        />
                      )}
                    </View>
                    {imageerror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {imageerror}
                      </Text>
                    ) : null}
                  </View>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      IMAGE 2 (Selfie **)
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        onPress={() => requestCameraPermission2()}>
                        <Image
                          source={require('../../../assests/iconcamera.png')}
                          // style={{height:50,width:50}}
                        />
                      </TouchableOpacity>

                      {image2 !== null ? (
                        <Image
                          source={{uri: image2.uris}}
                          style={{height: 80, width: 80}}
                        />
                      ) : (
                        <Image
                          source={require('../../../assests/user_icon.png')}
                          // style={{height:50,width:50}}
                        />
                      )}
                    </View>
                    {image2error.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {image2error}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View style={{width: '100%', paddingVertical: 15}}>
                  <TouchableOpacity
                    onPress={() => CheckInValidation()}
                    style={{
                      width: '100%',
                      height: 50,
                      backgroundColor: '#00A9FF',
                      borderRadius: 10,
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#fff', fontSize: 20, fontWeight: '500'}}>
                      Check In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Modal
      transparent={true}
      animationType={'none'}
      visible={showProgressBar}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View>
        <View style={{marginBottom:20}}>
          <Text>{uploadProgress}%</Text>
        </View>
      <Progress.Bar progress={uploadProgress} width={width} />
        </View>
      </View>
    </Modal>
    </View>
  );
};

export default CreateOrder;

const styles = StyleSheet.create({
  container: {alignItems: 'center', paddingVertical: 20},
  customer_text_view: {fontSize: 25},
  input_view: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '95%',
    marginTop: 20,
  },
  select_main_view: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  select_view: {
    //   borderBottomWidth: 1,
    //   width: '100%',
    //   height: 42,
    //   justifyContent: 'center',
    height: 45,
    width: '95%',
    borderWidth: 1,
    borderRadius: 5,
    //  width: '100%', height: 25, borderWidth: 1
  },
  select_view_main: {
    //   borderBottomWidth: 1,
    //   width: '100%',
    //   height: 42,
    //   justifyContent: 'center',
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    //  width: '100%', height: 25, borderWidth: 1
  },
  apply_button: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  apply_button_view: {
    //backgroundColor: Color.BUTTON_COLOR,
    width: '100%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apply_button_text: {
    color: '#fff',
    fontSize: 20,
  },
  record_main_view: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 20,
    elevation: 2,
    borderRadius: 10,
  },
  record_view: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: 10,
  },
  record_text_1: {
    width: '45%',
  },
  record_text_2: {
    width: '55%',
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  modalBackground: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'column',
    backgroundColor: '#00000090',
  },
});
