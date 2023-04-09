import React,{useState} from 'react';
import { TextInput } from 'react-native';
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
import Layout from '../../../utils/layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';

const CreateCustomer = ({navigation}) => {
const [GSTNO,setGSTNO] = useState("");
// console.log(GSTNO);
  
  const isLoading = useSelector(state => state.loader.isLoading);
  const dispatch = useDispatch();
  const handleGstno = data => dispatch(actions.handleGstno({data, navigation}));
  const getgstno  = () =>{
    const data = {
      id:5,
      email:"sajid@rnvalves.com",
      gstin:GSTNO,

    };
    handleGstno(data);

  }

  return (
    <Layout>
      <Loader loading={isLoading} />
    <View style={{flex: 1, backgroundColor: '#fff'}}>
    <KeyboardAwareScrollView>
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
              <View style={{marginTop:15}}>
                <Text style={{fontSize:28,fontWeight:'600',color:'#000000'}}>Create Customer</Text>
                <Text style={{fontSize:21,fontWeight:'500',marginTop:15}}>Please enter valid gst number to Add Customer</Text>
              </View>
              <View style={{marginTop:30}}>
                <Text style={{fontSize:20,fontWeight:'400'}}>15 Digit GST Number</Text>
                <TextInput
                onChangeText={text => setGSTNO(text)}
                value={GSTNO}
                placeholder='Enter GSTno.'
                style={{borderBottomWidth:1,width:'100%',fontSize:20}}
                />
              </View>
              <TouchableOpacity
              onPress={()=>getgstno()}
             // onPress={()=>navigation.navigate("CreateCustomerDetails")}
              style={{backgroundColor:'#086FB7',width:'100%',
              height:54,marginTop:50,borderRadius:10,justifyContent:'center',alignItems:'center'}}
              >
                <Text style={{fontSize:21,fontWeight:"500",color:'#fff'}}>Next</Text>
              </TouchableOpacity>
           
          </View>
        </View>
      
      </View>
      </KeyboardAwareScrollView>
      
    </View>
    </Layout>
  );
};

export default CreateCustomer;
