import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Layout from '../../../utils/layout';
import Modal from 'react-native-modal';
import {RadioButton, Text} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import * as ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Followuplistupdate = ({route, navigation}) => {
  const {ItemId, udid ,Longitude ,Latitude} = route.params;

//   const DealerList = useSelector(state => state.dealerlist.DealerListData);

//   const Filterdealer = DealerList?.data.filter(item => item.ID == ItemId);


  const [isModalVisible, setModalVisible] = useState(false);

  const [value, setValue] = useState('');

  const [Orderdetails, setOrderdetails] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const Checkindropdownlist = useSelector(
    state => state.CheckInList.createcheckindropdownlist,
  );

  const loginData = useSelector(state => state.auth.loginData);
  const Usertypedata = 2;
  const isLoading = useSelector(state => state.loader.isLoading);
  const dispatch = useDispatch();
  const handlecheckinput = data =>
    dispatch(actions.handlecheckinput({data, navigation, udid, ItemId,Usertypedata}));
  const [useriderror, setuseriderror] = useState('');
  const [channeltypeerror, setchanneltypeerror] = useState('');

  //   const handleSubmit = async () => {

  //     var coordinateValid = false;
  //     if (value.length === 0) {
  //         setuseriderror("Check in / Follow up type.*");
  //     } else {
  //         setuseriderror('');
  //         coordinateValid = true;
  //     }

  //     var channeltypeValid = false;
  //     if (Orderdetails.length === 0) {
  //         setchanneltypeerror("Order Received by Dealer.*");
  //     } else {
  //         setchanneltypeerror('');
  //         channeltypeValid = true;
  //     }

  //     if (coordinateValid && channeltypeValid) {
  //         const data = {
  //           meeting_time: 30,
  //           action: value,
  //           comment: Orderdetails,
  //         };
  //         handlecheckinput(data);

  //     }

  // }

  useEffect(() => {
    dropdowngetfunc();
  }, []);

  const [selectedsubcattype, setSelectedsubcattype] = useState('');
  const [subcattype, setsubcattype] = useState([]);

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
    {key: 'Order Recived', value: 'Order Recived'},
    {key: 'No order (cold prospect)', value: 'No order (cold prospect)'},
    {key: 'Next Order in 7 days', value: 'Next Order in 7 days'},
    {key: 'interested', value: 'interested'},
    {key: 'Next Order in 15 days', value: 'Next Order in 15 days'},
  ];

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
        `https://maps.googleapis.com/maps/api/diretions/json?origin=${position.latitude},${position.longitude}&destination=${Latitude},${Longitude}&key=${GOOGLE_MAPS_APIKEY}`,
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

  //  const handlecheckout = data => dispatch(actions.handlecheckout({data, navigation,udid}));
  // const attendancemarked  = () =>{
  //   const datasend = {
  //     meeting_time: 30,
  //     action: followtype,
  //     comment: comment,
  //     next_visit: Currentdate,
  //     interestedAt: SelectedInterested,
  //     checkout_longitude: position.latitude,
  //     checkout_latitude: position.longitude,
  //     interested_product: selectedsubcattype.toString(),

  //   };
  //  //handlecheckout(datasend)
  //   // navigation.navigate("CreateCheckin")
  // }

  const handleSubmit = async () => {
    var coordinateValid = false;
    if (value.length === 0) {
      setuseriderror('Check in / Follow up type.*');
    } else {
      setuseriderror('');
      coordinateValid = true;
    }

    var channeltypeValid = false;
    if (Orderdetails.length === 0) {
      setchanneltypeerror('Order Received by Dealer.*');
    } else {
      setchanneltypeerror('');
      channeltypeValid = true;
    }

    if (coordinateValid && channeltypeValid) {
      const data = {
        meeting_time: 30,
        action: value,
        comment: Orderdetails,
        next_visit: Currentdate,
        interestedAt: SelectedInterested,
        checkout_longitude: position.latitude,
        checkout_latitude: position.longitude,
        interested_product: selectedsubcattype.toString(),
      };
      handlecheckinput(data);
    }
  };

  return (
    <Layout>
      <View style={{flex: 1,backgroundColor:'#fff'}}>
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
                    <View
                      style={{width: '100%', marginTop: 10, marginRight: 5}}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          marginBottom: 5,
                        }}>
                        Check in / follow up type
                      </Text>
                      <SelectList setSelected={setValue} data={data} />
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
                  </View>
                </View>

                <View style={{width: '100%', marginTop: 10}}>
                  <TextInput
                    onChangeText={text => setOrderdetails(text)}
                    value={Orderdetails}
                    placeholder="order recived by delaer"
                    style={{
                      height: 60,
                      width: '100%',
                      borderWidth: 1,
                      borderRadius: 5,
                      justifyContent: 'center',
                    }}
                  />
                </View>
              </View>

              <View style={{width: '100%', paddingVertical: 15}}>
                <TouchableOpacity
                   onPress={()=>handleSubmit()}
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
                    Check Out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Layout>
  );
};

export default Followuplistupdate;
