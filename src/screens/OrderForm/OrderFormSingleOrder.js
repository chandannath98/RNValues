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
import { useSelector } from 'react-redux';
  
  
  
  
  export default function OrderFormSingleorder({navigation, route}) {
  

  const loginData = useSelector(state => state.auth.loginData);
const [data, setData] = useState([])
  
const [selectedItem, setSelectedItem] = useState({})


  const [item, setItem] = useState({
    "skuable_id": 0,
    "discount": 0,
    "qty" : 0
  }
  )
  

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


const PickItem=(e)=>{
    setSelectedItem(e)
    setItem({...item,skuable_id:Number(e.id)})
}

  
  const OrderAPI = async () => {
    const url = `https://rnsvalves.com/api/v1/add-new-product-existing-order-form/${route.params.orderId}`;
    const authToken = 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC';
  
    // console.log(route.params.custId);
    // console.log(loginData.data.ID);
    // console.log(items);
  
    const formData = item
    console.log(url)
    console.log(formData)
  
    try {
      const response = await axios.post(url, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response)
  if(response.status===200){
    route.params.setdeleteItem(route.params.deleteItem+1)
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
  

{/* ItemCard */}


<View style={styles.itemCard}>
        <View style={{width: '100%', marginTop: 10, paddingHorizontal: 5}}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              marginBottom: 5,
            }}>
            Select Product
          </Text>
          <TouchableOpacity
           onPress={()=>navigation.navigate("OrderSelector",{data:data,PickItem:PickItem})}
            style={{borderColor:"black",borderWidth:1,borderRadius:5,padding:5,paddingVertical:10,flexDirection:"row",justifyContent:"space-between"}}>


            <Text style={{width:"80%"}}>{selectedItem.id?`${selectedItem.id} - ${selectedItem.sku_name}`: "Select"}</Text>
            <Icon name="down" size={20} color="black" />
          </TouchableOpacity>
          {/* {selectederror.length > 0 ? (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 5,
                          marginTop: 10,
                        }}>
                        {selectederror}
                      </Text>
                    ) : null} */}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '50%', marginTop: 10}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                marginBottom: 5,
              }}>
              Quantity
            </Text>
            <TextInput
              keyboardType="number-pad"

              value={String(item.qty)}
              onChangeText={text => {
                setItem( {...item,
                      qty:Number(text)
                    }
                    
                    )}}
                     
               
             
              style={{
                height: 45,
                width: '95%',
                borderWidth: 1,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{width: '50%', marginTop: 10}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                marginBottom: 5,
              }}>
              Discount %
            </Text>
            <TextInput
              value={String(item.discount)}
              keyboardType="number-pad"
              onChangeText={text => {
                setItem( {...item,
                    discount:Number(text)
                  })}
              }
              style={{
                height: 45,
                width: '95%',
                borderWidth: 1,
                borderRadius: 5,
              }}
            />
          </View>
        </View>
      </View>
  
 
  
  
  
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
  