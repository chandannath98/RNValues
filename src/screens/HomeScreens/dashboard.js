import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Dashboardheader from '../../utils/Homeheaders/Dashboardheader';
import Layout from '../../utils/layout';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../utils/Loader';
import moment from 'moment';
import * as actions from '../../redux/actions/authaction';
import { useState } from 'react';
import {useFocusEffect} from '@react-navigation/native';

const Dashboard = ({navigation}) => {

  var date = moment()
  .utcOffset('+05:30')
  .format('HH:mm a');
// console.log(new Date().getHours());

const [Hours,SetHours] = React.useState(new Date().getHours());

const [CompleteHours,SetCompleteHours] = React.useState(date);

const [count, setcount] = React.useState(1);

const [UserName, setUserName] = React.useState('');
 

const loginData = useSelector(state => state.auth.loginData);



  const isLoading = useSelector(state => state.loader.isLoading);

  const MainCategory = useSelector(
    state => state.maincategory.MainCategoryData,
  );

const LoginUserId = loginData?.data?.ID

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     SetHours(date);
  //     SetCompleteHours(date);
  //     setUserName(loginData.data.Name);
  //     // setcount(count+1);
  //     handleOrderlist();
  //     funcSendData();
  //   }, 2000);
  // },[] );
  useFocusEffect(
    React.useCallback(() => {
      SetHours(date);
          SetCompleteHours(date);
          setUserName(loginData.data.Name);
          // setcount(count+1);
          handleOrderlist();
          funcSendData();
    }, [loginData]),
  );


  const dispatch = useDispatch();
  const handleestimatelist= data => dispatch(actions.handleestimatelist({ data }));

  const handleproductdropdown= data => dispatch(actions.handleproductdropdown({ data }));

  const handleOrderlist= data => dispatch(actions.handleOrderlist({ data,LoginUserId }));
  const handlecheckinlistuser= data => dispatch(actions.handlecheckinlistuser({ data,LoginUserId }));
  const handlecreatecheckindropdownlist= data => dispatch(actions.handlecreatecheckindropdownlist({ data }));
  const handlecreateexpansedropdown= data => dispatch(actions.handlecreateexpansedropdown({ data }));
  const handlecreateexpanseget= data => dispatch(actions.handlecreateexpanseget({ data,LoginUserId }));
  const handlecustomerlist= data => dispatch(actions.handlecustomerlist({ data,LoginUserId }));
 
 
  const funcSendData = () =>{
  handleestimatelist();
  handleproductdropdown();
  handlecheckinlistuser();
  handlecreatecheckindropdownlist();
  handlecreateexpansedropdown();
  handlecreateexpanseget();
  handlecustomerlist();
 }

 

  if (MainCategory == null) {
    return (
      <View style={styles.ActivityLoader}>
        <Loader loading={isLoading} />
      </View>
    );
  }




  return (
    <Layout>
      <Dashboardheader name={{navigation}} />
      <View style={{flex: 1}}>
        {/* ################# First Section ###################### */}
        

        <View style={{flex: 1}}>
          <ImageBackground
            source={require('../../assests/Dashboard/Vector14.png')}
            style={{
              position: 'absolute',
              width: '100%',
              height: 116,
              marginTop: 10,
            }}
            resizeMode="cover">
            <View style={{paddingHorizontal: 20, marginTop: 10}}>
              <View style={{flexDirection:'row'}}>
              
                { Hours < 12 ?
                <Text style={{fontWeight: '400', fontSize: 18, color: '#090707',}}>
                  Good Morning, 
                  </Text>
                  :
                  <Text style={{fontWeight: '400', fontSize: 18, color: '#090707'}}>
                  Good Evening,  
                  </Text>
                
                }
                <Text style={{fontWeight: '400', fontSize: 18, color: '#090707',marginLeft:5}}>
                   {UserName}
                   </Text>
                  </View>
              
              <Text style={{fontWeight: '500', fontSize: 14, color: '#050505'}}>
                Your Last Login : {CompleteHours}
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* ################# Second Section ###################### */}

        <View
          style={{
            flex: 3.7,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            backgroundColor: '#fff',
          }}>
          <ScrollView>
            <View
              style={{
                height: 80,
                borderTopEndRadius: 20,
                borderTopStartRadius: 20,
                width: '100%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 80,
                  width: '18%',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <Image
                  source={require('../../assests/Dashboard/bobopoints.png')}
                />
              </View>
              <View
                style={{
                  height: 80,
                  width: '42%',
                  justifyContent: 'center',
                  marginLeft: 5,
                }}>
                <Text
                  style={{fontWeight: '400', fontSize: 14, color: '#BDBDBD'}}>
                  Total Login Time
                </Text>
                <Text
                  style={{fontWeight: '500', fontSize: 14, color: '#303231'}}>
                  08.00 Hours
                </Text>
              </View>
              <View
                style={{
                  height: 80,
                  width: '40%',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 101,
                    height: 30,
                    backgroundColor: '#F5821F',
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 20,
                  }}>
                  <Text
                    style={{color: '#fff', fontSize: 12, fontWeight: '500'}}>
                    Daily Check-In
                  </Text>
                </View>
              </View>
            </View>

            <Image
              source={require('../../assests/Dashboard/Rectangle457.png')}
            />

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
                height: 35,
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Productsubcategory')}>
                <Image
                  source={require('../../assests/Dashboard/iconlist.png')}
                />
              </TouchableOpacity> */}
              {/* <Text style={{fontSize: 14, fontWeight: '500', marginLeft: 20}}>
                Category
              </Text> */}
            </View>
            <View style={{width: '100%', height: 70, justifyContent: 'center'}}>
              <FlatList
                data={MainCategory.data}
                keyExtractor={item => item.URL.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Productsubcategory', {
                        Maincat_id: item.URL,
                      })
                    }
                    style={{
                      height: 66,
                      borderWidth: 1,
                      width: 100,
                      borderColor: '#E8E8E8',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      marginLeft: 20,
                      marginTop: 1,
                    }}>
                    <Image
                      style={{height: 35, width: 35}}
                      source={{uri: item.ImgIcon}}
                      // source={require('../../assests/Dashboard/drinkable1.png')}
                    />
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 10,
                        color: '#CBCBCB',
                      }}>
                      {item.Name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View
              style={{
                height: 120,
                width: '100%',
                paddingHorizontal: 10,
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  height: 70,
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    height: 70,
                    width: '30%',
                    borderTopStartRadius: 20,
                    borderBottomStartRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 2,
                  }}>
                  <Text
                    style={{color: '#000000', fontSize: 22, fontWeight: '700'}}>
                    {loginData?.data?.todayCheckins}
                  </Text>
                  <Text
                    style={{color: '#CBCBCB', fontSize: 12, fontWeight: '700'}}>
                    Total
                  </Text>
                </View>

                <TouchableOpacity
                onPress={()=>navigation.navigate('CheckInList')}
                  style={{
                    backgroundColor: '#FFB7B7',
                    height: 70,
                    width: '70%',
                    borderTopEndRadius: 20,
                    borderBottomEndRadius: 20,
                    flexDirection: 'row',
                    elevation: 2,
                  }}>
                  <View
                    style={{
                      height: 70,
                      width: '75%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontWeight: '700',
                        fontSize: 16,
                        marginLeft: 15,
                      }}>
                      Today Check in
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 70,
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assests/Dashboard/bigarrow.png')}
                    />
                  </View>
                </TouchableOpacity>



              </View>

              {/* <View
                style={{
                  height: 70,
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    height: 70,
                    width: '30%',
                    borderTopStartRadius: 20,
                    borderBottomStartRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 2,
                  }}>
                  <Text
                    style={{color: '#000000', fontSize: 22, fontWeight: '700'}}>
                    0
                  </Text>
                  <Text
                    style={{color: '#CBCBCB', fontSize: 12, fontWeight: '700'}}>
                    Primary Order
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#84E0D5',
                    height: 70,
                    width: '70%',
                    borderTopEndRadius: 20,
                    borderBottomEndRadius: 20,
                    flexDirection: 'row',
                    elevation: 2,
                  }}>
                  <View
                    style={{
                      height: 70,
                      width: '75%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontWeight: '700',
                        fontSize: 16,
                        marginLeft: 15,
                      }}>
                      Create Primary Order
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 70,
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assests/Dashboard/bigarrow.png')}
                    />
                  </View>
                </View>
              </View> */}

              {/* <View
                style={{
                  height: 70,
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    height: 70,
                    width: '30%',
                    borderTopStartRadius: 20,
                    borderBottomStartRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 2,
                  }}>
                  <Text
                    style={{color: '#000000', fontSize: 22, fontWeight: '700'}}>
                    0
                  </Text>
                  <Text
                    style={{color: '#CBCBCB', fontSize: 12, fontWeight: '700'}}>
                    Today Check in
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#FFB7B7',
                    height: 70,
                    width: '70%',
                    borderTopEndRadius: 20,
                    borderBottomEndRadius: 20,
                    flexDirection: 'row',
                    elevation: 2,
                  }}>
                  <View
                    style={{
                      height: 70,
                      width: '75%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontWeight: '700',
                        fontSize: 16,
                        marginLeft: 15,
                      }}>
                      Create Secondary Order
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 70,
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assests/Dashboard/bigarrow.png')}
                    />
                  </View>
                </View>
              </View> */}
            </View>

            <View
              style={{
                paddingHorizontal: 50,
                height: 50,
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: '500', fontSize: 14, color: '#303231'}}>
                Connection
              </Text>
            </View>

            <View
              style={{
                height: 120,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  width: '30%',
                  height: 110,
                  backgroundColor: '#ffffff',
                  borderRadius: 15,
                  elevation: 4,
                }}>
                <View
                  style={{
                    height: 45,
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '40%', height: 45}}>
                    <View
                      style={{
                        height: 32,
                        width: 34,
                        backgroundColor: '#86D6FF',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 5,
                        marginLeft: 5,
                      }}>
                      <Image
                        source={require('../../assests/Dashboard/plant.png')}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      width: '60%',
                      height: 45,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assests/Dashboard/arrow-up-green.png')}
                    />
                    <Text
                      style={{
                        color: '#00BB29',
                        fontSize: 12,
                        fontWeight: '500',
                      }}>
                      4.80%
                    </Text>
                  </View>
                </View>

                <View
                  style={{height: 65, width: '100%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                      color: '#242132',
                      marginLeft: 5,
                    }}>
                    Channel Partner
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#888888',
                      marginLeft: 5,
                    }}>
                    02
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: '30%',
                  height: 110,
                  backgroundColor: '#ffffff',
                  borderRadius: 15,
                  elevation: 4,
                }}>
                <View
                  style={{
                    height: 45,
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '40%', height: 45}}>
                    <View
                      style={{
                        height: 32,
                        width: 34,
                        backgroundColor: '#86D6FF',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 5,
                        marginLeft: 5,
                      }}>
                      <Image
                        source={require('../../assests/Dashboard/plant.png')}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      width: '60%',
                      height: 45,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assests/Dashboard/arrow-up-green.png')}
                    />
                    <Text
                      style={{
                        color: '#00BB29',
                        fontSize: 12,
                        fontWeight: '500',
                      }}>
                      4.80%
                    </Text>
                  </View>
                </View>

                <View
                  style={{height: 65, width: '100%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                      color: '#242132',
                      marginLeft: 5,
                    }}>
                    Channel Partner
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#888888',
                      marginLeft: 5,
                    }}>
                    02
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: '30%',
                  height: 110,
                  backgroundColor: '#ffffff',
                  borderRadius: 15,
                  elevation: 4,
                }}>
                <View
                  style={{
                    height: 45,
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '40%', height: 45}}>
                    <View
                      style={{
                        height: 32,
                        width: 34,
                        backgroundColor: '#86D6FF',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 5,
                        marginLeft: 5,
                      }}>
                      <Image
                        source={require('../../assests/Dashboard/plant.png')}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      width: '60%',
                      height: 45,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assests/Dashboard/arrow-up-green.png')}
                    />
                    <Text
                      style={{
                        color: '#00BB29',
                        fontSize: 12,
                        fontWeight: '500',
                      }}>
                      4.80%
                    </Text>
                  </View>
                </View>

                <View
                  style={{height: 65, width: '100%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                      color: '#242132',
                      marginLeft: 5,
                    }}>
                    Channel Partner
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#888888',
                      marginLeft: 5,
                    }}>
                    02
                  </Text>
                </View>
              </View>
            </View>

            <View style={{justifyContent: 'flex-end'}}>
              <Image
                style={{width: 428, height: 50}}
                source={require('../../assests/SplashScreen/Vector_14.png')}
              />
            </View>
          </ScrollView>

        </View>
      </View>
    </Layout>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  ActivityLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
