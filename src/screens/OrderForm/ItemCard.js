import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';


const ItemCard = ({item,items,setItems,data,index}) => {
    const navigation=useNavigation()
   
    const [selectedItem, setSelectedItem] = useState({})

const PickItem=(i)=>{

  setSelectedItem(i)
  // console.log(i.id)
  const id=Number(i.id)
  setItems(items.map((i,indexx)=>{ 
                   
    if(index == indexx){
      return {...i,
        skuable_id:id}}
        else{
          return i
        }
    })) 
}
    
    return (
      <View style={styles.itemCard}>


{!(index===0) &&
<TouchableOpacity

onPress={
  ()=>{
    const updatedItems = items.filter((i, itemIndex) => itemIndex !== index);
    setItems(updatedItems);
  }
}

style={{alignSelf:"flex-end"}}>
<Entypo
            name="cross"
            color="grey"
            size={30}
            // style={{paddingRight: 10}}
          />
</TouchableOpacity>
}


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
                setItems(items.map((i,indexx)=>{
                   
                  if(index == indexx){
                    return {...i,
                      qty:Number(text)}}
                      else{
                        return i
                      }
                }))
              }}
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
                setItems(items.map((i,indexx)=>{
                   
                    if(index == indexx){
                    return {...i,
                        discount:Number(text)}}
                      else{
                        return i
                      }
                }))
              }}
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
    );
  };
  const styles = StyleSheet.create({
    itemCard: {
      backgroundColor: '#fff',
      margin: 10,
      borderRadius: 5,
      padding: 15,
    },
  });
  
  export default ItemCard