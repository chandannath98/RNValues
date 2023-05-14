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
  PermissionsAndroid,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseCreate = ({route, navigation}) => {

  const loginData = useSelector(state => state.auth.loginData);

  const expansedropdownlist = useSelector(
    state => state.CheckInList.expansedropdownlist,
  );

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
  const [comment, setcomment] = useState('');
  // const [longitude, setlongitude] = useState(null);
  // const [latitude, setlatitude] = useState(null);
  const [pincode, setpincode] = useState(null);
  const [distance_km, setdistance_km] = useState(null);
  const [distance_time, setdistance_time] = useState(null);
  const [useloader, setuseloader] = useState(false);




const [Name,setName] = useState("");
const [FirmName,setFirmName] = useState("");
const [GSTno,setGSTno] = useState("");
const [Pancard,setPancard] = useState("");
const [States,setStates] = useState("");
const [City,setCity] = useState("");
const [Address,setAddress] = useState("");
const [MobileNo,setMobileNo] = useState("");
const [WhatsappNo,setWhatsappNo] = useState("");
const [AlternateNo,setAlternateNo] = useState("");



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
  const intervalId = setInterval(() => {
    //assign interval to a variable to clear it.

    setState(state => ({data: state.data, error: false, loading: true}));

    //   getDirections();
    console.log('crd');

    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;

     console.log('crd', crd);

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
    });
  }, 1000);

  return () => clearInterval(intervalId); //This is important
}, [useState]);

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

    settotaldistance(convertintdis);
    setdistance_km(convertintdis);
    setdistance_time(convertintime);
    setpincode(currentaddres);
  } catch (error) {
    return error;
  }
};







  useEffect(() =>
  
  dropdowngetfunc()

  ,[])

  const [selected, setSelected] = useState("");
  const [data,setData] = useState([]);

  const [selectedcattype, setSelectedcattype] = useState("");
  const [cattype,setcattype] = useState([]);

  const [selectedsubcattype, setSelectedsubcattype] = useState("");
  const [subcattype,setsubcattype] = useState([]);

  const dropdowngetfunc =() =>{
    let newArray = expansedropdownlist?.data?.types.map((item,index) => {
      return {key: item, value: item}
    })
    //Set Data Variable
    setData(newArray)
    let newArraycattype = expansedropdownlist?.data?.types.map((item,index) => {
      return {key: item, value: item}
    })
    //Set Data Variable
    setcattype(newArraycattype)

    let newArraysubcattype = expansedropdownlist?.data?.types.map((item,index) => {
      return {key: item, value: item}
    })
    //Set Data Variable
    setsubcattype(newArraysubcattype)

    
  }

  const requestCameraPermission = async () => {
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
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const selectImage = () => {
    const options = {
      maxWidth: 50,

      maxHeight: 50,

      storageOptions: {
        skipBackup: true,

        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log('====================================');
        console.log('llllllllllllllll',response);
        console.log('====================================');
        setImage(source);
      }
    });
  };



  const editUserProfile = async () => {
    if(image){
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    


    var datas = new FormData();
    datas.append('salesexpanseable_id', loginData.data.ID);
    datas.append('longitude', position.longitude);
    datas.append('latitude', position.latitude);
    datas.append('type', selectedsubcattype);
    datas.append('amount', Address);
    datas.append('description', comment);
    datas.append('location', pincode);
    datas.append('city', pincode);
  
    datas.append('attachment', {
      uri: image?.uri,
      name: filename,
      type: 'image/jpg',
    });
    
 
    setuseloader(true);
    // navigation.navigate("CreateCheckinsecond",{formdata:datas})

    await axios
      .post('https://rnsvalves.com/api/v1/sales/add-expanse', datas, {
        headers: {
          Authorization: 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setuseloader(false);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');

      navigation.popToTop();
      })
      .catch(error => {
        console.log('response========>',error);
        setuseloader(false);
      });

    }
    else{
      
    var datas = new FormData();
    datas.append('salesexpanseable_id', loginData.data.ID);
    datas.append('longitude', position.longitude);
    datas.append('latitude', position.latitude);
    datas.append('type', selectedsubcattype);
    datas.append('amount', Address);
    datas.append('description', comment);
    datas.append('location', pincode);
    datas.append('city', pincode);
  
 
    setuseloader(true);
    // navigation.navigate("CreateCheckinsecond",{formdata:datas})

    await axios
      .post('https://rnsvalves.com/api/v1/sales/add-expanse', datas, {
        headers: {
          Authorization: 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setuseloader(false);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');

      navigation.popToTop();
      })
      .catch(error => {
        console.log('response========>',error);
        setuseloader(false);
      });
    }
  };
  const [Nameerror, setNameerror] = useState('');
  const [Stateserror, setStateserror] = useState('');
  const [Cityerror, setCityerror] = useState('');

const ExpenseValid = () => {
    var NameValid = false;
    if (selectedsubcattype.length === 0) {
      setNameerror('Expense type required. *');
    } else {
      setNameerror('');
      NameValid = true;
    }


    var StatesValid = false;
    if (Address.length === 0) {
      setStateserror('Expense amount required. *');
    } else {
      setStateserror('');
      StatesValid = true;
    }

    var CityValid = false;
    if (comment.length === 0) {
      setCityerror('comment required. *');
    } else {
      setCityerror('');
      CityValid = true;
    }

    if (
      NameValid &&
      StatesValid &&
      CityValid
    ) {
      editUserProfile();
    }

}
 
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
              Back
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
                 EXPENSE
                </Text>

             
             


           

                <View style={{flexDirection: 'row', width: '100%'}}>
                 
                  <View style={{width: '100%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                     EXPENSE TYPE
                    </Text>
                    <SelectList setSelected={setSelectedsubcattype} data={subcattype}
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
                </View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{width: '100%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                     EXPENSE AMOUNT
                    </Text>
                    <TextInput
                      onChangeText={text => setAddress(text)}
                      value={Address}
                      keyboardType="numeric"
                      style={{
                        height: 45,
                        width: '98%',
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
               </View>
               <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{width: '100%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                     COMMENT
                    </Text>
                    <TextInput
                      onChangeText={text => setcomment(text)}
                      value={comment}
                      style={{
                        height: 65,
                        width: '98%',
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
                
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around',
                      }}>
                            <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      UPLOAD EXPENSE BILL / INVOICE
                    </Text>
                      <TouchableOpacity
                        onPress={() => requestCameraPermission()}>
                        <Image
                          source={require('../../../assests/cloudupload.png')}
                          // style={{height:50,width:50}}
                        />
                      </TouchableOpacity>
                      </View>
                      
                      <View style={{width:'100%',marginTop:10,alignItems:'center'}}>
                      {image !== null ? (
                        <Image
                          source={{uri: image.uri}}
                          style={{height: 150, width: 150}}
                        />
                      ) : (
                        null
                        // <Image
                        //   source={require('../../../assests/user_icon.png')}
                        //   // style={{height:50,width:50}}
                        // />
                      )}
                    </View>


                  </View>
               
                </View>

                <View style={{width: '100%', paddingVertical: 15}}>
                  <TouchableOpacity
                onPress={()=>ExpenseValid()}
                    style={{
                      width: '100%',
                      height: 50,
                      backgroundColor: '#00BB29',
                      borderRadius: 10,
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#fff', fontSize: 20, fontWeight: '500'}}>
                      SAVE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ExpenseCreate;

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
});
