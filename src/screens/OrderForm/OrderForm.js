import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
  Button
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'react-native';
import {TextInput} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import ItemCard from './ItemCard';
import { Alert } from 'react-native';




export default function OrderForm({navigation, route}) {

  const [keyboardOpen, setKeyboardOpen] = useState(false);
const [data, setData] = useState([])
const [selectorData, setSelectorData] = useState([])
const [items, setItems] = useState([{
  "skuable_id": 0,
  "discount": 0,
  "qty" : 0
}
])

const loginData=route.params.loginData


const isAnyValueZero = items.some(item => item.skuable_id === 0 || item.discount === 0 || item.qty === 0);

const flatListRef = useRef(null);

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
 

  Alert.alert(
    'Done',
    'Your order is placed successfully',
    [
     
      {
        text: 'OK',
        onPress: () =>  navigation.replace("OrdersList",{loginData:loginData,custId:route.params.custId})
      }
    ]
  );



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
    <KeyboardAvoidingView
    
    // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    onKeyboardDidShow={() => setKeyboardOpen(true)}
    onKeyboardDidHide={() => setKeyboardOpen(false)}
    style={{ flex: 1 }}>
    <ImageBackground
      style={{ height: 60 }}
      source={require('../../assests/Dashboard/UserloginBG.png')}
    >
      <View style={{ height: 60, width: '100%', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: '15%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assests/Dashboard/arrowwhite.png')}
          />
        </TouchableOpacity>
        <View style={{ width: '55%', height: 60, justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '400',
              color: '#fff',
              marginLeft: 15,
            }}
          >
            Order Form
          </Text>
        </View>
      </View>
    </ImageBackground>
  
    <FlatList
    ListFooterComponent={<View style={{height:500,}}>

    </View>}
    ref={flatListRef}
      data={items}
      contentContainerStyle={{ paddingBottom: 200 }}
      renderItem={({ item, index }) => (
        <ItemCard
          item={item}
          items={items}
          setItems={setItems}
          data={data}
          index={index}
        />
      )}
    />
  {!keyboardOpen && !isAnyValueZero &&
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent:"space-between"
      }}
    >
      <TouchableOpacity
        onPress={() => {

          setItems([
            ...items,
            {
              skuable_id: 0,
              discount: 0,
              qty: 0,
            },
          ]);
          flatListRef.current.scrollToEnd();

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
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#fff' }}>Add More</Text>
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
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#fff' }}>Save</Text>
      </TouchableOpacity>
    </View>
    }
    
  </KeyboardAvoidingView>
  
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
