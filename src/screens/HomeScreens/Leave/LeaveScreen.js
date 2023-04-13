import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-paper';

const LeaveScreen = ({navigation}) => {
  const loginData = useSelector(state => state.auth.loginData);
  useEffect(() => {
    SendToDataleave();
  }, []);

  const [query, setQuery] = React.useState('');
  const [fullData, setFullData] = React.useState([]);
  const [datestart, setDatestart] = React.useState(new Date());
  const [openStartModal, setOpenStartModal] = React.useState(false);
  const [dateEnd, setDateEnd] = React.useState(new Date());
  const [openEndModal, setOpenEndModal] = React.useState(false);
  const [dateFromFormat, setDateFromFormat] =
    React.useState('Select From Date');
  const [dateEndFormat, setDateEndFormat] = React.useState('Select End Date');

  const isLoading = useSelector(state => state.loader.isLoading);
  const dispatch = useDispatch();
  const handleLeaveStatus = data =>
    dispatch(actions.handleLeaveStatus({data, navigation}));
  const SubmitLeave = () => {
    handleLeaveStatus();
  };
  const handleLeaveCount = data =>
    dispatch(actions.handleLeaveCount({data, navigation}));

  const SendToDataleave = () => {
    const data = {
      userid: loginData.data.ID,
    };
    handleLeaveCount(data);
  };

  const leavelist = useSelector(state => state.leavemanage.LeaveCountListData);

  useEffect(() => {
    setFullData(leavelist?.data);
  }, [leavelist]);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const data = leavelist?.data;
    const results = data.filter(
      leave =>
        leave.Reason.toLowerCase().includes(formattedQuery) ||
        leave.Message.toLowerCase().includes(formattedQuery) ||
        leave.ApprovedBy.toLowerCase().includes(formattedQuery),
    );
    setFullData(results);
    setQuery(text);
  };

  const filterOrderByDate = (endDate, reset = false) => {
    const data = leavelist?.data;
    if (!reset) {
      var startDate = moment(datestart);
      var endDate = moment(endDate);
      const results = data.filter(x => {
        const fromDate = moment(x.LeaveStartAt, 'MMM DD YYYY').add(5,'hours').add(30,'minutes');
        const toDate = moment(x.LeaveEndAt, 'MMM DD YYYY').add(5,'hours').add(30,'minutes');
        return (
          fromDate.isBetween(startDate, endDate) ||
          toDate.isBetween(startDate, endDate)
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
              Leave
            </Text>
          </View>

          {/* <View
            style={{
              width: '15%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assests/Dashboard/Vectorwhite.png')}
            />
          </View>
          <View style={{ width: '15%', height: 60, justifyContent: 'center' }}>
            <Image
              source={require('../../../assests/Dashboard/Group396.png')}
            />
          </View> */}
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
          placeholder="Search Leaves"
          onChangeText={handleSearch}
          maxLength={50}
          value={query}
        />
      </View>
      <View>
        <View
          style={{
            marginLeft: 15,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>Search Leaves between Range:</Text>
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
      {fullData.length == 0 ? (
        <View style={{width: '100%', height: '85%', alignItems: 'center'}}>
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
                No Leave Found
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              height: '25%',
              // backgroundColor:'red',
              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => SubmitLeave()}
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="plus-circle"
                size={50}
                color="#007DFE"
              />
              <Text style={{fontSize: 14, fontWeight: '700', color: '#747070'}}>
                Add Leave
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{width: '100%', height: '85%', paddingHorizontal: 10}}>
          <FlatList
            data={fullData}
            numColumns={1}
            //  keyExtractor={item => item.ID.toString()}
            // ItemSeparatorComponent={() => Separator()}
            renderItem={({item}) => (
              <TouchableOpacity
              // onPress={() => navigation.navigate("CheckIn",{itemId:item.ID})}
              >
                <View
                  style={{
                    //  height: 90,
                    width: '100%',
                    backgroundColor: '#fff',
                    elevation: 2,
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    // borderWidth:1
                  }}>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '40%'}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
                        Reason :-{' '}
                      </Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '400',
                        }}>
                        {item.Reason}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '40%'}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
                        Message :-{' '}
                      </Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '400',
                        }}>
                        {item.Message}
                      </Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '40%'}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
                        Approved By :-{' '}
                      </Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '400',
                        }}>
                        {item.ApprovedBy}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '40%'}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
                        Date Start to end :-{' '}
                      </Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '400',
                        }}>
                        {item.LeaveStartAt} to {item.LeaveEndAt}
                      </Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '40%'}}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
                        Status :-{' '}
                      </Text>
                    </View>
                    <View style={{width: '60%'}}>
                      <Text
                        style={{
                          color: item.Status == 'Review' ? 'red' : 'green',
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
                        {item.Status}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          {/* <View
            style={{
              width: '100%',
              height: '75%',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assests/Dashboard/leaveBackground.png')}
            />
          </View> */}
          <View
            style={{
              width: '100%',
              height: '25%',
              // backgroundColor:'red',
              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => SubmitLeave()}
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="plus-circle"
                size={50}
                color="#007DFE"
              />
              <Text style={{fontSize: 14, fontWeight: '700', color: '#747070'}}>
                Add Leave
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default LeaveScreen;
