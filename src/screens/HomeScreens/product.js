import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../utils/Loader';
import * as actions from '../../redux/actions/authaction';
import Modal from "react-native-modal";
import {useFocusEffect} from '@react-navigation/native';

const Product = ({ route, navigation }) => {
  const { dataurl } = route.params;
  const isLoading = useSelector(state => state.loader.isLoading);
  const [isLoadingstatic, setIsLoading] = useState(true);

  const Productget = useSelector(state => state.productSub.ProductData);

  useFocusEffect(
    useCallback(() => {
      setFilteredDataSource(Productget?.data);
      setMasterDataSource(Productget?.data);
    }, [Productget]),
  );

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  // ################### Search function  ######################

  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState([]);
  const [masterDataSource, setMasterDataSource] = React.useState([]);


  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.Article
            ? item.Article.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;


        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  // ####################### Search function close ######################



  // ############ send the data next api ####################


  const ProductApiHit = (slug) => {
    const data = {
      slug: slug,
    };
    handleProductDetails(data);
  }

  const dispatch = useDispatch();
  const handleProductDetails = data => dispatch(actions.handleProductDetails({ data, navigation }));


  if (Productget == null) {
    return (
      <View style={styles.ActivityLoader}>
        <Loader loading={isLoading} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>

      <ImageBackground
        style={{ flex:1
          , width: '100%' }}
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
          <View style={{ width: '55%', height: 65, justifyContent: 'center' }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '400',
                color: '#fff',
                marginLeft: 15,
                textTransform: 'capitalize'
              }}>
              {dataurl}
            </Text>
          </View>

          {/* <View
            style={{
              width: '15%',
              height: 65,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assests/Dashboard/Vectorwhite.png')}
            />
          </View>
          <TouchableOpacity
          onPress={()=>toggleModal()}
          style={{width: '15%', height: 65, justifyContent: 'center'}}>
            <Image source={require('../../assests/Dashboard/Group396.png')} />
          </TouchableOpacity> */}
        </View>

        <View style={{ height: 65, width: '100%', alignItems: 'center' }}>
          {/* <View
            style={{
              width: '90%',
              height: 45,
              backgroundColor: '#fff',
              borderRadius: 12,
              elevation: 2,
            }}>

            </View> */}
          <TextInput
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            // placeholder='Search with Id'
            style={{
              width: '90%',
              height: 45,
              backgroundColor: '#fff',
              borderRadius: 12,
              elevation: 2,
            }} />
        </View>
      </ImageBackground>

      <View style={{ height: '80%', width: '100%',alignItems:'center',marginLeft:-5 }}>
        <FlatList
          data={filteredDataSource}
          numColumns={2}
          keyExtractor={item => item.ID.toString()}
          // ItemSeparatorComponent={() => Separator()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => ProductApiHit(item.URL)}>
              <View style={styles.bookItemContainer}>
                <View
                  style={{
                    width: 180,
                    height: 250,
                    elevation: 4,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 8,
                    marginLeft: 5,
                  }}>
                  <View
                    style={{
                      height: 120,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>

                    <Image
                      source={{ uri: item.Image }}
                      style={{ height: 100, width: 100 }}
                    />
                  </View>
                  <View
                    style={{
                      height: 70,
                      width: '90%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#181725',
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      {item.Name}
                    </Text>
                    <View style={{ flexDirection: 'row', }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 11,
                          fontWeight: '800',
                        }}>
                        {item.Article}
                      </Text>
                      <Text
                        style={{
                          color: '#7C7C7C',
                          fontSize: 11,
                          fontWeight: '400',
                        }}
                      > | QTY : {item?.first_sku?.QTYCTN} PC's
                      </Text>

                    </View>
                    {/*   */}
                  </View>
                  <View
                    style={{
                      height: 50,
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        color: '#181725',
                        fontSize: 18,
                        fontWeight: '400',
                      }}>
                      ₹ {item?.first_sku?.MRP}
                    </Text>
                    <MaterialCommunityIcons name="plus-circle" size={35} />
                  </View>

                  {/* <Image source={item.imgUrl} style={styles.thumbnail} /> */}
                  {/* <View>
                    <Text
                      style={{
                        marginLeft: 5,
                        color: '#797a7a',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{marginLeft: 5, color: '#797a7a'}}
                      numberOfLines={1}>
                      {item.detail}
                    </Text>
                    <View style={{flexDirection: 'row', marginLeft: 5}}>
                      <Text
                        style={{
                          textDecorationLine: 'line-through',
                          textDecorationStyle: 'solid',
                          color: '#797a7a',
                        }}>
                        {item.price}
                      </Text>
                      <Text style={{color: '#797a7a'}}> ₹ {item.price}</Text>
                      <Text style={{color: '#37fa4e'}}> {item.off}</Text>
                    </View>
                  </View> */}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>


      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  bookItemContainer: {
    justifyContent: 'space-around',
    paddingTop: 8,
    marginBottom: 5,
    marginLeft: 5,
  },
  mainImage: {
    width: 180,
    height: 280,
    elevation: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 5,
  },
  thumbnail: {
    width: 150,
    height: 200,
  },
  ActivityLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
