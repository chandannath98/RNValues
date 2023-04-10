import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';

const CheckIn = ({route, navigation}) => {
  const {itemId} = route.params;
  const DealerList = useSelector(state => state.dealerlist.DealerListData);

  const Filterdealer = DealerList.data.filter(item => item.ID == itemId);

  // console.log('Filterdealer===>',Filterdealer[0].Address);
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
        `https://maps.googleapis.com/maps/api/directions/json?origin=${position.latitude},${position.longitude}&destination=${Filterdealer[0].Address}&key=${GOOGLE_MAPS_APIKEY}`,
      );

     

      let respJson = await resp.json();

      const Tested = respJson.routes[0].legs[0].steps[1].html_instructions;

      const regex = /(<([^>]+)>)/gi;

      const result = Tested.replace(regex, '');

      const totaldis = respJson.routes[0].legs[0].distance.text;
      const currentaddres = respJson.routes[0].legs[0].start_address;

      const removestring = totaldis.replace('km', ' ');
      const convertintdis = parseInt(removestring);

      const totaltime = respJson.routes[0].legs[0].duration.text;
      const removestringtime = totaltime.replace('mins', ' ');
      const convertintime = parseInt(removestringtime);


      settotaldistance(convertintdis);
      setpincode(currentaddres);
      setdistance_time(convertintime);
    
    } catch (error) {
      return error;
    }
  };
 
  const loginData = useSelector(state => state.auth.loginData);

  const isLoading = useSelector(state => state.loader.isLoading);
  const dispatch = useDispatch();
  const handleattendance = data => dispatch(actions.handleattendance({data, navigation,itemId}));
  // const attendancemarked  = () =>{
    
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
        pincodeaddress:pincode,
        totaldistance:totaldistance,
        distancetime:distance_time,
      };
      navigation.navigate("Camera",{datasend,itemId});
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground
        style={{height: 60, width: '100%'}}
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
              Back
            </Text>
          </View>

          {/* <View
            style={{
              width: '23%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Image
              source={require('../../../assests/Dashboard/Group396.png')}
            />
          </View> */}
        </View>
      </ImageBackground>
      <ScrollView>
      <View
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            height: 450,
            elevation: 5,
          }}>
          <View style={{width: '100%', height: 60, flexDirection: 'row'}}>
            <View
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('../../../assests/UserIcon.png')} />
            </View>
            <View style={{width: '80%', justifyContent: 'center'}}>
              <Text>{Filterdealer[0].Name}</Text>
              {/* <Text>{Filterdealer[0].LegalName}</Text> */}
              <Text>{Filterdealer[0].Channel}</Text>
            </View>
          </View>

          <Image
            source={require('../../../assests/Line.png')}
            style={{width: 365}}
          />
          <View style={{width: '100%', paddingHorizontal: 25}}>
            <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
              <View style={{width: '50%'}}>
                <Text>Payment Method</Text>
              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <Text>BANK</Text>
              </View>
            </View>
            {/* <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
              <View style={{width: '50%'}}>
                <Text>GST</Text>
              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <Text>{Filterdealer[0].GSTIN}</Text>
              </View>
            </View> */}
            <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
              <View style={{width: '50%'}}>
                <Text>Total amount pending</Text>
              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <Text style={{color: '#DB001E'}}>₹ 00.000</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#EDEDED',
              width: '100%',
              height: 30,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 28,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Details</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#00A9FF"
              />
            </View>
          </View>
          <View style={{width: '100%', paddingHorizontal: 25}}>
            <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
              <View style={{width: '50%'}}>
                <Text>Email</Text>
              </View>
              <View style={{width: '50%'}}>
                <Text>{Filterdealer[0].Email}</Text>
              </View>
            </View>
            <Image
              source={require('../../../assests/Line5.png')}
              style={{width: 320}}
            />
            <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
              <View style={{width: '50%'}}>
                <Text>Mobile</Text>
              </View>
              <View style={{width: '50%'}}>
                <Text>{Filterdealer[0].Phone}</Text>
              </View>
            </View>
            <Image
              source={require('../../../assests/Line5.png')}
              style={{width: 320}}
            />
            <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
              <View style={{width: '50%'}}>
                <Text>Address</Text>
              </View>
              <View style={{width: '50%'}}>
                <Text>{Filterdealer[0].Address}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
              <View style={{width: '50%'}}>
                <Text>Booking Destination</Text>
              </View>
              <View style={{width: '50%'}}>
                <Text>{Filterdealer[0].BookingDestination}</Text>
              </View>
            </View>
            <Image
              source={require('../../../assests/Line5.png')}
              style={{width: 320}}
            />
          </View>
        </View>
        {totaldistance !== null ? 
        totaldistance > 3 ? 
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: 'red',
            marginTop: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#fff'}}>{totaldistance} Km</Text>
        </View> : null :null}

        {totaldistance !== null ? 
          totaldistance > 3 ? 
            <TouchableOpacity
            onPress={()=>handleSubmit()}
              style={{
                height: 63,
                width: '100%',
                backgroundColor: '#fff',
                marginTop: 20,
                elevation: 5,
                flexDirection: 'row',
                borderRadius: 15,
              }}>
              <View
                style={{
                  width: '15%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={require('../../../assests/Group401.png')} />
              </View>
              <View
                style={{
                  width: '70%',
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <Text>CHECK IN / FOLLOW UP </Text>
              </View>
              <View
                style={{
                  width: '15%',
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#00BB29',
                    width: 40,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="#fff"
                  />
                </View>
              </View>
            </TouchableOpacity>
           : 
           <View
           style={{
             height: 63,
             width: '100%',
             backgroundColor: '#fff',
             marginTop: 20,
             elevation: 5,
             flexDirection: 'row',
             borderRadius: 15,
           }}>
           <View
             style={{
               width: '15%',
               height: '100%',
               justifyContent: 'center',
               alignItems: 'center',
             }}>
             <Image source={require('../../../assests/Group401.png')} />
           </View>
           <View
             style={{
               width: '70%',
               height: '100%',
               justifyContent: 'center',
             }}>
             <Text>CHECK IN / FOLLOW UP </Text>
           </View>
           <View
             style={{
               width: '15%',
               height: '100%',
               justifyContent: 'center',
             }}>
             <View
               style={{
                 backgroundColor: '#00BB29',
                 width: 40,
                 height: 30,
                 justifyContent: 'center',
                 alignItems: 'center',
                 borderRadius: 10,
               }}>
               <MaterialIcons
                 name="keyboard-arrow-right"
                 size={30}
                 color="#fff"
               />
             </View>
           </View>
         </View>
         : null}
      </View>
      </ScrollView>
    </View>
  );
};

export default CheckIn;
