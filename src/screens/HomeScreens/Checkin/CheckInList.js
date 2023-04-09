import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import * as actions from '../../../redux/actions/authaction';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../utils/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CheckInList = ({navigation}) => {

  useEffect(()=>{
   // handlecreatecheckindropdownlist();
    getData();
    newfun();
  },[])
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const CheckinListdata = useSelector(
    state => state.Customerlist.customerlistuserData,
  );



  const [checkinstatus,setcheckinstatus] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Checkinstatus')
      if(value) {
        setcheckinstatus(value)
      }
    } catch(e) {
      //setcheckinstatus(null)
    }
  }

  const [udidsss,setcheckinst] = useState('');

  const newfun = async () => {
    try {
      const value = await AsyncStorage.getItem('udiddata')
      if(value) {
        setcheckinst(value)
      }
    } catch(e) {
      //setcheckinstatus(null)
    }
  }

  
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBsc_32ip44ZxiwytqSxKdczopDmUAFpow';

  const [totaldistance, settotaldistance] = useState(null);
  const [distance_time, setdistance_time] = useState(null);
  const [pincode, setpincode] = useState(null);

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

  const handleattendance = data => dispatch(actions.handleattendance({data, navigation}));
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
    if (UserlatValid && UserlongValid) {
       const datasend = {
      in_latitude: position.latitude,
      in_longitude: position.longitude,
      salesmenable_id: loginData.data.ID,
    };
    handleattendance(datasend)
    }
  };

  const handleSubmitorder = async (item) => {
 
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
    if (UserlatValid && UserlongValid) {
      navigation.navigate("Checkincamera",
      {itemId:item.id,datasend:position,pincodeaddress:pincode,
        totaldistance:totaldistance,distancetime:distance_time,})
    }
  };

  const handleSubmitalready = async (item) => {
 
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
    if (UserlatValid && UserlongValid) {
      navigation.replace('OrderFollowList', {
        ItemId: item.id,
        udid: item.UUID,
        Longitude: item.Longitude,
        Latitude: item.Latitude
      })
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


  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground
        style={{flex: 0.09}}
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
              Check In List
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={{flex: 0.91}}>
        <View style={{height: '100%', width: '100%',flexDirection:'column-reverse',alignItems:'flex-end'}}>
        {alreadycheckin[0]?.Status == 'Pending' ? (
              <View style={{width:'100%',height:'100%'}}>
                <View style={{width:'100%',justifyContent:'center',alignItems:'center',height:30,}}>
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
                      onPress={() =>
                        handleSubmitalready(item)
                      }>
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
            ) : 
          <View
            style={{
              height: '100%',
              width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
        
            <FlatList
              data={CheckinListdata?.data}
              numColumns={1}
              //  keyExtractor={item => item.ID.toString()}
              // ItemSeparatorComponent={() => Separator()}
              renderItem={({item}) => (
                <TouchableOpacity
                onPress={()=>handleSubmitorder(item)}
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
                          marginBottom:10
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
        }
          <View style={{position:'absolute',width:160,height:40,marginBottom:30}}>
        {/* {alreadycheckin[0]?.Status == 'Pending' ?
        
      } */}
            {
            alreadycheckin[0]?.Status !== 'Pending' ?
            checkinstatus == '' ?
            <TouchableOpacity 
            onPress={()=>handleSubmit()}
            style={{backgroundColor:'#00BB29',width:130,height:30,
            justifyContent:'center',alignItems:'center',borderRadius:10}}>
                <Text style={{color:'#fff'}}>Add New Check-in</Text>
            </TouchableOpacity> : 
            <TouchableOpacity 
            onPress={()=>navigation.navigate('CreateCheckinsecond')}
            style={{backgroundColor:'#00BB29',width:130,height:30,
            justifyContent:'center',alignItems:'center',borderRadius:10}}>
                <Text style={{color:'#fff'}}>Add New Check-in</Text>
            </TouchableOpacity>
            :null
}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CheckInList;
