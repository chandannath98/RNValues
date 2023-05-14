import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native';
import DateFormater from '../../../utils/DateFormater';

export default function OrdersList({navigation,route}) {
   
    const [ordersList, setOrdersList] = useState([])
const [loader, setLoader] = useState(true)



useEffect(() => {
    const fetchData = () => {
      const url = `https://rnsvalves.com/api/v1/get-order-form/salesmen/${route.params.loginData.data.ID}/cus-type/checkin_customer/customer/${route.params.custId}`;
      const authToken = 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC';
  
      axios
        .get(url, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          }
        })
        .then(response => {
          setLoader(false);
          setOrdersList(response.data.data);
          // Process the response data as needed
        })
        .catch(error => {
          setLoader(false);
          console.error(error);
          // Handle any errors that occurred during the request
        });
    };
  
    // Fetch data initially
    fetchData();
  
    // Fetch data every 10 seconds
    const interval = setInterval(fetchData, 10000);
  
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);




const OrderCard=({item})=>{
    return(

        <TouchableOpacity onPress={()=>navigation.navigate("OrderDetails",{item:item})} style={{backgroundColor:"#fff",borderColor:"grey",borderWidth:1,paddingHorizontal:10,paddingVertical:10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text>{(item.createdAt)}</Text>
                <Text>{item.OrderProductsCounts} Product</Text>
                </View>
                <Text style={{marginTop:6}}>Rs. {item.TotalAmount}</Text>
        </TouchableOpacity>

    )
}




  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
    <ImageBackground
      style={{height:60}}
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
            Orders List
          </Text>
        </View>
      </View>
    </ImageBackground>
   

{!loader?

ordersList.length==0?
<View style={{justifyContent:"center",alignItems:"center"}}>

<Text>No orders found</Text>
</View>
:

<FlatList data={ordersList} renderItem={({item,index})=><OrderCard item={item} />} />


:
<ActivityIndicator size={"large"} />
}
  </View>
  )
}

const styles = StyleSheet.create({})