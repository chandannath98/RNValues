import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';

const CreateOrder = ({ route, navigation }) => {
  const { ItemId } = route.params;
console.log('====================================');
console.log('ItemId',ItemId);
console.log('====================================');
  const EstimateList = useSelector(state => state.Customerlist.estimateListData);
  const MainCategory = useSelector(
    state => state.maincategory.MainCategoryData,
  );

  useFocusEffect(
    useCallback(() => {
      settransporttypename("")
      setcustomertransportsname("")
      setcustomertransportsid("")
      setpaymentModes("")
      setpaymentTerms("")
      setcompanyid("")
    }, [companyname]),
  );

  const [companyid, setcompanyid] = useState("");
  const [companyname, setcompanyname] = useState("");

  const renderItemcompany = (item) => {

    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        {item.name === companyname && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  useFocusEffect(
    useCallback(() => {
      settransporttypename("")
      setcustomertransportsname("")
      setcustomertransportsid("")
      setpaymentModes("")
      setpaymentTerms("")
    }, [transporttype]),
  );

  const [transporttype, settransporttypename] = useState("");
  const renderItemtransporttype = (item) => {
    // console.log('iemm==>', item.state_Name);
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item}</Text>
        {item === transporttype && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  const [customertransportsname, setcustomertransportsname] = useState("");
  const [customertransportsid, setcustomertransportsid] = useState("");

  const renderItemcustomertransports = (item) => {
    // console.log('iemm==>', item.state_Name);
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        {item.name === customertransportsname && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  // const [comptransportsname, setcomptransportsname] = useState("");
  // const [comptransportsid, setcomptransportsid] = useState("");

  const renderItemtransportscomp = (item) => {
    // console.log('iemm==>', item.state_Name);
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        {item.name === customertransportsname && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };



  const [hh, sethh] = useState(null)
  useEffect(() => {
    sethh(transporttype)
  }, [transporttype])

  const [paymentModes, setpaymentModes] = useState("");

  const renderItempaymentModes = (item) => {
    // console.log('iemm==>', item.state_Name);
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item}</Text>
        {item === paymentModes && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  const [paymentTerms, setpaymentTerms] = useState("");

  const renderItempaymentTerms = (item) => {
    // console.log('iemm==>', item.state_Name);
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item}</Text>
        {item === paymentModes && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };



  // const handleProductDetailsdrop = data => dispatch(actions.handleProductDetailsdrop({ data, navigation }));
  const Productdownlist = useSelector(state => state.productSub.productdropdownListData);
  // console.log('Productdownlist===============>', Productdownlist.data.data);




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

  const loginData = useSelector(state => state.auth.loginData);

  const [Skuid, setSkuid] = useState(null);
  const [ProductArticle, setProductArticle] = useState(null);
  const [ProductName, setProductName] = useState(null);
  const [ProductSelling, setProductSelling] = useState(null);
  const [Quantity, setQuantity] = useState("");
  const [Discount, setDiscount] = useState("");
  const [PFACharge, setPFACharge] = useState("");
  const [BiltiCharge, setBiltiCharge] = useState("");

  const Funcsendmodel = (item) => {
    setSkuid(item.ID);
    setProductArticle(item.Article)
    setProductName(item.Name)
    setProductSelling(item.Selling)
    toggleModal();
  }

  const dispatch = useDispatch();
  const handleproductcreateorder = data => dispatch(actions.handleproductcreateorder({ data, navigation }));



  const [companyiderror, setcompanyiderror] = useState("");
  const [transporttypeerror, settransporttypeerror] = useState("");
  const [customertransportsiderror, setcustomertransportsiderror] = useState("");
  const [paymentModeserror, setpaymentModeserror] = useState("");
  const [paymentTermserror, setpaymentTermserror] = useState("");
  const [Skuiderror, setSkuiderror] = useState("");
  const [Quantityerror, setQuantityerror] = useState("");
  const [Discounterror, setDiscounterror] = useState("");


  const handleSubmit = async () => {

    var companyidValid = false;
    if (companyid.length === 0) {
      setcompanyiderror("Company required. *");
    } else {
      setcompanyiderror('');
      companyidValid = true;
    }

    var transporttypeValid = false;
    if (transporttype.length === 0) {
      settransporttypeerror("Transport Type required. *");
    } else {
      settransporttypeerror('');
      transporttypeValid = true;
    }

    var customertransportsidValid = false;
    if (customertransportsid.length === 0) {
      setcustomertransportsiderror("Transport required. *");
    } else {
      setcustomertransportsiderror('');
      customertransportsidValid = true;
    }
    var paymentModesValid = false;
    if (paymentModes.length === 0) {
      setpaymentModeserror("Payment Modes required. *");
    } else {
      setpaymentModeserror('');
      paymentModesValid = true;
    }
    var paymentTermsValid = false;
    if (paymentTerms.length === 0) {
      setpaymentTermserror("Payment Terms required. *");
    } else {
      setpaymentTermserror('');
      paymentTermsValid = true;
    }

    var SkuidValid = false;
    if (ProductName === null) {
      setSkuiderror("Product required. *");
    } else {
      setSkuiderror('');
      SkuidValid = true;
    }

    var QuantityValid = false;
    if (Quantity.length === 0) {
      setQuantityerror("Quantity required. *");
    } else {
      setQuantityerror('');
      QuantityValid = true;
    }
    var DiscountValid = false;
    if (Discount.length === 0) {
      setDiscounterror("Discount required. *");
    } else {
      setDiscounterror('');
      DiscountValid = true;
    }

    if (companyidValid && transporttypeValid && customertransportsidValid && paymentModesValid && paymentTermsValid && SkuidValid && QuantityValid && DiscountValid) {
      const data = {
        user_id: ItemId,
        company_id: companyid,
        transportable_type: transporttype,
        transportable_id: customertransportsid,
        sendable_id: loginData.data.ID,
        payment_mode: paymentModes,
        payment_terms: paymentTerms,
        sku_id: Skuid,
        total_qty: Quantity,
        product_price: ProductSelling,
        product_discount: Discount,
        pfa_charge: PFACharge,
        bilti_charge: BiltiCharge,
      }
      handleproductcreateorder(data)
    }

  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <ImageBackground
        style={{ flex: 0.085 }}
        source={require('../../../assests/Dashboard/UserloginBG.png')}>
        <View style={{ height: 60, width: '100%', flexDirection: 'row' }}>
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
          <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>
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
      <View
        style={{
          width: '100%',
          flex: 0.91,
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}>
        <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              flex: 0.9,
              // elevation: 5,
              borderRadius: 10,
              // paddingHorizontal: 15,
              paddingVertical: 15,
            }}>
            {/* <Text style={{ fontSize: 12, fontWeight: '500' }}>Create Order</Text> */}

            <View
              style={{
                width: '100%',
                // flexDirection: 'row',
                // justifyContent: 'space-between',
              }}>
              <View style={{ width: '100%', marginTop: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                  Company
                </Text>
                <View>
                  <Dropdown

                    style={styles.select_view_main}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={EstimateList?.companies}
                    maxHeight={300}
                    placeholder={companyname ? companyname : 'Select Company'}
                    searchPlaceholder="Search..."
                    value={companyname}
                    onChange={item => {
                      setcompanyid(item.id);
                      setcompanyname(item.name.length < 18 ?
                        item.name.substring(0, 18) :
                        item.name.substring(0, 18) + "..");

                    }}

                    renderLeftIcon={() => (
                      <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    )}
                    renderItem={renderItemcompany}
                  />
                  {companyiderror.length > 0 ? (
                    <Text style={{
                      color: "red",

                    }}>{companyiderror}</Text>
                  ) : null}

                </View>
              </View>
              <View style={{ width: '100%', marginTop: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                  Transport Type
                </Text>
                <Dropdown
                  style={styles.select_view_main}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={EstimateList?.trtypes}
                  maxHeight={300}
                  placeholder={transporttype ? transporttype : 'Select Transport Type'}
                  searchPlaceholder="Search..."
                  value={transporttype}
                  onChange={item => {
                    settransporttypename(item);

                  }}
                  renderLeftIcon={() => (
                    <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                  )}
                  renderItem={renderItemtransporttype}
                />
                {transporttypeerror.length > 0 ? (
                  <Text style={{
                    color: "red",

                  }}>{transporttypeerror}</Text>
                ) : null}
              </View>

              {transporttype !== "customer-transport" ?
                <View style={{ width: '100%', marginTop: 10 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                    Transports
                  </Text>
                  <Dropdown
                    style={styles.select_view}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={EstimateList?.transports}
                    maxHeight={300}
                    placeholder={customertransportsname ? customertransportsname : 'Select Transport Type'}
                    searchPlaceholder="Search..."
                    value={customertransportsname}
                    onChange={item => {
                      setcustomertransportsid(item.id)
                      setcustomertransportsname(
                        item.name.length < 18 ?
                          item.name.substring(0, 18) :
                          item.name.substring(0, 18) + "..");

                    }}

                    renderLeftIcon={() => (
                      <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    )}
                    renderItem={renderItemtransportscomp}
                  />
                  {customertransportsiderror.length > 0 ? (
                    <Text style={{
                      color: "red",

                    }}>{customertransportsiderror}</Text>
                  ) : null}
                </View>
                :
                <View>
                  <View style={{ width: '100%', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                      Customer Transports
                    </Text>
                    <Dropdown
                      style={styles.select_view_main}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={EstimateList?.customertransports}
                      maxHeight={300}
                      placeholder={customertransportsname ? customertransportsname : 'Select Customer Transports'}
                      searchPlaceholder="Search..."
                      value={customertransportsname}
                      onChange={item => {
                        setcustomertransportsid(item.id)
                        setcustomertransportsname(
                          item.name.length < 18 ?
                            item.name.substring(0, 18) :
                            item.name.substring(0, 18) + "..");
                      }}
                      renderLeftIcon={() => (
                        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                      )}
                      renderItem={renderItemcustomertransports}
                    />
                    {customertransportsiderror.length > 0 ? (
                      <Text style={{
                        color: "red",

                      }}>{customertransportsiderror}</Text>
                    ) : null}
                  </View>

                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '50%', marginTop: 10 }}>
                      <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                        PFA Charge
                      </Text>
                      <TextInput
                        onChangeText={text => setPFACharge(text)}
                        maxLength={3}
                        keyboardType={'number-pad'}
                        style={{
                          height: 35, width: '95%', borderWidth: 1,
                          borderRadius: 5
                        }} />
                    </View>
                    <View style={{ width: '50%', marginTop: 10 }}>
                      <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                        Bilti Charge
                      </Text>
                      <TextInput
                        onChangeText={text => setBiltiCharge(text)}
                        maxLength={3}
                        keyboardType={'number-pad'}
                        style={{
                          height: 35, width: '95%', borderWidth: 1,
                          borderRadius: 5
                        }} />
                    </View>
                  </View>

                </View>

              }




              <View style={{ flexDirection: 'row', width: '100%' }}>

                <View style={{ width: '50%', marginTop: 10 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                    Payment Modes
                  </Text>
                  <View>
                    <Dropdown

                      style={styles.select_view}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={EstimateList?.paymentModes}
                      maxHeight={300}
                      placeholder={paymentModes ? paymentModes : 'Payment Modes'}
                      searchPlaceholder="Search..."
                      value={paymentModes}
                      onChange={item => {
                        setpaymentModes(item);
                      }}

                      renderLeftIcon={() => (
                        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                      )}
                      renderItem={renderItempaymentModes}
                    />
                    {paymentModeserror.length > 0 ? (
                      <Text style={{
                        color: "red",

                      }}>{paymentModeserror}</Text>
                    ) : null}

                  </View>
                </View>

                <View style={{ width: '50%', marginTop: 10 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                    Payment Terms
                  </Text>
                  <View>
                    <Dropdown

                      style={styles.select_view}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={EstimateList?.paymentTerms}
                      maxHeight={300}
                      placeholder={paymentTerms ? paymentTerms : 'Payment Terms'}
                      searchPlaceholder="Search..."
                      value={paymentTerms}
                      onChange={item => {
                        setpaymentTerms(item);
                      }}
                      renderLeftIcon={() => (
                        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                      )}
                      renderItem={renderItempaymentTerms}
                    />
                    {paymentTermserror.length > 0 ? (
                      <Text style={{
                        color: "red",

                      }}>{paymentTermserror}</Text>
                    ) : null}

                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ width: '100%', marginTop: 10 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                    Product
                  </Text>
                  <TouchableOpacity
                    onPress={() => toggleModal()}
                    style={{
                      height: 45, width: '100%', borderWidth: 1,
                      borderRadius: 5, justifyContent: 'center'
                    }}
                  >
                    {ProductArticle == null ?
                      <Text style={{ marginLeft: 5 }}>Select Product</Text>
                      :
                      <Text style={{ marginLeft: 5 }}>{ProductArticle} - {ProductName}</Text>
                    }



                  </TouchableOpacity>
                  {ProductName === null ? (
                    <Text style={{
                      color: "red",

                    }}>{Skuiderror}</Text>
                  ) : null}

                </View>

              </View>


              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ width: '50%', marginTop: 10 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                    Quantity
                  </Text>
                  <TextInput
                    onChangeText={text => setQuantity(text)}
                    maxLength={4}
                    keyboardType={'number-pad'}
                    style={{
                      height: 35, width: '95%', borderWidth: 1,
                      borderRadius: 5
                    }} />
                  {Quantityerror.length > 0 ? (
                    <Text style={{
                      color: "red",

                    }}>{Quantityerror}</Text>
                  ) : null}
                </View>
                <View style={{ width: '50%', marginTop: 10 }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', marginBottom: 5 }}>
                    Discount
                  </Text>
                  <TextInput
                    onChangeText={text => setDiscount(text)}
                    keyboardType={'number-pad'}
                    maxLength={2}
                    style={{
                      height: 35, width: '95%', borderWidth: 1,
                      borderRadius: 5
                    }} />
                  {Discounterror.length > 0 ? (
                    <Text style={{
                      color: "red",

                    }}>{Discounterror}</Text>
                  ) : null}
                </View>
              </View>





            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={{
          flex: 0.1, width: '100%'
        }}>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={{
              width: '100%', height: 48, backgroundColor: '#00A9FF',
              borderRadius: 10, justifyContent: 'center', alignItems: 'center'
            }}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff' }}>ADD ORDER </Text>
          </TouchableOpacity>

        </View>



        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 0.8, }}>
            <View
              style={{
                //  flex: 0.6,
                backgroundColor: '#FFFFFF',
                elevation: 2,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <View style={{ width: '100%', flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: '85%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 25, fontWeight: '600' }}>Product</Text>
                </View>
                <TouchableOpacity
                  onPress={() => toggleModal()}
                  style={{ width: '15%', }}>
                  <Entypo name="cross" size={50} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                }}>

                <View style={{ width: '100%' }}>
                  <TextInput
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    placeholder='Seach..'
                    style={{
                      width: '100%',
                      height: 40,
                      borderWidth: 1,
                      borderColor: '#757575',
                      borderRadius: 10,
                    }} />


                </View>

              </View>


              <View style={{
                width: '100%', marginTop: 10, height: 400
              }}>

                <FlatList
                  data={filteredDataSource}
                  keyExtractor={item => item.ID.toString()}
                  // horizontal
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  renderItem={({ item }) => (
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
                      <View style={{ marginLeft: 10 }}>
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

export default CreateOrder;
const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 20 },
  customer_text_view: { fontSize: 25 },
  input_view: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '95%',
    marginTop: 20,
  },
  select_main_view: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  select_view: {
    //   borderBottomWidth: 1,
    //   width: '100%',
    //   height: 42,
    //   justifyContent: 'center',
    height: 35, width: '95%', borderWidth: 1,
    borderRadius: 5
    //  width: '100%', height: 25, borderWidth: 1 
  },
  select_view_main: {
    //   borderBottomWidth: 1,
    //   width: '100%',
    //   height: 42,
    //   justifyContent: 'center',
    height: 35, width: '100%', borderWidth: 1,
    borderRadius: 5
    //  width: '100%', height: 25, borderWidth: 1 
  },
  apply_button: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  apply_button_view: {
    //backgroundColor: Color.BUTTON_COLOR,
    width: '100%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apply_button_text: {
    color: '#fff',
    fontSize: 20,
  },
  record_main_view: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 20,
    elevation: 2,
    borderRadius: 10,
  },
  record_view: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: 10,
  },
  record_text_1: {
    width: '35%',
  },
  record_text_2: {
    width: '55%',
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
