import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  ScrollView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import * as actions from '../../../redux/actions/authaction';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../utils/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';
import moment from "moment";

const FinalOrder = ({navigation}) => {
   
const [paymenttype,setpaymenttype] = useState('');

const data = [
  {key:'0', value:'No'},
  {key:'1', value:'Yes'},
]

const Productdownlist = useSelector(
    state => state.productSub.shareestimateaccountlist,
  );

  useEffect(() =>
  
  dropdowngetfunc()

  ,[])
  const [Accountants,setAccountants] = useState('');
  const [PaymentTerms,setPaymentTerms] = useState('');
  const [subcattype, setsubcattype] = useState([]);

  
  const dropdowngetfunc =() =>{
    let newArray = Productdownlist?.data?.Accountants.map((item,index) => {
      return {key: item.id, value: item.name}
    })
    //Set Data Variable
    setAccountants(newArray)
    let newArraycattype = Productdownlist?.data?.PaymentTerms.map((item,index) => {
      return {key: item, value: item}
    })
    //Set Data Variable
    setsubcattype(newArraycattype)

    // let newArraysubcattype = expansedropdownlist?.data?.types.map((item,index) => {
    //   return {key: item, value: item}
    // })
    // //Set Data Variable
    // setsubcattype(newArraysubcattype)

    
  }

  const estimateId = Productdownlist?.data?.FullEstimateDetail?.estimating_id;

  const dispatch = useDispatch();
  const handleFinalorder = data => dispatch(actions.handleFinalorder({data, navigation,estimateId}));

const finalsender = () => {
    const data = {
        account_id:Accountants,
        payment_status:paymenttype,
        payment_terms:PaymentTerms,
    }
    handleFinalorder(data);

}
var createdDate = moment(Productdownlist?.data?.FullEstimateDetail?.created_at).format('DD-MM-YYYY');

const loginData = useSelector(state => state.auth.loginData);

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
              Order
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={{flex: 0.91}}>
        <View style={{height: '100%', width: '100%',flexDirection:'column-reverse',alignItems:'flex-end'}}>
         
          <View
            style={{
              height: '100%',
              width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 10,
              
            }}>
              <ScrollView>
              <View style={{height:140,width:'100%',backgroundColor:'#fff',borderRadius:10,elevation:5,paddingVertical:5}}>
            <View style={{height:20,width:'100%',flexDirection:'row-reverse',paddingHorizontal:10}}>
              <Text style={{fontSize:12}}>Order Created Date : {createdDate}</Text>
            </View>
            <View style={{flexDirection:'row',height:90,width:'100%'}}>
              <View style={{height:90,width:'25%',justifyContent:'center',alignItems:'center'}}> 
              <View style={{height:60,width:60,backgroundColor:'#F2F2F2',borderRadius:60*2,
              borderWidth:1,borderColor:'#00BB29',justifyContent:'center',alignItems:'center'}}>
                <Image
                source={require('../../../assests/username.png')}
                />
              </View>
              </View>

              <View style={{height:90,width:'50%',justifyContent:'center',}}>
                <Text style={{fontSize:14}}>{Productdownlist?.data?.FullEstimateDetail?.estimate_name}</Text>
              </View>
              <View style={{height:90,width:'25%',justifyContent:'space-around'}}>
                <Text style={{fontSize:12}}>{Productdownlist?.data?.FullEstimateDetail?.estimating?.status}</Text>
                <Text style={{fontSize:10}}>GHAZIABAD</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',width:'100%',
            justifyContent:'space-around',height:25,alignItems:'center'}}>
              <View >
                <Text style={{fontSize:10}}>Order Created By : {loginData.data.Name}</Text>
              </View>
              <View>
                <Text style={{fontSize:14}}>₹{Productdownlist?.data?.FullEstimateDetail?.grand_total}</Text>
              </View>
          
            </View>
           

              </View>
              <View style={{width:'100%',marginTop:20}}>
                <Text style={{fontWeight:'500'}}>ESTIMATE NUMBER</Text>
                <Text>{Productdownlist?.data?.FullEstimateDetail?.estimate_number}</Text>
                <Image
                source={require('../../../assests/Line.png')}
                style={{width:'100%'}}
                />
              </View>
              <View style={{width:'100%',marginTop:20}}>
                <Text style={{fontWeight:'500'}}>PROFORMA INVOICE</Text>
                <Image
                source={require('../../../assests/Line.png')}
                style={{width:'100%',marginTop:20}}
                />
              </View>
              <View style={{width:'100%',marginTop:20}}>
                <Text style={{fontWeight:'500',fontSize:14}}>IF PAYMENT IN CREDIT SELECT NO.</Text>
              </View>

              <View style={{width: '100%', marginTop: 20}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                     Status
                    </Text>
                    <SelectList setSelected={setpaymenttype} data={data}

                    />
                  </View>
                  <View style={{width: '100%', marginTop: 20}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                     Payment credit %
                    </Text>
                    <SelectList setSelected={val => setPaymentTerms(val)} data={subcattype}
                    
                    />
                  </View>
                  <View style={{width: '100%', marginTop: 20}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                     Select Acountant
                    </Text>
                    <SelectList  setSelected={val => setAccountants(val)} data={Accountants}
                    
                    />
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
                    onPress={()=>finalsender()}
                    style={{height:30,width:180,
                      backgroundColor:'#00BB29',borderRadius:8,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{color:'#fff'}}>Confirm & Download</Text>
                    </TouchableOpacity>

                  </View>
              </ScrollView>

          </View>
  
        </View>
      </View>
    </View>
  );
};

export default FinalOrder;
