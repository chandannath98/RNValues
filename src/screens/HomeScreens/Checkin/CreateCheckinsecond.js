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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import moment from 'moment';

const CreateCheckinsecond = ({route, navigation}) => {


  const Checkindropdownlist = useSelector(
    state => state.CheckInList.createcheckindropdownlist,
  );

  useEffect(() => {
    dropdowngetfunc();
    getData();
  }, []);

  const [udid,setcheckinstatus] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('udiddata')
      if(value) {
        setcheckinstatus(value)
      }
    } catch(e) {
      //setcheckinstatus(null)
    }
  }

console.log('====================================');
console.log(udid);
console.log('====================================');
  const [selectedsubcattype, setSelectedsubcattype] = useState('');
  const [subcattype, setsubcattype] = useState([]);

  // console.log('====================================');
  // console.log(selectedsubcattype.toString());
  // console.log('====================================');

  const [SelectedInterested, setSelectedInterested] = useState('');
  const [Interested, setInterested] = useState([]);

  const [followtype, setfollowtype] = useState('');


  const [comment, setcomment] = useState('');
  //    var date = moment()
  //   .utcOffset('+05:30')
  //   .format('HH:mm a');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const Currentdate = moment(date).format('YYYY-MM-DD');
  //   console.log(
  //     "Today's date is: " +
  //     today.format('YYYY-MM-DD')
  //   );
  const dropdowngetfunc = () => {
    let newArraysubcattype = Checkindropdownlist.data.sections.map(
      (item, index) => {
        return {key: item.id, value: item.name};
      },
    );
    //Set Data Variable
    setsubcattype(newArraysubcattype);

    let newArrayInterested = Checkindropdownlist.data.interestedAt.map(
      (item, index) => {
        return {key: item, value: item};
      },
    );
    //Set Data Variable
    setInterested(newArrayInterested);
  };




  const data = [
    {key:'Order Recived', value:'Order Recived'},
    {key:'No order (cold prospect)', value:'No order (cold prospect)'},
    {key:'Next Order in 7 days', value:'Next Order in 7 days'},
    {key:'interested', value:'interested'},
    {key:'Next Order in 15 days', value:'Next Order in 15 days'},
]

const GOOGLE_MAPS_APIKEY = 'AIzaSyBsc_32ip44ZxiwytqSxKdczopDmUAFpow';

const [totaldistance, settotaldistance] = useState(null);

// const [longitude, setlongitude] = useState(null);
// const [latitude, setlatitude] = useState(null);
const [pincode, setpincode] = useState(null);
const [distance_km, setdistance_km] = useState(null);
const [distance_time, setdistance_time] = useState(null);
const [useloader, setuseloader] = useState(false);


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

    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;

      //  console.log('crd', crd);

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
  }, 2000);

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

// console.log('====================================');
// console.log(position);
// console.log('====================================');
  const dispatch = useDispatch();
  const handlecheckout = data => dispatch(actions.handlecheckout({data, navigation,udid}));
  const attendancemarked  = () =>{
    const datasend = {
      meeting_time: 30,
      action: followtype,
      comment: comment,
      next_visit: Currentdate,
      interestedAt: SelectedInterested,
      checkout_longitude: position.latitude,
      checkout_latitude: position.longitude,
      interested_product: selectedsubcattype.toString(),

    };
   handlecheckout(datasend)
    // navigation.navigate("CreateCheckin")
  }


  const [Nameerror, setNameerror] = useState('');
  const [Stateserror, setStateserror] = useState('');
  const [Cityerror, setCityerror] = useState('');
  const [Addresserror, setAddresserror] = useState('');


  const CheckOutValidation = async () =>{
    var NameValid = false;
    if (SelectedInterested.length === 0) {
      setNameerror('Interested required. *');
    } else {
      setNameerror('');
      NameValid = true;
    }


    var StatesValid = false;
    if (followtype.length === 0) {
      setStateserror('Check-in required. *');
    } else {
      setStateserror('');
      StatesValid = true;
    }

    var CityValid = false;
    if (selectedsubcattype.length === 0) {
      setCityerror('sub Category Type required. *');
    } else {
      setCityerror('');
      CityValid = true;
    }

    var AddressValid = false;
    if (comment.length === 0) {
      setAddresserror('Comment required. *');
    } else {
      setAddresserror('');
      AddressValid = true;
    }
    var UserlatValid = false;
    if (position.latitude == 10) {
      alert('Internet Problem');
    } 
     else {
      UserlatValid = true;
    }

    //###############-- Password --############

    var UserlongValid = false;
    if (position.longitude == 10) {
      alert('Internet Problem');
    } 
    else {
      UserlongValid = true;
    }

    if (
      NameValid &&
      StatesValid &&
      CityValid &&
      AddressValid &&
      UserlatValid &&
      UserlongValid
    ) {
      attendancemarked();
    }
  }


  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
              Create CheckOut
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
                  <View style={{width: '50%', marginTop: 10, marginRight: 5}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Interested
                    </Text>
                    <SelectList
                      setSelected={setSelectedInterested}
                      data={Interested}
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
                      Next visit date
                    </Text>
                    <TouchableOpacity
                      onPress={() => setOpen(true)}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      <Text style={{marginLeft: 10}}>{Currentdate}</Text>
                      <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={date => {
                          setOpen(false);
                          setDate(date);
                        }}
                        onCancel={() => {
                          setOpen(false);
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '100%', marginTop: 10, marginRight: 5}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Check in / follow up type
                    </Text>
                    <SelectList
                      setSelected={setfollowtype}
                      data={data}
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

                <View style={{width: '100%', marginTop: 10}}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      marginBottom: 5,
                    }}>
                    Sub Category Type
                  </Text>
                  <MultipleSelectList
                    setSelected={val => setSelectedsubcattype(val)}
                    data={subcattype}
                    save="value"
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

              <View style={{width: '100%', marginTop: 10}}>
             
                <TextInput
                onChangeText={text =>setcomment(text)}
                value={comment}
                placeholder='order recived by delaer'
                  style={{
                    height: 60,
                    width: '100%',
                    borderWidth: 1,
                    borderRadius: 5,
                    justifyContent: 'center',
                    
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

            <View style={{width: '100%', paddingVertical: 15}}>
              <TouchableOpacity
                  onPress={()=>CheckOutValidation()}
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#00A9FF',
                  borderRadius: 10,
                  elevation: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: '500'}}>
                  Check Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default CreateCheckinsecond;

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
