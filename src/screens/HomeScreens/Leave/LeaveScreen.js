import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';

const LeaveScreen = ({ navigation }) => {
  const loginData = useSelector(state => state.auth.loginData);
  useEffect(() => {
    SendToDataleave();
  }, [])

  const isLoading = useSelector(state => state.loader.isLoading);
  const dispatch = useDispatch();
  const handleLeaveStatus = data => dispatch(actions.handleLeaveStatus({ data, navigation }));
  const SubmitLeave = () => {
    handleLeaveStatus();
  }
  const handleLeaveCount = data => dispatch(actions.handleLeaveCount({ data, navigation }));

  const SendToDataleave = () => {
    const data = {
      userid: loginData.data.ID
    }
    handleLeaveCount(data)
  }

  const leavelist = useSelector(state => state.leavemanage.LeaveCountListData);


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Loader loading={isLoading} />
      <ImageBackground
        style={{ height: 60, width: '100%' }}
        source={require('../../../assests/Dashboard/UserloginBG.png')}>
        <View style={{ height: 60, width: '100%', flexDirection: 'row' }}>
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
          <View style={{ width: '55%', height: 60, justifyContent: 'center' }}>
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

      {!leavelist ?
        <View style={{ width: '100%', height: '85%', alignItems: 'center' }}>
          <View
            style={{
              width: '100%',
              height: '75%',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assests/Dashboard/leaveBackground.png')}
            />
          </View>
          <View
            style={{
              width: '90%',
              height: '25%',
              // backgroundColor:'red',
              flexDirection: 'row-reverse',
              alignItems: 'flex-end'

            }}>
            <TouchableOpacity
              onPress={() => SubmitLeave()}
              style={{ width: 100, justifyContent: 'center', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="plus-circle" size={50} color="#007DFE" />
              <Text style={{ fontSize: 14, fontWeight: "700", color: '#747070' }}>Add Leave</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={{ width: '100%', height: '85%', paddingHorizontal:10 }}>
         <FlatList
              data={leavelist?.data}
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
                      paddingVertical:10,
                      paddingHorizontal:10,
                      borderRadius:10,
                     // borderWidth:1
                    }}>
                      
                      <View style={{flexDirection:'row',width:'100%'}}>
                        <View style={{width:'40%'}}>
                        <Text style={{color:'#000000',fontSize:15,fontWeight:'500'}}>Reason  :- </Text>
                        </View>
                        <View style={{width:'60%'}}>
                        <Text style={{color:'#000000',fontSize:15,fontWeight:'400'}}>{item.Reason}</Text>
                        </View>
                      </View>
                      <View style={{flexDirection:'row',width:'100%'}}>
                      <View style={{width:'40%'}}>
                        <Text style={{color:'#000000',fontSize:15,fontWeight:'500'}}>Message  :- </Text>
                        </View>
                        <View style={{width:'60%'}}>
                        <Text style={{color:'#000000',fontSize:15,fontWeight:'400'}}>{item.Message}</Text>
                        </View>
                      </View>
        

                      <View style={{flexDirection:'row',width:'100%'}}>
                      <View style={{width:'40%'}}>
                        <Text style={{color:'#000000',fontSize:15,fontWeight:'500'}}>Approved By  :- </Text>
                        </View>
                        <View style={{width:'60%'}}>
                        <Text style={{color:'#000000',fontSize:15,fontWeight:'400'}}>{item.ApprovedBy}</Text>
                        </View>
                      </View>
                      <View style={{flexDirection:'row',width:'100%'}}>
                      <View style={{width:'40%'}}>
                        <Text style={{color:'#000000',fontSize:15,fontWeight:'500'}}>Date Start to end  :- </Text>
                        </View>
                        <View style={{width:'60%'}}>
                        <Text style={{color:'#000000',fontSize:15,fontWeight:'400'}}>{item.LeaveStartAt} to {item.LeaveEndAt}</Text>
                        </View>
                      </View>
              
                      <View style={{flexDirection:'row',width:'100%'}}>
                      <View style={{width:'40%'}}>
                        <Text style={{color:'#000000',fontSize:15,fontWeight:'500'}}>Status  :- </Text>
                        </View>
                         <View style={{width:'60%'}}>
                        <Text style={{color:item.Status == "Review" ?'red':'green',fontSize:15,fontWeight:'500'}}>{item.Status}</Text>
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
              alignItems: 'flex-end'

            }}>
            <TouchableOpacity
              onPress={() => SubmitLeave()}
              style={{ width: 100, justifyContent: 'center', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="plus-circle" size={50} color="#007DFE" />
              <Text style={{ fontSize: 14, fontWeight: "700", color: '#747070' }}>Add Leave</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  );
};

export default LeaveScreen;
