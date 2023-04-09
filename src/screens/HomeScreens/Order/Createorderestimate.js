import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  LogBox,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';

const Createorderestimate = ({navigation}) => {
  const Productdownlist = useSelector(
    state => state.productSub.estimatestatuslist,
  );
  const estimateData = useSelector(
    state => state.productSub.ProductcreatenewData,
  );

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const confirmestimate = estimateData?.data[0]?.EstimateId;


  const Closefunc = () =>{
    toggleModal();
    handleshareestimateaccount();
  }

  const dispatch = useDispatch();
  const handleshareestimateaccount = data =>
  dispatch(actions.handleshareestimateaccount({confirmestimate, navigation}));


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
          <View style={{width: '100%', height: 60, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '400',
                color: '#fff',
                marginLeft: 15,
              }}>
              Create Order
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={{flex: 0.91}}>
        <View style={{flex: 0.85, paddingHorizontal: 10, marginTop: 5}}>
          <View
            style={{
              height: 300,
              width: '100%',
              backgroundColor: '#fff',
              marginTop: 10,
            }}>
            <FlatList
              data={estimateData?.data}
              numColumns={1}
              //keyExtractor={item => item.Article.toString()}
              // ItemSeparatorComponent={() => Separator()}
              renderItem={({item}) => (
                <TouchableOpacity
                  //  onPress={() => deletefunc(item.EstimateId, item.PId)}
                  style={{
                    height: 55,
                    width: '100%',
                    backgroundColor: '#fff',
                    marginBottom: 10,
                    elevation: 3,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#00A9FF',
                    borderRadius: 5,
                    flexDirection: 'row',
                    paddingVertical: 5,
                  }}>
                  {console.log('....................', item)}
                  <View
                    style={{
                      width: '60%',
                      height: 50,
                      justifyContent: 'center',
                      paddingHorizontal: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        color: '#000000',
                      }}>
                      {item.ProductName.length < 30
                        ? item.ProductName.substring(0, 30)
                        : item.ProductName.substring(0, 30) + '..'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '500',
                        color: '#000000',
                      }}>
                      {item.ProductCode} - {item.ProductSize}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '500',
                        color: '#000000',
                      }}></Text>
                  </View>
                  <View
                    style={{
                      width: '40%',
                      height: 50,
                      justifyContent: 'center',
                      paddingHorizontal: 5,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        color: '#000000',
                      }}>
                      QTY - {item.TotalQTY}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        color: '#000000',
                      }}>
                      Total - {item.TotalAmount}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Text>Subtotal</Text>
              <Text>
                ₹{Productdownlist?.data?.FullEstimateDetails?.sub_total}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Text>Discount (18%)</Text>
              <Text>
                ₹{Productdownlist?.data?.FullEstimateDetails?.total_discount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Text>Tax(18%)</Text>
              <Text>
                ₹{Productdownlist?.data?.FullEstimateDetails?.total_tax}
              </Text>
            </View>
            <Image
              source={require('../../../assests/divider.png')}
              style={{width: '100%'}}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Text>Subtotal</Text>
              <Text>
                ₹ {Productdownlist?.data?.FullEstimateDetails?.grand_total}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.15,
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => toggleModal()}
            style={{
              width: '100%',
              height: 48,
              backgroundColor: '#00A9FF',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 15, fontWeight: '500'}}>
              CREATE ORDER
            </Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={isModalVisible}>
          <View style={{flex: 0.8}}>
            <View
              style={{
                //  flex: 0.6,
                backgroundColor: '#FFFFFF',
                elevation: 2,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <View
                style={{width: '100%', flexDirection: 'row', marginBottom: 10}}>
                <View style={{width: '85%', justifyContent: 'center'}}>
                  <Text style={{fontSize: 25, fontWeight: '600'}}>Create Order</Text>
                </View>
              
                {/* <TouchableOpacity
                    onPress={() => toggleModal()}
                    style={{width: '15%'}}>
                    <Entypo name="cross" size={50} />
                  </TouchableOpacity> */}
              </View>
              <View style={{width:'100%',paddingHorizontal:30}}>
                  <Text style={{fontSize:20,textAlign:'center'}}>Do you want to create order for this check in</Text>
                </View>
                <View style={{width:'100%',paddingVertical:30,flexDirection:'row',justifyContent:'flex-end'}}>
                    <TouchableOpacity 
                    onPress={()=>navigation.popToTop()}
                    style={{height:30,width:60,
                      backgroundColor:'#BB0000',borderRadius:8,justifyContent:'center',alignItems:'center',
                      marginRight:10
                      }}>
                      <Text style={{color:'#fff'}}>No</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>Closefunc()}
                    style={{height:30,width:60,
                      backgroundColor:'#00BB29',borderRadius:8,justifyContent:'center',
                      alignItems:'center',marginRight:10}}>
                      <Text style={{color:'#fff'}}>Yes</Text>
                    </TouchableOpacity>

                  </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default Createorderestimate;
