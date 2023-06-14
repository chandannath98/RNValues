import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  LogBox,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';


const CreateOrderSub = ({navigation}) => {
  const Productcreate = useSelector(
    state => state.productSub.ProductcreateData,
  );
  // console.log('Productcreate=======>', Productcreate);
  const [state, setState] = useState({data: null, error: false, loading: true});
  const [statenew, setStatenew] = useState({
    data: null,
    error: false,
    loading: true,
  });

  const dispatch = useDispatch();

  const [Skuid, setSkuid] = useState(null);
  const [ProductArticle, setProductArticle] = useState(null);
  const [ProductName, setProductName] = useState(null);
  const [ProductSelling, setProductSelling] = useState(null);
  const [Quantity, setQuantity] = useState('');
  const [Discount, setDiscount] = useState(null);
  const [PFACharge, setPFACharge] = useState('');
  const [BiltiCharge, setBiltiCharge] = useState('');

  const Productdownlist = useSelector(
    state => state.productSub.productdropdownListData,
  );

  const FirstOrderData = useSelector(
    state => state.productSub.ProductcreateData,
  );

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useFocusEffect(
    useCallback(() => {
      setFilteredDataSource(Productdownlist?.data?.data);
      setMasterDataSource(Productdownlist?.data?.data);
    }, [Productdownlist]),
  );
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
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

  const Funcsendmodel = item => {
    setSkuid(item.ID);
    setProductArticle(item.Article);
    setProductName(item.Name);
    setProductSelling(item.Selling);
    toggleModal();
  };

  const EstimateId = FirstOrderData?.data?.EstimateId;
  const handleproductcreateordernew = data =>
    dispatch(
      actions.handleproductcreateordernew({data, navigation, EstimateId}),
    );

  const [Skuiderror, setSkuiderror] = useState('');
  const [Quantityerror, setQuantityerror] = useState('');
  const [Discounterror, setDiscounterror] = useState('');

  const handleSubmit = async () => {
    var SkuidValid = false;
    if (ProductName === null) {
      setSkuiderror('Product required. *');
    } else {
      setSkuiderror('');
      SkuidValid = true;
    }

    var QuantityValid = false;
    if (Quantity.length === 0) {
      setQuantityerror('Quantity required. *');
    } else {
      setQuantityerror('');
      QuantityValid = true;
    }
    var DiscountValid = false;
    if (Discount === null) {
      setDiscounterror('Discount required. *');
    } else if (Discount > 53) {
      setDiscounterror('Please add Discount less then 52 *');
    } else {
      setDiscounterror('');
      DiscountValid = true;
    }

    if (SkuidValid && QuantityValid && DiscountValid) {
      const data = {
        sku_id: Skuid,
        total_qty: Quantity,
        product_price: ProductSelling,
        product_discount: Discount,
      };
      handleproductcreateordernew(data);
    }
  };

  const estimateData = useSelector(
    state => state.productSub.ProductcreatenewData,
  );
  const confirmestimate = estimateData?.data[0]?.EstimateId;
  const [newdata, setnewdata] = useState(1);
  useFocusEffect(
    useCallback(() => {
      setnewdata(+1);
    }, [estimateData]),
  );

  const handleproductcreateorderdelete = data =>
    dispatch(actions.handleproductcreateorderdelete({data, navigation}));

    const handleestimatestatus = data =>
    dispatch(actions.handleestimatestatus({confirmestimate, navigation}));

  const deletefunc = (est_id, prod_id) => {
    const data = {
      estimateid: est_id,
      productid: prod_id,
    };
    handleproductcreateorderdelete(data);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground
        style={{height:30}}
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
          <View style={{width: '100%', height: 60, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '400',
                color: '#fff',
                marginLeft: 15,
              }}>
              Create Order
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={{flex: 0.91}}>
        <View style={{flex: 0.85, paddingHorizontal: 10, marginTop: 5}}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              // height: 220,
              elevation: 5,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 12, fontWeight: '500'}}>Create Order</Text>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%'}}>
                <Text
                  style={{fontSize: 10, fontWeight: '500', marginBottom: 5}}>
                  Product
                </Text>
                <TouchableOpacity
                  onPress={() => toggleModal()}
                  style={{width: '100%', height: 25, borderWidth: 1}}>
                  {ProductArticle == null ? (
                    <Text style={{marginLeft: 5}}>Select Product</Text>
                  ) : (
                    <Text style={{marginLeft: 5}}>
                      {ProductArticle} - {ProductName}
                    </Text>
                  )}
                </TouchableOpacity>
                {ProductName === null ? (
                  <Text
                    style={{
                      color: 'red',
                    }}>
                    {Skuiderror}
                  </Text>
                ) : null}
              </View>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '49%'}}>
                <Text style={{fontSize: 10, fontWeight: '500', marginTop: 5}}>
                  Quantity
                </Text>
                <TextInput
                  onChangeText={text => setQuantity(text)}
                  maxLength={4}
                  value={Quantity}
                  keyboardType={'number-pad'}
                  style={{
                    width: '100%',
                    height: 30,
                    borderWidth: 1,
                    marginTop: 5,
                    fontSize: 8,
                  }}
                />
                {Quantityerror.length > 0 ? (
                  <Text
                    style={{
                      color: 'red',
                    }}>
                    {Quantityerror}
                  </Text>
                ) : null}
              </View>

              <View style={{width: '49%'}}>
                <Text style={{fontSize: 10, fontWeight: '500', marginTop: 5}}>
                  Discount
                </Text>
                <TextInput
                  onChangeText={text => setDiscount(text)}
                  value={Discount}
                  keyboardType={'number-pad'}
                  maxLength={2}
                  style={{
                    width: '100%',
                    height: 30,
                    borderWidth: 1,
                    marginTop: 5,
                    fontSize: 8,
                  }}
                />
                {Discount === null ? (
                  <Text
                    style={{
                      color: 'red',
                    }}>
                    {Discounterror}
                  </Text>
                ) : null}
                {Discounterror.length > 0 ? (
                  <Text
                    style={{
                      color: 'red',
                    }}>
                    {Discounterror}
                  </Text>
                ) : null}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                width: '100%',
                height: 23,
                backgroundColor: '#00A9FF',
                marginTop: 10,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 10, fontWeight: '500'}}>
                Add Order
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 300,
              width: '100%',
              backgroundColor: '#fff',
              marginTop: 10,
            }}>
            {/* {"data": {"Article": "RNWIN17C19", "Discount": "25", "EstimateId": 1400, "PId": 9257,
             "ProductCode": "RNWIN17C19", "ProductName": "Wall Mixer Telephonic with L-Bend Wall Mixer Telephonic with L-Bend", 
             "ProductSize": "Wall Mixer Telephonic with L-Bend", "TotalAmount": 1800.85, "TotalQTY": "1"},
             "message": "Estimate proforma has been added successfully", "status": 200, "success": true} */}

            <FlatList
              data={estimateData?.data}
              numColumns={1}
              //keyExtractor={item => item.Article.toString()}
              // ItemSeparatorComponent={() => Separator()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => deletefunc(item.EstimateId, item.PId)}
                  style={{
                    height: 55,
                    width: '100%',
                    backgroundColor: '#fff',
                    marginBottom: 10,
                    elevation: 3,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#00A9FF',
                    borderRadius: 5,
                    flexDirection: 'row',
                    paddingVertical: 5,
                  }}>
                  {console.log('....................', item)}
                  <View
                    style={{
                      width: '60%',
                      height: 50,
                      justifyContent: 'center',
                      paddingHorizontal: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        color: '#000000',
                      }}>
                      {item.ProductName.length < 30
                        ? item.ProductName.substring(0, 30)
                        : item.ProductName.substring(0, 30) + '..'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '500',
                        color: '#000000',
                      }}>
                      {item.ProductCode} - {item.ProductSize}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '500',
                        color: '#000000',
                      }}></Text>
                  </View>
                  <View
                    style={{
                      width: '40%',
                      height: 50,
                      justifyContent: 'center',
                      paddingHorizontal: 5,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        color: '#000000',
                      }}>
                      QTY - {item.TotalQTY}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        color: '#000000',
                      }}>
                      Total - {item.TotalAmount}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.15,
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => handleestimatestatus()}
            style={{
              width: '100%',
              height: 48,
              backgroundColor: '#00A9FF',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 15, fontWeight: '500'}}>
              CREATE ORDER
            </Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={isModalVisible}>
          <View style={{flex: 0.8}}>
            <View
              style={{
                //  flex: 0.6,
                backgroundColor: '#FFFFFF',
                elevation: 2,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <View
                style={{width: '100%', flexDirection: 'row', marginBottom: 10}}>
                <View style={{width: '85%', justifyContent: 'center'}}>
                  <Text style={{fontSize: 25, fontWeight: '600'}}>Product</Text>
                </View>
                <TouchableOpacity
                  onPress={() => toggleModal()}
                  style={{width: '15%'}}>
                  <Entypo name="cross" size={50} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <View style={{width: '100%'}}>
                  <TextInput
                    onChangeText={text => searchFilterFunction(text)}
                    value={search}
                    placeholder="Seach.."
                    style={{
                      width: '100%',
                      height: 40,
                      borderWidth: 1,
                      borderColor: '#757575',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 400,
                }}>
                <FlatList
                  data={filteredDataSource}
                  keyExtractor={item => item.ID.toString()}
                  // horizontal
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => Funcsendmodel(item)}
                      style={{
                        height: 66,
                        borderWidth: 1,
                        width: '100%',
                        borderColor: '#757575',
                        justifyContent: 'center',
                        borderRadius: 10,
                        marginTop: 5,
                      }}>
                      <View style={{marginLeft: 10}}>
                        <Text>{item.Article}</Text>
                        <Text>{item.Name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default CreateOrderSub;
