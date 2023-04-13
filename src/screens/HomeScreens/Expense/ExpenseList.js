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
} from 'react-native';
import moment from 'moment';
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
import {Button} from 'react-native-paper';

const ExpenseList = ({navigation}) => {
  const loginData = useSelector(state => state.auth.loginData);
  const LoginUserId = loginData?.data?.ID;
  const [query, setQuery] = React.useState('');
  const [fullData, setFullData] = React.useState([]);
  const [datestart, setDatestart] = React.useState(new Date());
  const [openStartModal, setOpenStartModal] = React.useState(false);
  const [dateEnd, setDateEnd] = React.useState(new Date());
  const [openEndModal, setOpenEndModal] = React.useState(false);
  const [dateFromFormat, setDateFromFormat] =
    React.useState('Select From Date');
  const [dateEndFormat, setDateEndFormat] = React.useState('Select End Date');
  useEffect(() => {
    handlecreateexpanseget();
  }, []);
  const dispatch = useDispatch();
  const handlecreateexpanseget = data =>
    dispatch(actions.handlecreateexpanseget({data, LoginUserId}));

  const CheckinListdata = useSelector(
    state => state.CheckInList.expansegetlist,
  );

  console.log('====================================');
  console.log(CheckinListdata);
  console.log('====================================');

  useEffect(() => {
    setFullData(CheckinListdata?.data);
  }, [CheckinListdata]);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const data = CheckinListdata?.data;
    const results = data.filter(
      expense =>
        expense.SalesmenName.toLowerCase().includes(formattedQuery) ||
        expense.Description.toLowerCase().includes(formattedQuery) ||
        expense.Amount.toString().toLowerCase().includes(formattedQuery) ||
        expense.SalesmenPhone.toLowerCase().includes(formattedQuery) ||
        expense.City.toLowerCase().includes(formattedQuery),
    );
    setFullData(results);
    setQuery(text);
  };


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
              Back
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
          placeholder="Search Expense"
          onChangeText={handleSearch}
          maxLength={50}
          value={query}
        />
      </View>
      <View style={{flex: 0.91}}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'column-reverse',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            {/* <TouchableOpacity
            onPress={() => setOpen(true)}
              style={{
                height: 50,
                width: '100%',
                backgroundColor: '#F2F2F2',
                borderRadius:2,
                elevation:2

              }}>
              
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
                 
              </TouchableOpacity> */}

            {fullData.length > 0 ? (
              <FlatList
                data={fullData}
                numColumns={1}
                //  keyExtractor={item => item.ID.toString()}
                // ItemSeparatorComponent={() => Separator()}
                renderItem={({item}) => (
                  <TouchableOpacity
                  //onPress={() => navigation.navigate("CheckIn",{itemId:item.id})}
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
                          }}>
                          {item.Description.length < 18
                            ? item.Description.substring(0, 18)
                            : item.Description.substring(0, 18) + '..'}
                        </Text>
                        <Text
                          style={{
                            color: '#BDBDBD',
                            fontSize: 12,
                            fontWeight: '500',
                          }}>
                          Amount- {item.Amount}
                        </Text>
                        <Text
                          style={{
                            color: '#00A9FF',
                            fontSize: 12,
                            fontWeight: '500',
                            textDecorationLine: 'underline',
                          }}>
                          {item.SalesmenPhone}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 90,
                          width: '25%',
                          justifyContent: 'space-around',
                          backgroundColor: '#DDF1FC',
                          alignItems: 'center',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#000000',
                            fontSize: 12,
                            fontWeight: '500',
                          }}>
                          {item.Status}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={{width: '100%', height: '85%', alignItems: 'center'}}>
                <View
                  style={{
                    width: '100%',
                    height: '75%',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assests/Dashboard/leaveBackground.png')}
                  />
                  <View>
                    <Text style={{fontSize: 24, fontWeight: '700'}}>
                      No Expense Found
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              position: 'absolute',
              width: 160,
              height: 40,
              marginBottom: 30,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ExpenseCreate')}
              style={{
                backgroundColor: '#00BB29',
                width: 130,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff'}}>Add Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExpenseList;
