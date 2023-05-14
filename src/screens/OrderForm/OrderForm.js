import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {TextInput} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import ItemCard from './ItemCard';
import { Alert } from 'react-native';




export default function OrderForm({navigation, route}) {


const [data, setData] = useState([])
const [selectorData, setSelectorData] = useState([])
const [items, setItems] = useState([{
  "skuable_id": 0,
  "discount": 0,
  "qty" : 0
}
])

const loginData=route.params.loginData

useEffect(() => {
  
    const url = 'https://rnsvalves.com/api/v1/sales/order-form/create';
    const authToken = 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC';
    
    axios.get(url, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          }
    })
      .then(response => {
        // console.log();
        setData(response.data.data.products)
        
        // Process the response data as needed
      })
      .catch(error => {
        console.error(error);
        // Handle any errors that occurred during the request
      });

}, []);

const OrderAPI = async () => {
  const url = `https://rnsvalves.com/api/v1/store-order-form/cus-type/checkin_customer/customer/${route.params.custId}`;
  const authToken = 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC';

  console.log(route.params.custId);
  console.log(loginData.data.ID);
  console.log(items);

  const formData = {
    salesable_id: loginData.data.ID,
    orderforms: items,
  };

  try {
    const response = await axios.post(url, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
if(response.status===200){
  navigation.goBack()
}else{
Alert.alert("Please fill all field Correctly")
}
    // console.log(response.data);
    // Process the response data as needed
  } catch (error) {
Alert.alert("Please fill all field Correctly")

    console.error(error);
    // Handle any errors that occurred during the request
  }
};

  

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{height:60}}
        source={require('../../assests/Dashboard/UserloginBG.png')}>
        <View style={{height: 60, width: '100%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: '15%',
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../../assests/Dashboard/arrowwhite.png')} />
          </TouchableOpacity>
          <View style={{width: '55%', height: 60, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '400',
                color: '#fff',
                marginLeft: 15,
              }}>
              Order Form
            </Text>
          </View>
        </View>
      </ImageBackground>

<FlatList data={items} renderItem={({item,index})=> <ItemCard item={item} items={items} setItems={setItems} data={data} index={index} />} />
     

<View style={{flexDirection:"row"}}>
      <TouchableOpacity
        onPress={() => {
          setItems([...items,{
            
            "skuable_id": 0,
            "discount": 0,
            "qty" : 0
          }])
        }}
        style={{
          backgroundColor: '#00BB29',
          width: 130,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'flex-start',
          marginHorizontal: 20,
          marginTop: 50,
        }}>
        <Text style={{color: '#fff'}}>Add More</Text>
      </TouchableOpacity>



      <TouchableOpacity
        onPress={OrderAPI}
        style={{
          backgroundColor: '#00BB29',
          width: 130,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'flex-end',
          marginHorizontal: 20,
          marginTop: 50,
        }}>
        <Text style={{color: '#fff'}}>Save</Text>
      </TouchableOpacity>


      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 5,
    padding: 15,
  },
});
