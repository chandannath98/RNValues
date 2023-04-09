import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const ProductDetails = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Newname, setname] = useState(null);
  const [NewImage, setImage] = useState(null);
  const [NewPrice, setPrice] = useState(null);
  const [ColorName, setColorName] = useState(null);

  const Productget = useSelector(state => state.productSub.ProductDetailsData);

  const colorfunc = (data) => {
    setname(data.Name)
    setImage(data.Image)
    setPrice(data.first_sku.MRP)
    setColorName(data.colorName)
  }
  // setTimeout(() => {
  //   setIsLoading(true);
  // }, 1000);
  // if (isLoading) {
  //   return (
  //     <View style={styles.ActivityLoader}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageBackground
        style={{ height: 65, width: '100%' }}
        source={require('../../assests/Dashboard/UserloginBG.png')}>
        <View style={{ height: 65, width: '100%', flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: '15%',
              height: 65,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../../assests/Dashboard/arrowwhite.png')} />
          </TouchableOpacity>
          <View style={{ width: '100%', height: 65, justifyContent: 'center' }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                color: '#fff',
                marginLeft: 15,
              }}>
              {Productget?.data?.Title}
            </Text>
          </View>


        </View>
      </ImageBackground>
      <ScrollView>
        <View
          style={{
            height: 300,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {NewImage === null ?
            <Image
              style={{ height: '100%', width: '100%' }}
              source={{ uri: Productget?.data?.HighImage }} />
            :
            <Image
              style={{ height: '100%', width: '100%' }}
              source={{ uri: NewImage }} />
          }
        </View>

        <View style={{ width: '100%', paddingVertical: 20 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: '#181725', fontWeight: '700', fontSize: 24 }}>
              {Newname === null ?
                Productget?.data?.Name
                :
                Newname
              }
            </Text>
            <Text style={{ color: '#000000', fontWeight: '500' }}>{ColorName}</Text>
            <Text style={{ color: '#7C7C7C', fontWeight: '400', fontSize: 14 }}>
              {Productget?.data?.Article} | CTN QTY : {Productget?.data?.skus[0]?.QTYCTN} PC's
            </Text>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <Text style={{ color: '#7C7C7C', fontWeight: '400', fontSize: 14 }}>Colour Available</Text>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 10, flexDirection: 'row',
          alignItems:'center' }}>

            <FlatList
              data={Productget?.data?.colorgroups}
              // numColumns={2}
              horizontal
              keyExtractor={item => item.ID.toString()}
              // ItemSeparatorComponent={() => Separator()}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 3 }}>
                  <TouchableOpacity
                    onPress={() => colorfunc(item)}
                    style={{ marginLeft: 3, borderWidth: 1 }}
                  //onPress={() => ProductApiHit(item.URL)}
                  >
                    <Image
                      style={{ height: 50, width: 50 }}
                      source={{ uri: item.colorIcon }}
                    />

                  </TouchableOpacity>
                </View>
              )}
            />
   


          </View>

          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ color: '#181725', fontWeight: '400', fontSize: 18 }}>
              Category :{Productget?.data?.Category}
            </Text>
            {NewPrice === null ?
              <Text style={{ color: '#181725', fontWeight: '400', fontSize: 18 }}>
                ₹ {Productget?.data?.skus[0]?.MRP}
              </Text> :
              <Text style={{ color: '#181725', fontWeight: '400', fontSize: 18 }}>
                ₹ {NewPrice}
              </Text>
            }

          </View>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ color: '#181725', fontWeight: '400', fontSize: 18 }}>
              Size
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={25} />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'green',
                paddingHorizontal: 10,
                justifyContent: 'center',
                paddingVertical: 5,
              }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                {Productget?.data?.skus[0]?.Size}
              </Text>
            </View>
            {/* <View
              style={{
                backgroundColor: '#ffffff',
                paddingHorizontal: 10,
                justifyContent: 'center',
                paddingVertical: 5,
                marginLeft: 5,
              }}>
              <Text style={{color: '#000000', fontSize: 16, fontWeight: '600'}}>
                8 MM (1/4)
              </Text>
            </View> */}
            {/* <View
              style={{
                backgroundColor: 'red',
                paddingHorizontal: 10,
                justifyContent: 'center',
                paddingVertical: 5,
                marginLeft: 5,
              }}>
              <Text style={{color: '#ffffff', fontSize: 16, fontWeight: '600'}}>
                8 MM (1/4)
              </Text>
            </View> */}
          </View>
          <View style={{ width: '100%', marginTop: 20, alignItems: 'center' }}>
            <Image
              source={require('../../assests/Dashboard/horigonaline.png')}
            />
          </View>
        </View>

        {/* <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}>
          <View>
            <Text style={{ color: '#181725', fontSize: 16, fontWeight: '600' }}>
              Product Detail
            </Text>
            <Text style={{ color: '#7C7C7C', fontSize: 13, fontWeight: '400' }}>
              {Productget?.data?.description}
            </Text>
            <Text style={{ color: '#7C7C7C', fontSize: 13, fontWeight: '400' }}>
              {Productget?.data?.Content}
            </Text>
          </View>
        </View> */}

        <View
          style={{
            paddingVertical: 25,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#00BB29',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10
            }}>

            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>IN STOCK</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 20
          }}>
          <View
            style={{
              flexDirection: 'row'
            }}>

            <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000" }}>Free standard shipping      </Text>
            <Text style={{ fontSize: 14, fontWeight: "400", textDecorationLine: 'underline', color: "#000000" }}>Free Returns</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  ActivityLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
