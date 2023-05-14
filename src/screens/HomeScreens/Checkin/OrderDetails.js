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

export default function OrderDetails({navigation,route}) {
   
   
const [loader, setLoader] = useState(true)
const [orderData, setOrderData] = useState([])
const [deleteItem , setdeleteItem  ] = useState(0)







useEffect(() => {
    
// const url = `https://rnsvalves.com/api/ v1/get-order-form/salesmen/${route.params.loginData.data.ID}/cus-type/checkin_customer/customer/${route.params.custId}`

const url = `https://rnsvalves.com/api/v1/get-order-form-products/orderformtotal/${route.params.item.Id}`

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
        setLoader(false)
        setOrderData(response.data.data)
        
        // Process the response data as needed
      })
      .catch(error => {
        setLoader(false)

        console.error(error);
        // Handle any errors that occurred during the request
      });



}, [deleteItem]);



const deleteFunc=async(item)=>{

    setLoader(true)
    const url = `https://rnsvalves.com/api/v1/sales/order-form/${item.Id}`

    const authToken = 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC';
        
        axios.delete(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              }
        })
          .then(response => {
            // console.log();
            setLoader(false)
            // setOrderData(response.data.data)
            setdeleteItem(deleteItem+1)
            
            // Process the response data as needed
          })
          .catch(error => {
            setLoader(false)
    
            console.error(error);
            // Handle any errors that occurred during the request
          });
    

}




const OrderCard=({item})=>{
    return(

        <TouchableOpacity onPress={()=>navigation.navigate("OrderDetails",{item:item})} style={{backgroundColor:"#fff",borderColor:"grey",borderWidth:1,paddingHorizontal:10,paddingVertical:10}}>
            
                <Text style={{fontSize:20}}>{(item.ProductName)}</Text>
                
               
                <View style={{flexDirection:"row",marginVertical:10,alignItems:"center"}}>
                <Text style={{fontSize:17,fontWeight:"bold"}}>Rs. {item.TotalAmount}</Text>
                <Text style={{fontSize:14,color:"grey",marginHorizontal:10}}>{item.Discount} % Discount</Text>
                </View>

                <View style={{flexDirection:"row",marginVertical:10,alignItems:"center",justifyContent:"space-between"}}>
                <Text style={{fontSize:17,fontWeight:"bold"}}>{item.Qty} Pcs</Text>


<TouchableOpacity onPress={()=>deleteFunc(item)} style={{backgroundColor:"#1E4B8D",padding:5,borderRadius:5}}>
    <Text style={{color:"white",fontWeight:"600"}}>Delete</Text>
</TouchableOpacity>

                </View>
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
            Product List
          </Text>
        </View>
      </View>
    </ImageBackground>
   

{!loader?



<FlatList data={orderData} renderItem={({item,index})=><OrderCard item={item} />} />:



<ActivityIndicator size={"large"} />
}



{!loader &&
<TouchableOpacity onPress={()=>navigation.navigate("OrderFormSingleorder",{orderId:route.params.item.Id,setdeleteItem:setdeleteItem,deleteItem:deleteItem})}  style={{backgroundColor:"#1E4B8D",padding:5,borderRadius:5,alignSelf:"flex-end"}}>
    <Text style={{color:"white",fontWeight:"600"}}>Add More</Text>
</TouchableOpacity>
}


  </View>
  )
}

const styles = StyleSheet.create({})