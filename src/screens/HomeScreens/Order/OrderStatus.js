import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import {useNavigation} from '@react-navigation/native';
import {Button, RadioButton} from 'react-native-paper';
import DatePicker from 'react-native-date-picker'

const OrderStatus = props => {
  const navigation = useNavigation();

  const loginData = useSelector(state => state.auth.loginData);
  const isLoading = useSelector(state => state.loader.isLoading);
  const [query, setQuery] = React.useState('');
  const [fullData, setFullData] = React.useState([]);
  const [value, setValue] = React.useState('all');
  const dispatch = useDispatch();
  const [datestart, setDatestart] = React.useState(new Date());
  const [openStartModal, setOpenStartModal] = React.useState(false);
  const [dateEnd, setDateEnd] = React.useState(new Date());
  const [openEndModal, setOpenEndModal] = React.useState(false);
  const [dateFromFormat,setDateFromFormat] = React.useState('Select From Date');
  const [dateEndFormat,setDateEndFormat] = React.useState('Select End Date');
  const handleDealerList = data =>
    dispatch(actions.handleDealerList({data, navigation}));
  // const handleMyCustomer = data => dispatch(actions.handleMyCustomer({ data, navigation }));

  const OrderListData = useSelector(state => state.productSub.OrderListData);
  const handleLogOut = item => {
    const confirmestimate = item.ID;
    Alert.alert(
      'CheckOut',
      'Are you sure want to Complete the product ?',
      [
        {
          text: 'Yes',
          onPress: () =>
            dispatch(
              actions.handleshareestimateaccount({confirmestimate, navigation}),
            ),
        },
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  useEffect(() => {
    setFullData(OrderListData?.data);
  }, [OrderListData]);
  // const handleshareestimateaccount = data =>

  const findthedata = () => {
    if (props.name == 1) {
      console.log(1);
      const data = {
        ID: 1,
        type: 'salesmen',
        customer: 1,
      };
      handleDealerList(data);
    } else if (props.name == 2) {
      console.log(2);
      const data = {
        type: loginData.data.model,
        ID: loginData.data.ID,
        customer: 1,
      };
      handleDealerList(data);
    } else {
      console.log(3);
      const data = {
        role: loginData.data.Role,
        ID: loginData.data.ID,
        customer: 3,
      };
      handleDealerList(data);
    }
  };

  const usercheckin = useSelector(
    state => state.CheckInList.checkinlistuserData,
  );

  const alreadycheckin = usercheckin.data.filter(function (item) {
    return item.Status == 'Pending';
  });

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const data = OrderListData?.data;
    const results = data.filter(
      order =>
        order.SalesmenName.toLowerCase().includes(formattedQuery) ||
        order.CustomerName.toLowerCase().includes(formattedQuery) ||
        order.Company.toLowerCase().includes(formattedQuery),
    );
    setFullData(results);
    setQuery(text);
  };

  const handleStatusFilter = value => {
    const data = OrderListData?.data;
    if (value != 'all') {
      const results = data.filter(order => order.Status.toLowerCase() == value);
      setFullData(results);
    } else {
      setFullData(data);
    }
    setValue(value);
  };

  const filterOrderByDate = (endDate,reset=false) => {
    const data = OrderListData?.data;
    if(!reset) {
      var startDate  = moment(datestart, "DD/MM/YYYY");
      var endDate     = moment(endDate, "DD/MM/YYYY");
      const results = data.filter((x)=> {
        const createdDate = moment(x.CreatedAt,"DD/MM/YYYY").add(5,'hours').add(30,'minutes')
        const updateDate = moment(x.updatedAt,"DD/MM/YYYY").add(5,'hours').add(30,'minutes')
        return createdDate.isBetween(startDate,endDate) || updateDate.isBetween(startDate,endDate)
      }
      );
      setFullData(results);
    } else {
      setFullData(data);
      setDatestart(new Date());
      setDateEnd(new Date());
      setDateFromFormat('Select From Date');
      setDateEndFormat('Select End Date')
    }
  }

  // console.log('ddddddddd',positive_array);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={isLoading} />
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
              Order
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
                    style={{ width: '85%', height: 50 }}
                    placeholder="Search Orders"
                    onChangeText={handleSearch}
                    maxLength={50}
                    value={query}
                  />
                </View>
      <View>
        <RadioButton.Group
          onValueChange={newValue => handleStatusFilter(newValue)}
          value={value}>
          <View
            style={{
              width: '100%',
              marginLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View>
              <Text>Orders By Status:</Text>
            </View>
            <View>
              <Text>All</Text>
            </View>

            <View>
              <RadioButton value="all" />
            </View>
            <View>
              <Text>Pending</Text>
            </View>

            <View>
              <RadioButton value="pending" />
            </View>
            <View>
              <Text>Done</Text>
            </View>

            <View>
              <RadioButton value="done" />
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <View>
        <View style={{
              width: '100%',
              marginLeft: 15,
              marginBottom:10
            }}>
          <Text>Search Order between Range:</Text>
        </View>
        <View style={{flexDirection:'row',marginLeft:15,justifyContent: 'space-evenly'}}>
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
            <Text style={{marginLeft: 10,marginRight:10}}>{dateFromFormat}</Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          mode="date"
          open={openStartModal}
          date={datestart}
          onConfirm={datestart => {
            const date = moment(datestart).format('DD-MM-YYYY').toString();
            setDateFromFormat(date)
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
            <Text style={{marginLeft: 10,marginRight:10}}>{dateEndFormat}</Text>
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
            setDateEndFormat(date)
            setOpenEndModal(false);
            filterOrderByDate(endDate);
          }}
          onCancel={() => {
            setOpenEndModal(false);
          }}
        />
       <View style={{marginTop:12}}>
       <Button disabled={dateFromFormat == 'Select From Date'} onPress={()=>filterOrderByDate('',true)}>
          Reset
        </Button>
       </View>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center', paddingVertical: 10}}>
        {fullData.length > 0 ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}>
            {/* <FlatList
              data={OrderListData?.data}
              numColumns={1}
              //  keyExtractor={item => item.ID.toString()}
              // ItemSeparatorComponent={() => Separator()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleLogOut(item)}
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
                        {
                        item.CustomerName.length < 18 ?
                        item.CustomerName.substring(0, 18):
                        item.CustomerName.substring(0, 18)+".."
                        }
                      </Text>
                      <Text
                        style={{
                          color: '#BDBDBD',
                          fontSize: 12,
                          fontWeight: '500',
                        }}>
                        GST NO- {item.CustomerGST}
                      </Text>
                      <Text
                        style={{
                          color: '#00A9FF',
                          fontSize: 12,
                          fontWeight: '500',
                          textDecorationLine: 'underline',
                        }}>
                        {item.EstimaterPhone}
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
                        {item.CreatedAt}
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '600',
                        }}>
                        ₹ {item.GrandTotal}
                      </Text>
                    </View>
                  </View>
                  <View
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
                        alignItems:'center'
                      }}>
                      <Text
                        style={{
                          color: '#303231',
                          fontSize: 16,
                          fontWeight: '500',
                          marginLeft: 5,
                        }}>
                          SalesmenPhone
                         ({item.SalesmenPhone})
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '50%',
                        height: 50,
                        borderTopWidth: 1,
                        borderColor: '#BDBDBD',
                        alignItems:'center',
                        flexDirection:'row-reverse',
                        paddingHorizontal:10
                     
                      }}>
                      <TouchableOpacity
                     // style={{backgroundColor:'red',justifyContent:'center',alignItems:'center',width:'100%'}}
                        onPress={() => handleLogOut(item)}
                        >
                        <Text
                          style={{
                            color: '#00A9FF',
                            fontSize: 12,
                            fontWeight: '500',
                            // textDecorationLine: 'underline',
                            marginRight:25,
                            textTransform: 'uppercase'
                            
                          }}>
                          {item.Status}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            /> */}

            {/* ############################################### */}
            {alreadycheckin[0]?.Status == 'Pending' ? (
              <View>
                <View>
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
                        navigation.replace('Followuplistupdate', {
                          ItemId: item.id,
                          udid: item.UUID,
                          Longitude: item.Longitude,
                          Latitude: item.Latitude,
                        })
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
                      alignItems:'center'
                    }}>
                    <Text
                      style={{
                        color: '#303231',
                        fontSize: 16,
                        fontWeight: '500',
                        marginLeft: 5,
                      }}>
                        Status
                     
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      height: 50,
                      borderTopWidth: 1,
                      borderColor: '#BDBDBD',
                      alignItems:'center',
                      flexDirection:'row-reverse',
                      paddingHorizontal:10
                   
                    }}>
                    <TouchableOpacity
                   // style={{backgroundColor:'red',justifyContent:'center',alignItems:'center',width:'100%'}}
                     // onPress={() => handleLogOut(item)}
                      >
                      <Text
                        style={{
                          color: '#00A9FF',
                          fontSize: 12,
                          fontWeight: '500',
                          // textDecorationLine: 'underline',
                          marginRight:25,
                          textTransform: 'uppercase'
                          
                        }}>
                        {item.Status}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View> */}
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : (
              <FlatList
                data={fullData}
                numColumns={1}
                //  keyExtractor={item => item.ID.toString()}
                // ItemSeparatorComponent={() => Separator()}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => handleLogOut(item)}>
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
                          {item.CustomerName.length < 18
                            ? item.CustomerName.substring(0, 18)
                            : item.CustomerName.substring(0, 18) + '..'}
                        </Text>
                        {/* <Text
                        style={{
                          color: '#BDBDBD',
                          fontSize: 12,
                          fontWeight: '500',
                        }}>
                        GST NO- {item.CustomerGST}
                      </Text> */}
                        <Text
                          style={{
                            color: '#00A9FF',
                            fontSize: 12,
                            fontWeight: '500',
                            textDecorationLine: 'underline',
                          }}>
                          {item.EstimaterPhone}
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
                          {item.CreatedAt}
                        </Text>
                        <Text
                          style={{
                            color: '#000000',
                            fontSize: 15,
                            fontWeight: '600',
                          }}>
                          ₹ {item.GrandTotal}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 50,
                        width: '100%',
                        elevation: 4,
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                      }}>
                      {/* <View
                      style={{
                        width: '50%',
                        height: 50,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        justifyContent: 'center',
                        borderColor: '#BDBDBD',
                        alignItems:'center'
                      }}>
                      <Text
                        style={{
                          color: '#303231',
                          fontSize: 16,
                          fontWeight: '500',
                          marginLeft: 5,
                        }}>
                          SalesmenPhone
                         ({item.SalesmenPhone})
                      </Text>
                    </View> */}
                      <View
                        style={{
                          width: '100%',
                          height: 50,
                          borderTopWidth: 1,
                          borderColor: '#BDBDBD',
                          alignItems: 'center',
                          flexDirection: 'row-reverse',
                          paddingHorizontal: 10,
                        }}>
                        <TouchableOpacity
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                          }}
                          onPress={() => handleLogOut(item)}>
                          <Text
                            style={{
                              color: '#00A9FF',
                              fontSize: 12,
                              fontWeight: '500',
                              // textDecorationLine: 'underline',
                              marginRight: 25,
                              textTransform: 'uppercase',
                            }}>
                            {item.Status}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
            {/* ############################################### */}
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
                No order found
              </Text>
            </View>
          </View>
        )}
        {alreadycheckin[0]?.Status == 'Pending' ? (
          <View
            style={{
              width: '90%',
              height: '100%',
              // backgroundColor:'red',
              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
              position: 'absolute',
            }}></View>
        ) : (
          <View
            style={{
              width: '90%',
              height: '100%',
              // backgroundColor:'red',
              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
              position: 'absolute',
            }}>
            <TouchableOpacity
              //onPress={() => navigation.navigate("ChooseDealer")}
              onPress={() => findthedata()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                backgroundColor: '#007DFE',
                paddingHorizontal: 10,
                borderRadius: 20,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#fff',
                  marginRight: 5,
                }}>
                Add Order
              </Text>
              <AntDesign name="plus" size={20} color="#fff" />
            </TouchableOpacity>
            <View></View>
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderStatus;

