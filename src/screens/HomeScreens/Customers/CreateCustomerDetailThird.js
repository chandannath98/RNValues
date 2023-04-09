import React, { useState } from 'react';
import { TextInput, ScrollView } from 'react-native';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    Linking,
    StyleSheet
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../utils/layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import { Dropdown } from 'react-native-element-dropdown';

const CreateCustomerDetailThird = ({ route, navigation }) => {
    const { userid, userchannel, usercustomername, userphone,
        useremail, usercategorylevel } = route.params;

    const [Privatemarka, setPrivatemarka] = useState("");
    const [BookingDest, setBookingDest] = useState("");
    // const [Gatitype, setGatitype] = useState("");
    const [Distancekm, setDistancekm] = useState("");
    const [branchoffice, setbranchoffice] = useState("");
    const [gatitypes, setgatitypes] = useState("");
    const [bookingpincode, setbookingpincode] = useState("");


    const [useriderror, setuseriderror] = useState("");
    const [channeltypeerror, setchanneltypeerror] = useState("");
    const [categorylevelerror, setcategorylevelerror] = useState("");
    const [customernameerror, setcustomernameerror] = useState("");
    const [customeremailerror, setcustomeremailerror] = useState("");
    const [customerphoneerror, setcustomerphoneerror] = useState("");
    const [branchofficerror, setbranchofficerror] = useState("");

    const GstnoListData = useSelector(state => state.Customerlist.GstnoListData);
    const GstnoListDatasecond = useSelector(state => state.Customerlist.CreateCustomerListData);
    const loginData = useSelector(state => state.auth.loginData);

    const handleSubmit = async () => {
        const setaddress = GstnoListData.data.pradr.addr.bnm + " " + GstnoListData.data.pradr.addr.flno + " " + GstnoListData.data.pradr.addr.bno
        + " " + GstnoListData.data.pradr.addr.loc + " " + GstnoListData.data.pradr.addr.dst;

        var reg =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        var coordinateValid = false;
        if (Privatemarka.length === 0) {
            setuseriderror("The customer marka field is required.*");
        } else {
            setuseriderror('');
            coordinateValid = true;
        }

        var channeltypeValid = false;
        if (BookingDest.length === 0) {
            setchanneltypeerror("The customer booking destination field is required.*");
        } else {
            setchanneltypeerror('');
            channeltypeValid = true;
        }

        var categorylevelValid = false;
        if (gatitypes.length === 0) {
            setcategorylevelerror("The gati type field is required.*");
        } else {
            setcategorylevelerror('');
            categorylevelValid = true;
        }

        var customernameValid = false;
        if (Distancekm.length === 0) {
            setcustomernameerror("The distance km must be a number.*");
        } else {
            setcustomernameerror('');
            customernameValid = true;
        }

        var customerphoneValid = false;
        if (bookingpincode.length === 0) {
            setcustomerphoneerror("The booking pincode field is required.*");
        } else {
            setcustomerphoneerror('');
            customerphoneValid = true;
        }
    
        var branchofficeValid = false;
        if (branchoffice.length === 0) {
            setbranchofficerror("The gati branch must be a string.*");
        } else {
            setbranchofficerror('');
            branchofficeValid = true;
        }


        if (coordinateValid && channeltypeValid && categorylevelValid
            && customernameValid && customerphoneValid && branchofficeValid
        ) {
            const data = {
                name: usercustomername,
                email: useremail,
                customer_phone: userphone,
                customer_gst: GstnoListData.data.gstin,
                customer_address: setaddress,
                customer_marka: Privatemarka,
                customer_booking_destination: BookingDest,
                legal_name: GstnoListData.data.lgnm,
                business_nature: GstnoListData.data.pradr.ntr,
                company_status: GstnoListData.data.sts,
                last_update: GstnoListData.data.lstupdt,
                register_date: GstnoListData.data.rgdt,
                company_ctb: GstnoListData.data.ctb,
                company_locality: GstnoListData.data.pradr.addr.loc,
                company_pincode: GstnoListData.data.pradr.addr.pncd,
                company_state: GstnoListData.data.pradr.addr.st,
                gati_branch: branchoffice,
                distance_km: Distancekm,
                second_sales_coordinator_id: userid,
                channel_type: userchannel,
                category_level: usercategorylevel,
                gati_type: gatitypes,
                editable_id: loginData.data.ID,
                booking_pincode: bookingpincode,
    
    
            };
            handleCreateCustomerPost(data);
        }

    }




    const renderItemgatitypes = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item}</Text>
                {item === gatitypes && (
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
   


    const isLoading = useSelector(state => state.loader.isLoading);
    const dispatch = useDispatch();
    const handleCreateCustomerPost = data => dispatch(actions.handleCreateCustomerPost({ data, navigation }));

    return (
        <Layout>
            <Loader loading={isLoading} />
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <KeyboardAwareScrollView>
                    <ImageBackground
                        style={{ flex: 0.09 }}
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
                            <View style={{ width: '55%', height: 60, justifyContent: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontWeight: '400',
                                        color: '#fff',
                                        marginLeft: 15,
                                    }}>
                                    Create Customer
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>

                    <View style={{ flex: 0.91, paddingHorizontal: 15, paddingVertical: 10 }}>
                        <ScrollView style={{ flex: 0.91 }}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: "#000000", fontSize: 25, fontWeight: "600" }}>Create Customer</Text>
                            </View>

                            <View style={{ marginTop: 20, flexDirection: 'row', width: '100%' }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Private Marka</Text>
                                    <TextInput
                                        onChangeText={(text) => setPrivatemarka(text)}
                                        value={Privatemarka}
                                        style={{ height: 35, width: '95%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
                                    />
                                    {useriderror.length > 0 ? (
                                        <Text style={{
                                            color: "red",

                                        }}>{useriderror}</Text>
                                    ) : null}
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Booking Destination</Text>
                                    <TextInput
                                        onChangeText={(text) => setBookingDest(text)}
                                        value={BookingDest}
                                        style={{ height: 35, width: '100%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
                                    />
                                    {channeltypeerror.length > 0 ? (
                                        <Text style={{
                                            color: "red",

                                        }}>{channeltypeerror}</Text>
                                    ) : null}
                                </View>
                            </View>
                            <View style={{ marginTop: 20, flexDirection: 'row', width: '100%' }}>
                                <View style={{ width: '100%' }}>
                                    <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Gati type *</Text>
                                    {/* <TextInput
                                        onChangeText={(text) => setGatitype(text)}
                                        value={Gatitype}
                                        style={{ height: 35, width: '95%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
                                    /> */}

                                    <Dropdown
                                        style={styles.select_view}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={GstnoListDatasecond.data.gatitypes}
                                        maxHeight={300}
                                        placeholder={gatitypes ? gatitypes : 'Select Status'}
                                        searchPlaceholder="Search..."
                                        value={gatitypes}
                                        onChange={item => {
                                            setgatitypes(item);
                                        }}

                                        renderLeftIcon={() => (
                                            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                                        )}
                                        renderItem={renderItemgatitypes}
                                    />
                                    {categorylevelerror.length > 0 ? (
                                        <Text style={{
                                            color: "red",

                                        }}>{categorylevelerror}</Text>
                                    ) : null}
                                </View>

                            </View>
                            <View style={{ marginTop: 20, flexDirection: 'row', width: '100%' }}>
                                <View style={{ width: '50%', }}>
                                    <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Distance KM *</Text>
                                    <TextInput
                                        onChangeText={(text) => setDistancekm(text)}
                                        value={Distancekm}
                                        style={{ height: 35, width: '95%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
                                    />
                                    {customernameerror.length > 0 ? (
                                        <Text style={{
                                            color: "red",

                                        }}>{customernameerror}</Text>
                                    ) : null}
                                </View>
                                <View style={{ width: '50%', }}>
                                    <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Booking Pincode *</Text>
                                    <TextInput
                                        onChangeText={(text) => setbookingpincode(text)}
                                        value={bookingpincode}
                                        style={{ height: 35, width: '100%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
                                    />
                                      {customerphoneerror.length > 0 ? (
                                    <Text style={{
                                        color: "red",

                                    }}>{customerphoneerror}</Text>
                                ) : null}
                                </View>
                            </View>

                            
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Get Branch Office Address</Text>
                            </View>
                            <TextInput
                                onChangeText={(text) => setbranchoffice(text)}
                                value={branchoffice}
                                style={{ height: 75, width: '100%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
                            />
                             {branchofficerror.length > 0 ? (
                                    <Text style={{
                                        color: "red",

                                    }}>{branchofficerror}</Text>
                                ) : null}

                            <View style={{ marginTop: 15 }}>
                                <Text style={{ color: '#0f86bd' }}
                                    onPress={() => Linking.openURL('https://www.gati.com/contact-us/locate-us/')}>
                                    https://www.gati.com/contact-us/locate-us/
                                </Text>

                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '48%' }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={{
                                            backgroundColor: '#0A81C5', width: '100%',
                                            height: 54, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center'
                                        }}>
                                        <Text style={{ color: '#fff', fontSize: 21, fontWeight: "500" }}>Back</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '48%' }}>
                                    <TouchableOpacity
                                        onPress={() => handleSubmit()}
                                        style={{
                                            backgroundColor: '#00BB29', width: '100%',
                                            height: 54, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center'
                                        }}>
                                        <Text style={{ color: '#fff', fontSize: 21, fontWeight: "500" }}>Next</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </ScrollView>
                    </View>
                </KeyboardAwareScrollView>

            </View>
        </Layout>
    );
};

export default CreateCustomerDetailThird;
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
        height: 35, width: '100%', borderWidth: 1, borderColor: '#0085FF',
        marginTop: 10, borderRadius: 5
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

