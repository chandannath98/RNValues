import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/authaction';
import Loader from '../utils/Loader';
const CustomDrawer = props => {

  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownLeave, setShowDropDownLeave] = useState(false);
  const [showDropDownCustomer, setShowDropDownCustomer] = useState(false);
  const dispatch = useDispatch();
  const LogData = useSelector(state => state.auth.loginData);

  const MainCategory = useSelector(
    state => state.maincategory.MainCategoryData,
  );

  const handleLogOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure want to logout?',
      [
        { text: 'Yes', onPress: () => clearAsync() },
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

  const clearAsync = async () => {
    try {
      const loginData = [];
      // sethide(false)
      dispatch(actions.handleLogout(loginData));

      await AsyncStorage.clear();
    } catch (e) {
      console.log('error in logout', e);
    }
  };
  const isLoading = useSelector(state => state.loader.isLoading);
  const loginData = useSelector(state => state.auth.loginData);


  const handleFollowup = data => dispatch(actions.handleFollowup({data, props}));

  const funcFollowup = () => {
    const data = {
      itemid: loginData.data.ID,
    };
    handleFollowup(data);
  }

  return (
    <View {...props} style={{ flex: 1 }}>
      <Loader loading={isLoading} />
      <ImageBackground
        style={{ height: 85, opacity: 0.8 }}
        source={require('../assests/Dashboard/image62.png')}>
        <View
          style={{
            backgroundColor: '#0066CC',
            height: 85,
            width: '100%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '25%',

              height: 85,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../assests/Dashboard/UserIcon.png')} />
          </View>
          <View
            style={{
              width: '60%',

              height: 85,
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#fff', marginLeft: 5 }}>Hi {LogData?.data?.Name}</Text>
            <Text style={{ color: '#fff', marginLeft: 5 }}>
              {LogData?.data?.Email}
            </Text>
          </View>
          <View
            style={{
              width: '15%',

              height: 85,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../assests/Dashboard/greaterthen.png')} />
          </View>
        </View>
      </ImageBackground>
      <DrawerContentScrollView>
        {/* ##################   1  ######################## */}

        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('Chat')}
          style={{
            height: 60,
            width: '100%',
            // borderWidth: 0.5,
            // borderColor:'#EDEDED',

            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assests/Dashboard/pie-chart2.png')}
              style={{tintColor: '#3E3E3E'}}
            />
          </View>
          <View style={{width: '80%', height: 60, justifyContent: 'center'}}>
            <Text style={{fontWeight: '500', fontSize: 14, color:'#3E3E3E'}}>Catalogue</Text>
          </View>
        </TouchableOpacity> */}
        <View
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', width: '80%', height: 60 }}>
            <View
              style={{
                width: '25%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assests/Dashboard/pie-chart2.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            </View>
            <View style={{ width: '60%', height: 60, justifyContent: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>Category</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowDropDownLeave(!showDropDownLeave)}
            style={{ width: '20%', height: 60, justifyContent: 'center' }}>
            {!showDropDownLeave ? (
              <Image
                source={require('../assests/Dashboard/PlusIcon.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            ) : (
              <Image
                source={require('../assests/Dashboard/down.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* #################### Leave Dropdown ######### */}
        {showDropDownLeave ? (
          <View>
            <FlatList
              data={MainCategory.data}
              keyExtractor={item => item.URL.toString()}
              //horizontal
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
              renderItem={({ item }) => (


                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Productsubcategory', {
                      Maincat_id: item.URL,
                    })
                  }
                  style={{
                    height: 60,
                    width: '100%',
                    borderWidth: 0.5,
                    borderColor: '#EDEDED',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '20%',
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></View>
                  <View
                    style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: '500', fontSize: 14 }}>{item.Name}</Text>
                  </View>
                </TouchableOpacity>

              )}
            />

          </View>
        ) : null}



        {/* ##################   2  ######################## */}
        {/* <TouchableOpacity
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assests/Dashboard/van-truck.png')}
              style={{ tintColor: '#3E3E3E' }}
            />
          </View>
          <View style={{ width: '80%', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>Track Order</Text>
          </View>
        </TouchableOpacity> */}

        {/* ##################   3  ######################## */}

        <View
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("DrawerOrderStack", { itemId: 1 })}

            style={{ flexDirection: 'row', width: '80%', height: 60 }}>
            <View
              style={{
                width: '25%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assests/Dashboard/cart.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            </View>
            <View style={{ width: '60%', height: 60, justifyContent: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>Order</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => setShowDropDown(!showDropDown)}
            style={{ width: '20%', height: 60, justifyContent: 'center' }}>
            {!showDropDown ? (
              <Image
                source={require('../assests/Dashboard/PlusIcon.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            ) : (
              <Image
                source={require('../assests/Dashboard/down.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            )}
          </TouchableOpacity> */}
        </View>

        {/* #################### Order Dropdown ######### */}
        {/* {showDropDown ? (
          <View>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Option 1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Option 2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Option 3</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null} */}



        {/* ##################   4  ######################## */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate("DrawerInsideStack")}
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assests/Dashboard/van-truck.png')}
              style={{ tintColor: '#3E3E3E' }}
            />
          </View>
          <View style={{ width: '80%', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>Leave</Text>
          </View>
        </TouchableOpacity>


         {/* ##################   4  ######################## */}
         <TouchableOpacity
          onPress={() => props.navigation.navigate("ExpenseList")}
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assests/Dashboard/van-truck.png')}
              style={{ tintColor: '#3E3E3E' }}
            />
          </View>
          <View style={{ width: '80%', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>Expense</Text>
          </View>
        </TouchableOpacity>


        {/* <View
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', width: '80%', height: 60}}>
            <View
              style={{
                width: '25%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assests/Dashboard/Group27096.png')}
                style={{tintColor: '#3E3E3E'}}
              />
            </View>
            <View style={{width: '60%', height: 60, justifyContent: 'center'}}>
              <Text style={{fontWeight: '500', fontSize: 14,color:'#3E3E3E'}}>Leave</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowDropDownLeave(!showDropDownLeave)}
            style={{width: '20%', height: 60, justifyContent: 'center'}}>
            {!showDropDownLeave ? (
              <Image
                source={require('../assests/Dashboard/PlusIcon.png')}
                style={{tintColor: '#3E3E3E'}}
              />
            ) : (
              <Image
                source={require('../assests/Dashboard/down.png')}
                style={{tintColor: '#3E3E3E'}}
              />
            )}
          </TouchableOpacity>
        </View> */}

        {/* #################### Leave Dropdown ######### */}
        {/* {showDropDownLeave ? (
          <View>
            <TouchableOpacity

            onPress={()=>props.navigation.navigate("DrawerInsideStack")}
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{width: '80%', height: 60, justifyContent: 'center'}}>
                <Text style={{fontWeight: '500', fontSize: 14}}>Apply For Leave</Text>
              </View>
            </TouchableOpacity>
       

          </View>
        ) : null} */}

        {/* ##################   5  ######################## */}

        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate("DrawerTodayFollowups", props)}
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assests/Dashboard/black-ele.png')}
              style={{ tintColor: '#3E3E3E' }}
            />
          </View>
          <View style={{ width: '80%', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>Target</Text>
          </View>
        </TouchableOpacity> */}

        {/* ##################   6  ######################## */}

        <TouchableOpacity
          //onPress={() => props.navigation.navigate("DrawerTodayFollowups")}
          onPress={() => funcFollowup()}
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assests/Dashboard/Group26689.png')}
              style={{ tintColor: '#3E3E3E' }}
            />
          </View>
          <View style={{ width: '80%', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>Today Followups</Text>
          </View>
        </TouchableOpacity>


        {/* ##################   7  ######################## */}

        <View
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', width: '80%', height: 60 }}>
            <View
              style={{
                width: '25%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 25 * 2,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#3E3E3E'
                }}>
                <Image
                  source={require('../assests/Dashboard/Group26689.png')}
                  style={{ tintColor: '#3E3E3E' }}
                />
              </View>
            </View>
            <View style={{ width: '60%', height: 60, justifyContent: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>Customer</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowDropDownCustomer(!showDropDownCustomer)}
            style={{ width: '20%', height: 60, justifyContent: 'center' }}>
            {!showDropDownCustomer ? (
              <Image
                source={require('../assests/Dashboard/PlusIcon.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            ) : (
              <Image
                source={require('../assests/Dashboard/down.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* #################### Account Dropdown ######### */}
        {showDropDownCustomer ? (
          <View>
            <TouchableOpacity
              // onPress={() => FunMyCustomer()}
              onPress={() => props.navigation.navigate("DrawerOrderStack", { itemId: 2 })}
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>My Customer</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("DrawerOrderStack", { itemId: 3 })}
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Area Customer</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CustomerStack')}
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Add New Customer</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('DrawerCheckinStack')}
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Check-in Customers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CustomerOrderList')}
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Customer Order List</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* 
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CustomerStack')}
          style={{
            height: 60,
            width: '100%',
            // borderWidth: 0.5,
            // borderColor:'#EDEDED',

            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assests/Dashboard/pie-chart2.png')}
              style={{ tintColor: '#3E3E3E' }}
            />
          </View>
          <View style={{ width: '80%', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>Customers</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('CustomerStack')}
          style={{
            height: 60,
            width: '100%',
            // borderWidth: 0.5,
            // borderColor:'#EDEDED',

            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assests/Dashboard/pie-chart2.png')}
              style={{ tintColor: '#3E3E3E' }}
            />
          </View>
          <View style={{ width: '80%', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>My Account</Text>
          </View>
        </TouchableOpacity> */}

        {/* ##################   8  ######################## */}

        {/* <View
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', width: '80%', height: 60 }}>
            <View
              style={{
                width: '25%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 25 * 2,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#3E3E3E'
                }}>
                <Image
                  source={require('../assests/Dashboard/Group26689.png')}
                  style={{ tintColor: '#3E3E3E' }}
                />
              </View>
            </View>
            <View style={{ width: '60%', height: 60, justifyContent: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>My Account</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowDropDown(!showDropDown)}
            style={{ width: '20%', height: 60, justifyContent: 'center' }}>
            {!showDropDown ? (
              <Image
                source={require('../assests/Dashboard/PlusIcon.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            ) : (
              <Image
                source={require('../assests/Dashboard/down.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            )}
          </TouchableOpacity>
        </View> */}

        {/* #################### Account Dropdown ######### */}
        {/* {showDropDown ? (
          <View>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Option 1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Option 2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Option 3</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null} */}

        {/* ################### dropdown close################ */}

        {/* ##################   9   ######################## */}

        {/* <View
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', width: '80%', height: 60 }}>
            <View
              style={{
                width: '25%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>

              <Image
                source={require('../assests/Dashboard/Group27093.png')}
                style={{ tintColor: '#3E3E3E', height: 25, width: 25 }}
              />

            </View>
            <View style={{ width: '60%', height: 60, justifyContent: 'center' }}>
              <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>Help & Support</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowDropDown(!showDropDown)}
            style={{ width: '20%', height: 60, justifyContent: 'center' }}>
            {!showDropDown ? (
              <Image
                source={require('../assests/Dashboard/PlusIcon.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            ) : (
              <Image
                source={require('../assests/Dashboard/down.png')}
                style={{ tintColor: '#3E3E3E' }}
              />
            )}
          </TouchableOpacity>
        </View> */}

        {/* #################### Account Dropdown ######### */}
        {showDropDown ? (
          <View>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Option 1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Option 2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                borderWidth: 0.5,
                borderColor: '#EDEDED',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
              <View
                style={{ width: '80%', height: 60, justifyContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 14 }}>Option 3</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}


        {/* #########################  10  ##################### */}
        <TouchableOpacity
          onPress={() => handleLogOut()}
          style={{
            height: 60,
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#EDEDED',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',

            }}>
            <Image
              source={require('../assests/Dashboard/Frame.png')}
              style={{ tintColor: '#3E3E3E' }}
            />

          </View>
          <View style={{ width: '80%', height: 60, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 14, color: '#3E3E3E' }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>


      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;






