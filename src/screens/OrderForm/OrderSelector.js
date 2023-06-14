import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper'

export default function OrderSelector({navigation,route}) {

const [searchValue, setSearchValue] = useState("")
const [selectedValve, setSelectedValve] = useState("")
const [data, setData] = useState(route.params.data)


const RadioButtonItem = ({ item, selectedValue, onValueChange }) => {
  return (
    <TouchableOpacity onPress={()=>{
      route.params.PickItem(item)
          navigation.goBack()
    }} style={{flexDirection:"row",alignItems:"center",marginVertical:5}}>
      <RadioButton
        value={item.id}
        status={selectedValue === item.id ? 'checked' : 'unchecked'}
        onPress={() => {

          onValueChange(item.id)
          route.params.PickItem(item)
          navigation.goBack()
        }}
      />
      <Text>{`${item.id} - ${item.sku_name}`}</Text>
    </TouchableOpacity>
  );
};

  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>

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
              Select Product
            </Text>
          </View>
        </View>
      </ImageBackground>


      <TextInput value={searchValue} placeholder='Search Product'
       onChangeText={(e)=>{

        setSearchValue(e)
        setData(route.params.data.filter((it) => {
       
          return (it.id.toString()).includes(e) || it.sku_name.toLowerCase().includes(e.toLowerCase())|| it.name.toLowerCase().includes(e.toLowerCase() )|| it.product_sku.toLowerCase().includes(e.toLowerCase() )
        }));
      }}
       
       style={{backgroundColor:"#ededed",borderRadius:5,borderColor:"black",borderWidth:1,margin:5}}/>

     

      <FlatList
      data={data}
      renderItem={({ item }) => (
        <RadioButtonItem
          item={item}
          selectedValue={selectedValve}
          onValueChange={setSelectedValve}
        />
      )}
      keyExtractor={(item) => item.value}
    />

    </View>
  )
}

const styles = StyleSheet.create({})