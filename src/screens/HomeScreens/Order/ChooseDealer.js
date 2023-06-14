import React, {useEffect} from 'react';
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
import DatePicker from 'react-native-date-picker'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
const ChooseDealer = ({navigation}) => {
  const DealerList = useSelector(state => state.dealerlist.DealerListData);
  const [query, setQuery] = React.useState('');
  const [fullData, setFullData] = React.useState([]);
  const [datestart, setDatestart] = React.useState(new Date());
  const [openStartModal, setOpenStartModal] = React.useState(false);
  const [dateEnd, setDateEnd] = React.useState(new Date());
  const [openEndModal, setOpenEndModal] = React.useState(false);
  const [dateFromFormat, setDateFromFormat] =
    React.useState('Select From Date');
  const [dateEndFormat, setDateEndFormat] = React.useState('Select End Date');

  const openDialScreen = phone => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:${' + phone + '}';
    } else {
      number = 'tel:${' + phone + '}';
    }
    Linking.openURL(number);
  };

  useEffect(() => {
    setFullData(DealerList?.data);
  }, [DealerList]);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const data = DealerList?.data;
    const results = data.filter(
      dealer =>
        dealer.LegalName.toLowerCase().includes(formattedQuery) ||
        dealer.Name.toLowerCase().includes(formattedQuery) ||
        dealer.CRMName.toLowerCase().includes(formattedQuery),
    );
    setFullData(results);
    setQuery(text);
  };

  const filterOrderByDate = (endDate,reset=false) => {
    const data = DealerList?.data;
    if(!reset) {
      var startDate  = moment(datestart, "MM/DD/YYYY");
      var endDate     = moment(endDate, "MM/DD/YYYY");
      const results = data.filter((x)=> {
        const createdDate = moment(x.CreatedAt,"MM/DD/YYYY")
        return createdDate.isBetween(startDate,endDate)
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


  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground
        style={{height:30}}
        source={require('../../../assests/Dashboard/UserloginBG.png')}>
        <View style={{height: 80, width: '100%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: '15%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom:12
            }}>
            <Image
            style={{marginBottom:12}}
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
                marginBottom:12
              }}>
              Choose Customer
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
          placeholder="Search Dealers"
          onChangeText={handleSearch}
          maxLength={50}
          value={query}
        />
      </View>
      <View>
        <View
          style={{
            width: '100%',
            marginLeft: 15,
            marginBottom: 10,
          }}>
          <Text>Search Dealers between Range:</Text>
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
      <View style={{flex: 0.91}}>
        <View style={{height: '100%', width: '100%'}}>
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
                  onPress={() =>
                    navigation.navigate('CheckIn', {itemId: item.ID})
                  }>
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
                        {item.LegalName.length < 18
                          ? item.LegalName.substring(0, 18)
                          : item.LegalName.substring(0, 18) + '..'}
                      </Text>
                      {/* <Text
                        style={{
                          color: '#BDBDBD',
                          fontSize: 12,
                          fontWeight: '500',
                        }}>
                        GST NO- {item.GSTIN}a
                      </Text>
                      <Text
                        style={{
                          color: '#00A9FF',
                          fontSize: 12,
                          fontWeight: '500',
                          textDecorationLine: 'underline',
                        }}>
                        {item.Phone}
                      </Text> */}
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
                          color: '#BDBDBD',
                          fontSize: 12,
                          fontWeight: '600',
                        }}>
                        {item.CState}
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
                        alignItems: 'center',
                        flexDirection: 'row-reverse',
                      }}>
                      <TouchableOpacity
                        onPress={() => openDialScreen(item.CRMPhone)}>
                        <Text
                          style={{
                            color: '#00A9FF',
                            fontSize: 12,
                            fontWeight: '500',
                            textDecorationLine: 'underline',
                            marginRight: 25,
                          }}>
                          {item.CRMPhone}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChooseDealer;
