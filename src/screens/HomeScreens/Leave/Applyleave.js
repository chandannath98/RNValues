import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Layout from '../../../utils/layout';
import Modal from 'react-native-modal';
import { RadioButton, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import DatePicker from 'react-native-date-picker'
import moment from "moment";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Applyleave = ({ navigation }) => {


  const [isModalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const GetLeaveStatus = useSelector(state => state.leavemanage.LeaveStatusListData);
  const [datestart, setDatestart] = useState(new Date())
  const [openstart, setOpenstart] = useState(false)

  const [dateend, setDateend] = useState(new Date())
  const [openend, setOpenend] = useState(false)
  const [ApprovedBy, setApprovedBy] = useState(false)
  const [Message, setMessage] = useState("");

  const loginData = useSelector(state => state.auth.loginData);
  var dateformatestart = moment(datestart).format('DD-MM-YYYY');
  var dateformateend = moment(dateend).format('DD-MM-YYYY');
  const isLoading = useSelector(state => state.loader.isLoading);

  const dispatch = useDispatch();
  const handleLeaveCreate = data => dispatch(actions.handleLeaveCreate({ data, navigation }));
  
  const [channeltypeerror, setchanneltypeerror] = useState("");
    const [categorylevelerror, setcategorylevelerror] = useState("");
    const [customernameerror, setcustomernameerror] = useState("");
    const [customeremailerror, setcustomeremailerror] = useState("");
    const [customerphoneerror, setcustomerphoneerror] = useState("");
  const handleSubmit = async () => {

    var reg =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  

    var valueValid = false;
    if (value.length === 0) {
        setchanneltypeerror("The subject field is required.*");
    } else {
        setchanneltypeerror('');
        valueValid = true;
    }

    var MessageValid = false;
    if (Message.length === 0) {
        setcategorylevelerror("The Message field is required.*");
    } else {
        setcategorylevelerror('');
        MessageValid = true;
    }

    var ApprovedByValid = false;
    if (ApprovedBy.length === 0) {
        setcustomernameerror("The Approved By field is required.*");
    } else {
        setcustomernameerror('');
        ApprovedByValid = true;
    }

 
    if (valueValid && MessageValid && ApprovedByValid
    ) {
      const data = {
        leaveable_id: loginData.data.ID,
        reason: value,
        message: Message,
        approvedBy: ApprovedBy,
        start_at: datestart,
        end_at: dateend,
      };
      handleLeaveCreate(data);
        
    }

}

  // const SubmitLeave = () => {
   
  // }

  

  //   const Attendancelist = useSelector(state => state.leavemanage.LeaveCreateListData);
  //  console.log('Attendancelist===',Attendancelist);
  return (
    <Layout>
      <Loader loading={isLoading} />
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../../assests/MainLogin/image2.png')}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          resizeMode="cover">
          <KeyboardAwareScrollView>
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
                <View
                  style={{ width: '55%', height: 60, justifyContent: 'center' }}>
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
              </View>
            </ImageBackground>
            <View
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
               
              }}>
              <View
                style={{
                  width: '100%',
                  height: 500,
                  backgroundColor: '#fff',
                  borderRadius: 15,
                  marginTop: 10,
                  paddingVertical:20
                }}>
                  <ScrollView>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                    
                  }}>
                  <Image
                    source={require('../../../assests/Product4.png')}
                    style={{ marginLeft: 15 }}
                  />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: 12, fontWeight: '500' }}>
                      {loginData.data.Name}
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>
                      APPLY ON LEAVE
                    </Text>
                  </View>
                </View>
                <Image source={require('../../../assests/Line1.png')} />
                <View style={{ width: '100%', paddingHorizontal: 15 }}>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{ color: '#BDBDBD', fontSize: 12, fontWeight: '500' }}>
                      Subject
                    </Text>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => toggleModal()}
                      style={{
                        width: '100%',
                        height: 48,
                        backgroundColor: '#F2F2F2',
                        borderRadius: 8,
                        justifyContent: 'center',
                      }}>
                      <Text style={{ marginLeft: 10 }}>{value}</Text>
                    </TouchableOpacity>
                    {channeltypeerror.length > 0 ? (
                            <Text style={{
                                color: "red",

                            }}>{channeltypeerror}</Text>
                        ) : null}
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{ color: '#BDBDBD', fontSize: 12, fontWeight: '500' }}>
                      Leave Start date
                    </Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => setOpenstart(true)}
                      style={{
                        width: '100%',
                        height: 48,
                        backgroundColor: '#F2F2F2',
                        borderRadius: 8,
                        justifyContent: 'center'
                      }}>
                      <Text style={{ marginLeft: 10 }}>{dateformatestart}</Text>
                    </TouchableOpacity>
                  </View>
                  <DatePicker
                    modal
                    mode='date'
                    open={openstart}
                    date={datestart}
                    onConfirm={(datestart) => {
                      setOpenstart(false)
                      setDatestart(datestart)
                    }}
                    onCancel={() => {
                      setOpenstart(false)
                    }}
                  />

                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{ color: '#BDBDBD', fontSize: 12, fontWeight: '500' }}>
                      Leave End date
                    </Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => setOpenend(true)}
                      style={{
                        width: '100%',
                        height: 48,
                        backgroundColor: '#F2F2F2',
                        borderRadius: 8,
                        justifyContent: 'center'
                      }}>
                      <Text style={{ marginLeft: 10 }}>{dateformateend}</Text>
                    </TouchableOpacity>
                  </View>
                  <DatePicker
                    modal
                    mode='date'
                    open={openend}
                    date={dateend}
                    onConfirm={(dateend) => {
                      setOpenend(false)
                      setDateend(dateend)
                    }}
                    onCancel={() => {
                      setOpenend(false)
                    }}
                  />

                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{ color: '#303231', fontSize: 14, fontWeight: '500' }}>
                      Message
                    </Text>
                    
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <TextInput
                      onChangeText={text => setMessage(text)}
                      maxLength={50}
                      value={Message}
                      style={{
                        width: '100%',
                        height: 60,
                        backgroundColor: '#F2F2F2',
                        borderRadius: 8,
                      }} />
                      {categorylevelerror.length > 0 ? (
                            <Text style={{
                                color: "red",

                            }}>{categorylevelerror}</Text>
                        ) : null}
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{ color: '#303231', fontSize: 14, fontWeight: '500' }}>
                      Approved By
                    </Text>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <TextInput
                      onChangeText={text => setApprovedBy(text)}
                      maxLength={50}
                      value={ApprovedBy}
                      style={{
                        width: '100%',
                        height: 60,
                        backgroundColor: '#F2F2F2',
                        borderRadius: 8,
                      }} />
                      {categorylevelerror.length > 0 ? (
                            <Text style={{
                                color: "red",

                            }}>{categorylevelerror}</Text>
                        ) : null}
                  </View>

                  <View style={{ marginTop: 15 }}>
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      style={{
                        width: '100%',
                        height: 48,
                        backgroundColor: '#00A9FF',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>
                        Search
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                </ScrollView>
              </View>
              

















            </View>
          </KeyboardAwareScrollView>
          <Modal isVisible={isModalVisible}>
            <View style={{ flex: 0.8, }}>
              <View
                style={{
                  flex: 0.6,
                  backgroundColor: '#FFFFFF',
                  elevation: 2,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => toggleModal()}
                    style={{ width: '15%', justifyContent: 'center' }}>
                    <Entypo name="cross" size={30} />
                  </TouchableOpacity>
                  <View style={{ width: '85%' }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '500',
                        color: '#000000',
                      }}>
                      Select Leave Type
                    </Text>
                  </View>
                </View>

                <RadioButton.Group
                  onValueChange={newValue => setValue(newValue)}
                  value={value}>

                  {GetLeaveStatus?.types.map((user) => (

                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderColor: '#BDBDBD',
                        marginTop: 10
                      }}>
                      <View style={{ width: '15%', justifyContent: 'center' }}>
                        <RadioButton value={user} />
                      </View>
                      <View style={{ width: '85%', justifyContent: 'center' }}>
                        <Text>{user}</Text>
                      </View>
                    </View>
                  ))}



                  <TouchableOpacity
                    onPress={() => toggleModal()}
                    style={{
                      backgroundColor: '#178025', width: '100%',
                      height: 40, marginTop: 5, borderRadius: 5, justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>Done</Text>
                  </TouchableOpacity>



                </RadioButton.Group>
              </View>
            </View>
          </Modal>

          {/* <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
            <Image
              style={{ width: 428, height: 50, position: 'absolute' }}
              source={require('../../../assests/SplashScreen/Vector_13.png')}
            />
            <Image
              style={{ width: 428, height: 70 }}
              source={require('../../../assests/SplashScreen/Vector_14.png')}
            />
          </View> */}
        </ImageBackground>
      </View>
    </Layout>
  );
};

export default Applyleave;
