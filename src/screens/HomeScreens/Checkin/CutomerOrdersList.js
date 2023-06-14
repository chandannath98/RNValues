import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  TextInput,
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet
} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, RadioButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import * as actions from '../../../redux/actions/authaction';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Loader from '../../../utils/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { Alert } from 'react-native';




const CustomerOrderList = ({navigation}) => {




  const [query, setQuery] = React.useState('');
  const [fullData, setFullData] = React.useState([]);

  useEffect(() => {
    // handlecreatecheckindropdownlist();
    getData();
    newfun();
  }, []);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
const [loader, setLoader] = useState(true)
  const [value, setValue] = React.useState('all');
  const [datestart, setDatestart] = React.useState(new Date());
  const [openStartModal, setOpenStartModal] = React.useState(false);
  const [dateEnd, setDateEnd] = React.useState(new Date());
  const [openEndModal, setOpenEndModal] = React.useState(false);
  const [dateFromFormat, setDateFromFormat] =
    React.useState('Select From Date');
  const [dateEndFormat, setDateEndFormat] = React.useState('Select End Date');

  const CheckinListdata = useSelector(
    state => state.Customerlist.customerlistuserData,
  );

  useEffect(() => {
    setFullData(CheckinListdata?.data);
  }, [CheckinListdata]);

  const [checkinstatus, setcheckinstatus] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Checkinstatus');
      if (value) {
        setcheckinstatus(value);
      }
    } catch (e) {
      //setcheckinstatus(null)
    }
  };

  const [udidsss, setcheckinst] = useState('');

  const newfun = async () => {
    try {
      const value = await AsyncStorage.getItem('udiddata');
      if (value) {
        setcheckinst(value);
      }
    } catch (e) {
      //setcheckinstatus(null)
    }
  };

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBsc_32ip44ZxiwytqSxKdczopDmUAFpow';

  const [totaldistance, settotaldistance] = useState(null);
  const [distance_time, setdistance_time] = useState(null);
  const [pincode, setpincode] = useState(null);
  const [selectedItem, setSelectedItem] = useState({})
const [modalVisible, setModalVisible] = useState(false)
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

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       //assign interval to a variable to clear it.

//       setState(state => ({data: state.data, error: false, loading: true}));

//       //   getDirections();
// try{
//   // openLocationSettings()
//   Geolocation.getCurrentPosition(pos => {
//     const crd = pos.coords;

//     //  console.log('crd', crd);

//     setPosition({
//       latitude: crd.latitude,

//       longitude: crd.longitude,

//       latitudeDelta: 0.09,

//       longitudeDelta: 0.09,

//       accuracy: crd.accuracy,

//       altitude: crd.altitude,

//       heading: crd.heading,

//       speed: crd.speed,
//     });
//   });
// }catch{
//   console.log("0000")
  
// }
//     }, 2000);

//     return () => clearInterval(intervalId); //This is important
//   }, [useState]);
useEffect(() => {
  
    openLocationSettings();
 
}, []);

