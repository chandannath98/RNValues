import React, { useState ,useEffect } from 'react';
import { TextInput, ScrollView } from 'react-native';
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
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../utils/layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';

const CreateCustomerDetails = ({ navigation }) => {
  const GstnoListData = useSelector(state => state.Customerlist.GstnoListData);
 useEffect(()=>{
  handleCreateCustomer();
 },[])


 const isLoading = useSelector(state => state.loader.isLoading);
 const dispatch = useDispatch();
 const handleCreateCustomer = data => dispatch(actions.handleCreateCustomer({data, navigation}));
  return (
    <Layout>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <KeyboardAwareScrollView>
          <ImageBackground
            style={{ flex: 0.09 }}
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
                  Create Customer
                </Text>
              </View>
            </View>
          </ImageBackground>

          <View style={{ flex: 0.91, paddingHorizontal: 15, paddingVertical: 10 }}>
            <ScrollView style={{ flex: 0.91 }}>
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: "#000000", fontSize: 25, fontWeight: "600" }}>Create Customer</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Customer GST no.</Text>
              </View>
              <View
                style={{ height: 35, width: '100%',
                 borderWidth: 1, borderColor: '#0085FF', marginTop: 10,
                  borderRadius: 5,justifyContent:'center' }}
              >
                <Text style={{color:'#000000',fontSize:14,fontWeight:'400',marginLeft:10}}>{GstnoListData?.data?.gstin}</Text>
              </View>

              <View style={{ marginTop: 20, flexDirection: 'row', width: '100%' }}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Pincode</Text>
                  
                  <View
                style={{ height: 35, width: '95%',
                 borderWidth: 1, borderColor: '#0085FF', marginTop: 10,
                  borderRadius: 5,justifyContent:'center' }}
              >
                <Text style={{color:'#000000',fontSize:14,fontWeight:'400',marginLeft:10}}>
                  {GstnoListData?.data?.pradr?.addr?.pncd}</Text>
              </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>State</Text>
                  <View
                style={{ height: 35, width: '95%',
                 borderWidth: 1, borderColor: '#0085FF', marginTop: 10,
                  borderRadius: 5,justifyContent:'center' }}
              >
                <Text style={{color:'#000000',fontSize:14,fontWeight:'400',marginLeft:10}}>
                  {GstnoListData?.data?.pradr?.addr?.stcd}</Text>
              </View>
                </View>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Address</Text>
              </View>
              <View 
               style={{ height: 75, width: '100%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
              >
                <Text style={{color:'#000000',fontSize:14,fontWeight:'400',marginLeft:10}}>{GstnoListData?.data?.pradr?.addr?.bnm  + " " + GstnoListData?.data?.pradr?.addr?.flno + " " + GstnoListData?.data?.pradr?.addr?.bno 
                +  " " + GstnoListData?.data?.pradr?.addr?.loc + " " + GstnoListData?.data?.pradr?.addr?.dst
                }</Text>
                
              </View>

              <View style={{ marginTop: 20, flexDirection: 'row', width: '100%' }}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Legal Name</Text>
                  <View
                style={{ height: 35, width: '95%',
                 borderWidth: 1, borderColor: '#0085FF', marginTop: 10,
                  borderRadius: 5,justifyContent:'center' }}
              >
                <Text style={{color:'#000000',fontSize:14,fontWeight:'400',marginLeft:10}}>
                  {GstnoListData?.data?.lgnm}</Text>
              </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Trade Name</Text>
                  <View
                style={{ height: 35, width: '95%',
                 borderWidth: 1, borderColor: '#0085FF', marginTop: 10,
                  borderRadius: 5,justifyContent:'center' }}
              >
                <Text style={{color:'#000000',fontSize:8,fontWeight:'400',marginLeft:10}}>
                  {GstnoListData?.data?.tradeNam}</Text>
              </View>
                </View>
              </View>

              <View style={{ marginTop: 20, flexDirection: 'row', width: '100%' }}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Business Nature</Text>
                  <View
                style={{ height: 35, width: '95%',
                 borderWidth: 1, borderColor: '#0085FF', marginTop: 10,
                  borderRadius: 5,justifyContent:'center' }}
              >
                <Text style={{color:'#000000',fontSize:14,fontWeight:'400',marginLeft:10}}>
                  {GstnoListData?.data?.pradr?.ntr}</Text>
              </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Regitration Date</Text>
                  <View
                style={{ height: 35, width: '95%',
                 borderWidth: 1, borderColor: '#0085FF', marginTop: 10,
                  borderRadius: 5,justifyContent:'center' }}
              >
                <Text style={{color:'#000000',fontSize:14,fontWeight:'400',marginLeft:10}}>
                  {GstnoListData?.data?.rgdt}</Text>
              </View>
                </View>
              </View>

              <View style={{ marginTop: 20, flexDirection: 'row', width: '100%' }}>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Company CTB</Text>
                  <View
                style={{ height: 35, width: '95%',
                 borderWidth: 1, borderColor: '#0085FF', marginTop: 10,
                  borderRadius: 5,justifyContent:'center' }}
              >
                <Text style={{color:'#000000',fontSize:14,fontWeight:'400',marginLeft:10}}>
                  {GstnoListData?.data?.ctb}</Text>
              </View>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Company Locality</Text>
                  <View
                style={{ height: 35, width: '95%',
                 borderWidth: 1, borderColor: '#0085FF', marginTop: 10,
                  borderRadius: 5,justifyContent:'center' }}
              >
                <Text style={{color:'#000000',fontSize:14,fontWeight:'400',marginLeft:10}}>
                  {GstnoListData?.data?.pradr?.addr?.loc}</Text>
              </View>
                </View>
              </View>

              <TouchableOpacity 
              onPress={()=>navigation.navigate("CreateCustomerDetailSecond")}
              style={{
                backgroundColor: '#086FB7', width: '100%',
                height: 54, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center'
              }}>
                <Text style={{ color: '#fff', fontSize: 21, fontWeight: "500" }}>Next</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </KeyboardAwareScrollView>

      </View>
    </Layout>
  );
};

export default CreateCustomerDetails;
