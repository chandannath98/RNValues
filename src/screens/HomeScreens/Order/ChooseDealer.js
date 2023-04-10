import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
const ChooseDealer = ({navigation}) => {
  const DealerList = useSelector(state => state.dealerlist.DealerListData);

  const openDialScreen = phone => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:${' + phone + '}';
    } else {
      number = 'tel:${' + phone + '}';
    }
    Linking.openURL(number);
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
              Choose Customer
            </Text>
          </View>
        </View>
      </ImageBackground>
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
              data={DealerList?.data}
              numColumns={1}
              //  keyExtractor={item => item.ID.toString()}
              // ItemSeparatorComponent={() => Separator()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("CheckIn",{itemId:item.ID})}
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
                        item.LegalName.length < 18 ?
                        item.LegalName.substring(0, 18):
                        item.LegalName.substring(0, 18)+".."
                        }
                      </Text>
                      {/* <Text
                        style={{
                          color: '#BDBDBD',
                          fontSize: 12,
                          fontWeight: '500',
                        }}>
                        GST NO- {item.GSTIN}
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
                        alignItems:'center',
                        flexDirection:'row-reverse'
                     
                      }}>
                      <TouchableOpacity
                        onPress={() => openDialScreen(item.CRMPhone)}>
                        <Text
                          style={{
                            color: '#00A9FF',
                            fontSize: 12,
                            fontWeight: '500',
                            textDecorationLine: 'underline',
                            marginRight:25
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