const openLocationSettings = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted) {
        GetLocation();
      } else {
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
  };

  const showAlert = (intervalId) => {
    clearInterval(intervalId);
    Alert.alert(
      'Location Required',
      'Please open location',
      [
        {
          text: 'OK',
          onPress: () => {
            goToLocationSettings();
            navigation.goBack();
          },
        },
      ],
    );
  };

  setState(state => ({ data: state.data, error: false, loading: true }));

  try {
    Geolocation.getCurrentPosition(
      position => {
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
        setLoader(false);
      },
      error => {
        console.log('error');
        console.log(error);

        // showAlert();
      },
    );

    Geolocation.watchPosition(
      position => {
        const crd = position.coords;

        console.log('000');
      },
      error => {
        console.log(error);
        showAlert();
      
          
        }
      );
    } catch (error) {
     
      // showAlert();
    }
  
}



  // console.log('1==>', position);
  useFocusEffect(
    useCallback(() => {
      getDirections();
    }, [position]),
  );
  const getDirections = async () => {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${position.latitude},${position.longitude}&destination=${position.latitude},${position.longitude}&key=${GOOGLE_MAPS_APIKEY}`,
      );
      let respJson = await resp.json();

      const currentaddres = respJson.routes[0].legs[0].start_address;
      setpincode(currentaddres);

      const Tested = respJson.routes[0].legs[0].steps[1].html_instructions;

      const regex = /(<([^>]+)>)/gi;

      const result = Tested.replace(regex, '');

      const totaldis = respJson.routes[0].legs[0].distance.text;

      const removestring = totaldis.replace('km', ' ');
      const convertintdis = parseInt(removestring);

      const totaltime = respJson.routes[0].legs[0].duration.text;
      const removestringtime = totaltime.replace('mins', ' ');
      const convertintime = parseInt(removestringtime);

      settotaldistance(convertintdis);

      setdistance_time(convertintime);
    } catch (error) {
      return error;
    }
  };

  const loginData = useSelector(state => state.auth.loginData);

  const isLoading = useSelector(state => state.loader.isLoading);

  const handleattendance = data =>
    dispatch(actions.handleattendance({data, navigation}));
  // const attendancemarked  = () =>{
  //   const datasend = {
  //     in_latitude: position.latitude,
  //     in_longitude: position.longitude,
  //     salesmenable_id: loginData.data.ID,
  //   };
  //   handleattendance(datasend)
  //   // navigation.navigate("CreateCheckin")
  // }

  const handleSubmit = async () => {
    var UserlatValid = true;
    // if (position.latitude == 10) {
    //   alert('Internet Problem');
    // }
    //  else {
    //   UserlatValid = true;
    // }

    //###############-- Password --############

    var UserlongValid = true;
    // if (position.longitude == 10) {
    //   alert('Internet Problem');
    // }
    // else {
    //   UserlongValid = true;
    // }
    if (UserlatValid && UserlongValid) {
      const datasend = {
        in_latitude: position.latitude,
        in_longitude: position.longitude,
        salesmenable_id: loginData.data.ID,
      };
      handleattendance(datasend);
    }
  };

  const handleSubmitorder = async item => {
    var UserlatValid = true;
    // if (position.latitude == 10) {
    //   alert('Internet Problem');
    // }
    //  else {
    // UserlatValid = true;
    // }

    //###############-- Password --############

    var UserlongValid = true;
    // if (position.longitude == 10) {
    //   alert('Internet Problem');
    // }
    // else {
    //   UserlongValid = true;
    // }
    if (UserlatValid && UserlongValid) {
      navigation.navigate('Checkincamera', {
        itemId: item.id,
        datasend: position,
        pincodeaddress: pincode,
        totaldistance: totaldistance,
        distancetime: distance_time,
      });
    }
  };

  const handleSubmitalready = async item => {
    var UserlatValid = true;
    // if (position.latitude == 10) {
    //   alert('Internet Problem');
    // }
    //  else {
    // UserlatValid = true;
    // }

    //###############-- Password --############

    var UserlongValid = true;
    // if (position.longitude == 10) {
    //   alert('Internet Problem');
    // }
    // else {
    //   UserlongValid = true;
    // }
    if (UserlatValid && UserlongValid) {
      navigation.replace('OrderFollowList', {
        ItemId: item.id,
        udid: item.UUID,
        Longitude: item.Longitude,
        Latitude: item.Latitude,
      });
    }
  };

  const dispatch = useDispatch();
  //  const handlecreatecheckindropdownlist= data => dispatch(actions.handlecreatecheckindropdownlist({ data }));
  const usercheckin = useSelector(
    state => state.CheckInList.checkinlistuserData,
  );

  const alreadycheckin = usercheckin.data.filter(function (item) {
    return item.Status == 'Pending';
  });

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const data = CheckinListdata?.data;
    const results = data.filter(
      customer =>
        customer.firm_name.toLowerCase().includes(formattedQuery) ||
        customer.name.toLowerCase().includes(formattedQuery) ||
        customer.phone.toLowerCase().includes(formattedQuery),
    );
    setFullData(results);
    setQuery(text);
  };

  const handleStatusFilter = value => {
    const data = CheckinListdata?.data;
    if (value != 'all') {
      const results = data.filter(
        customer => customer.counter_type.toLowerCase() == value,
      );
      setFullData(results);
    } else {
      setFullData(data);
    }
    setValue(value);
  };

  const filterOrderByDate = (endDate, reset = false) => {
    const data = CheckinListdata?.data;
    if (!reset) {
      var startDate = moment(datestart, 'DD/MM/YYYY');
      var endDate = moment(endDate, 'DD/MM/YYYY');
      const results = data.filter(x => {
        const updateDate = moment(new Date(x.updated_at), 'DD/MM/YYYY');
        return (
          updateDate.isBetween(startDate, endDate)
        );
      });
      setFullData(results);
    } else {
      setFullData(data);
      setDatestart(new Date());
      setDateEnd(new Date());
      setDateFromFormat('Select From Date');
      setDateEndFormat('Select End Date');
    }
  };



if(loader){
  return(
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>

      <ActivityIndicator size={"large"} />
    </View>
  )
}




  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground
        style={{height:60}}
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
          <View style={{width: '55%', height: 60, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '400',
                color: '#fff',
                marginLeft: 15,
              }}>
              Customer List
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          width: '90%',
          borderRadius: 12,
          height: 50,
          borderWidth: 1,
          backgroundColor: '#fff',
          margin: 20,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '15%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign
            name="search1"
            color="#000"
            size={20}
            style={{paddingRight: 10}}
          />
        </View>

        <TextInput
          style={{width: '85%', height: 50}}
          placeholder="Search Customer"
          onChangeText={handleSearch}
          maxLength={50}
          value={query}
        />
      </View>
      <View>
        <RadioButton.Group
          onValueChange={newValue => handleStatusFilter(newValue)}
          value={value}>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>Customer By Type:</Text>
            </View>
            <View
              style={{
                width: '97%',
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginRight: 10,
              }}>
              <View>
                <Text>All</Text>
              </View>

              <View>
                <RadioButton value="all" />
              </View>
              <View>
                <Text>Direct-Dealer</Text>
              </View>

              <View>
                <RadioButton value="direct-dealer" />
              </View>
              <View>
                <Text>Distributor</Text>
              </View>

              <View>
                <RadioButton value="distributor" />
              </View>
              <View>
                <Text>Retailer</Text>
              </View>

              <View>
                <RadioButton value="retailer" />
              </View>
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <View>
        <View
          style={{
            marginLeft: 15,
            marginBottom: 10,
            flexDirection: 'row', justifyContent: 'center'
          }}>
          <Text>Search Order between Range:</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 15,
            justifyContent: 'space-evenly',
          }}>
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={() => setOpenStartModal(true)}
              style={{
                width: '100%',
                height: 48,
                backgroundColor: '#F2F2F2',
                borderRadius: 8,
                justifyContent: 'center',
              }}>
              <Text style={{marginLeft: 10, marginRight: 10}}>
                {dateFromFormat}
              </Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            mode="date"
            open={openStartModal}
            date={datestart}
            onConfirm={datestart => {
              const date = moment(datestart).format('DD-MM-YYYY').toString();
              setDateFromFormat(date);
              setOpenStartModal(false);
              setDatestart(datestart);
            }}
            onCancel={() => {
              setOpenStartModal(false);
            }}
          />
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={() => setOpenEndModal(true)}
              disabled={dateFromFormat == 'Select From Date'}
              style={{
                width: '100%',
                height: 48,
                backgroundColor: '#F2F2F2',
                borderRadius: 8,
                justifyContent: 'center',
              }}>
              <Text style={{marginLeft: 10, marginRight: 10}}>
                {dateEndFormat}
              </Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            mode="date"
            open={openEndModal}
            date={dateEnd}
            onConfirm={endDate => {
              setDateEnd(endDate);
              const date = moment(endDate).format('DD-MM-YYYY').toString();
              setDateEndFormat(date);
              setOpenEndModal(false);
              filterOrderByDate(endDate);
            }}
            onCancel={() => {
              setOpenEndModal(false);
            }}
          />
          <View style={{marginTop: 12}}>
            <Button
              disabled={dateFromFormat == 'Select From Date'}
              onPress={() => filterOrderByDate('', true)}>
              Reset
            </Button>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'column-reverse',
            alignItems: 'flex-end',
          }}>
          {alreadycheckin[0]?.Status == 'Pending' ? (
            <View style={{width: '100%', height: '100%'}}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                }}>
                <Text>Already checkin</Text>
              </View>
              <FlatList
                data={alreadycheckin}
                numColumns={1}
                //  keyExtractor={item => item.ID.toString()}
                // ItemSeparatorComponent={() => Separator()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{paddingHorizontal: 10}}
                    onPress={() => handleSubmitalready(item)}>
                    <View
                      style={{
                        height: 90,
                        width: '100%',
                        backgroundColor: '#fff',
                        elevation: 2,
                        flexDirection: 'row',
                        marginTop: 10,
                        borderWidth: 1,
                      }}>
                      <View
                        style={{
                          height: 80,
                          width: '20%',
                          backgroundColor: '#fff',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image source={require('../../../assests/map.png')} />
                      </View>
                      <View
                        style={{
                          height: 90,
                          width: '80%',
                          justifyContent: 'center',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#303231',
                            fontSize: 16,
                            fontWeight: '500',
                          }}>
                          {item.customerName}
                        </Text>
                        <Text
                          style={{
                            color: '#BDBDBD',
                            fontSize: 12,
                            fontWeight: '500',
                          }}>
                          Checkin Time - {item.CheckIn}
                        </Text>
                        <Text
                          style={{
                            color: '#00A9FF',
                            fontSize: 12,
                            fontWeight: '500',
                            textDecorationLine: 'underline',
                          }}>
                          {item.customerPhone}
                        </Text>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 12,
                            fontWeight: '500',
                            // textDecorationLine: 'underline',
                          }}>
                          Click to checkout
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : fullData.length > 0 ? (
            <View
              style={{
                height: '100%',
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <FlatList
                data={fullData}
                numColumns={1}
                //  keyExtractor={item => item.ID.toString()}
                // ItemSeparatorComponent={() => Separator()}
                renderItem={({item}) => (
                  <TouchableOpacity
                  onPress={()=>{
                    navigation.navigate("OrdersList",{loginData:loginData,custId:item.id})
                   
                    }}
                    //  onPress={() => navigation.navigate("Checkincamera",{itemId:item.id,datasend:position,pincodeaddress:pincode,totaldistance:totaldistance,distancetime:distance_time,})}
                  >
                    <View
                      style={{
                        height: 90,
                        width: '100%',
                        backgroundColor: '#fff',
                        elevation: 2,
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          height: 90,
                          width: '20%',
                          backgroundColor: '#fff',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image source={require('../../../assests/map.png')} />
                      </View>
                      <View
                        style={{
                          height: 90,
                          width: '55%',
                          justifyContent: 'center',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#303231',
                            fontSize: 16,
                            fontWeight: '500',
                            marginBottom: 10,
                          }}>
                          {item.name}
                        </Text>
                        {/* <Text
                        style={{
                          color: '#BDBDBD',
                          fontSize: 12,
                          fontWeight: '500',
                        }}>
                        Remarks- {item.phone}
                      </Text> */}
                        <Text
                          style={{
                            color: '#00A9FF',
                            fontSize: 12,
                            fontWeight: '500',
                            textDecorationLine: 'underline',
                          }}>
                          {item.phone}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 90,
                          width: '25%',
                          justifyContent: 'space-around',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#BDBDBD',
                            fontSize: 12,
                            fontWeight: '500',
                          }}>
                          {item.counter_type}
                        </Text>
                        <Text
                          style={{
                            color: '#BDBDBD',
                            fontSize: 12,
                            fontWeight: '600',
                          }}>
                          {item.firm_name}
                        </Text>
                      </View>
                    </View>
                    {/* <View
                    style={{
                      height: 50,
                      width: '100%',
                      elevation: 4,
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                    }}>
                    <View
                      style={{
                        width: '50%',
                        height: 50,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        justifyContent: 'center',
                        borderColor: '#BDBDBD',
                      }}>
                      <Text
                        style={{
                          color: '#303231',
                          fontSize: 16,
                          fontWeight: '500',
                          marginLeft: 5,
                        }}>
                        CRM ({item.CRMName})
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '50%',
                        height: 50,
                        borderTopWidth: 1,
                        borderColor: '#BDBDBD',
                        alignItems:'center',
                        flexDirection:'row-reverse'
                     
                      }}>
                      <TouchableOpacity
                        onPress={() => openDialScreen(item.CRMPhone)}>
                        <Text
                          style={{
                            color: '#00A9FF',
                            fontSize: 12,
                            fontWeight: '500',
                            textDecorationLine: 'underline',
                            marginRight:25
                          }}>
                          {item.CRMPhone}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View> */}
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assests/Dashboard/leaveBackground.png')}
              />
              <View>
                <Text style={{fontSize: 24, fontWeight: '700'}}>
                  No Customer Found
                </Text>
              </View>
            </View>
          )}
          <View
            style={{
              position: 'absolute',
              width: 160,
              height: 40,
              marginBottom: 30,
            }}>
            {/* {alreadycheckin[0]?.Status == 'Pending' ?
        
      } */}
            {/* {alreadycheckin[0]?.Status !== 'Pending' ? (
              checkinstatus == '' ? (
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={{
                    backgroundColor: '#00BB29',
                    width: 130,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text style={{color: '#fff'}}>Add New Check-in</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={{
                    backgroundColor: '#00BB29',
                    width: 130,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text style={{color: '#fff'}}>Add New Check-in</Text>
                </TouchableOpacity>
              )
            ) : null} */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomerOrderList;



const styles=StyleSheet.create({


  
})
