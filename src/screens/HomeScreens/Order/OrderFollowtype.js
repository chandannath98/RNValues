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
import Geolocation from 'react-native-geolocation-service';
import {useFocusEffect} from '@react-navigation/native';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';

const OrderFollowtype = ({route, navigation}) => {
  const {ItemId, OrderType} = route.params;
  console.log(ItemId);








  const handleDealerList = data =>
  dispatch(actions.handleDealerList({data, navigation}));
  const loginData = useSelector(state => state.auth.loginData);

useEffect(() => {
  const data = {
    type: loginData.data.model,
    ID: loginData.data.ID,
    customer: 1,
  };
  handleDealerList(data);
}, []);


const DealerList = useSelector(state => state.dealerlist.DealerListData)?useSelector(state => state.dealerlist.DealerListData):[]



  console.log("dea ",DealerList)
  const Filterdealer = DealerList?.data?.filter(item => item.ID == ItemId);

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBsc_32ip44ZxiwytqSxKdczopDmUAFpow';


  const isLoading = useSelector(state => state.loader.isLoading);
  const dispatch = useDispatch();
  const handlecheckinupdate = data =>
    dispatch(actions.handlecheckinupdate({data, navigation}));

  const Gettheuuid = useSelector(state => state.dealerlist.CheckinListData);

  //console.log(Gettheuuid);

  const attendancemarked = () => {
    const data = {
      Customerid: ItemId,
      uuid: Gettheuuid.data.UUID,
      meeting_time: '30',
    };

    handlecheckinupdate(data);
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

          <View
            style={{
              width: '23%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Image
              source={require('../../../assests/Dashboard/Group396.png')}
            />
          </View>
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
                <Text>{Filterdealer[0]?.Name}</Text>
                <Text>{Filterdealer[0]?.LegalName}</Text>
                <Text>{Filterdealer[0]?.Channel}</Text>
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

          {OrderType == 'Order Recived' ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateOrder",{ItemId:ItemId})}
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
                <Text>{OrderType}</Text>
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
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Dashboard')}
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
                <Text>{OrderType}</Text>
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
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderFollowtype;
