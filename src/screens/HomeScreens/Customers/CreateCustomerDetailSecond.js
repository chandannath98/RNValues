import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    Linking,
    Picker
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../../utils/layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import { Dropdown } from 'react-native-element-dropdown';

const CreateCustomerDetailSecond = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [gender, setGender] = useState("");
    const [userid, setuserid] = useState("");
    const [username, setusername] = useState("");
    const [userphone, setuserphone] = useState("");
    const [channeltype, setchanneltype] = useState("");
    const [customerphone, setcustomerphone] = useState("");
    const [customeremail, setcustomeremail] = useState("");
    const [customername, setcustomername] = useState("");
    const [CategoryLevel, setCategoryLevel] = useState("");

    const [useriderror, setuseriderror] = useState("");
    const [channeltypeerror, setchanneltypeerror] = useState("");
    const [categorylevelerror, setcategorylevelerror] = useState("");
    const [customernameerror, setcustomernameerror] = useState("");
    const [customeremailerror, setcustomeremailerror] = useState("");
    const [customerphoneerror, setcustomerphoneerror] = useState("");

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const GstnoListData = useSelector(state => state.Customerlist.CreateCustomerListData);
    console.log(GstnoListData);

    const renderItem = (item) => {
        // console.log('iemm==>', item.state_Name);
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.name}</Text>
                {item.username === username && (
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


    const renderItemchannel = (item) => {
        // console.log('iemm==>', item.state_Name);
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item}</Text>
                {item === channeltype && (
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

    const renderItemCategoryLevel = (item) => {
        // console.log('iemm==>', item.state_Name);
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item}</Text>
                {item === CategoryLevel && (
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
    const handleSubmit = async () => {

        var reg =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        var coordinateValid = false;
        if (userid.length === 0) {
            setuseriderror("The second sales coordinator id field is required. *");
        } else {
            setuseriderror('');
            coordinateValid = true;
        }

        var channeltypeValid = false;
        if (channeltype.length === 0) {
            setchanneltypeerror("The channel type field is required.*");
        } else {
            setchanneltypeerror('');
            channeltypeValid = true;
        }

        var categorylevelValid = false;
        if (CategoryLevel.length === 0) {
            setcategorylevelerror("The category level field is required.*");
        } else {
            setcategorylevelerror('');
            categorylevelValid = true;
        }

        var customernameValid = false;
        if (customername.length === 0) {
            setcustomernameerror("The name field is required.*");
        } else {
            setcustomernameerror('');
            customernameValid = true;
        }

        var customerphoneValid = false;
        if (customerphone.length === 0) {
            setcustomerphoneerror("The phone field is required.*");
        } else {
            setcustomerphoneerror('');
            customerphoneValid = true;
        }

        var customeremailValid = false;
        if (customeremail.length === 0) {
            setcustomeremailerror("The email field is required.*");
        } else if (reg.test(customeremail) === false) {
            setcustomeremailerror("You have entered a invalid email address * ");
        } else {
            setcustomeremailerror('');
            customeremailValid = true;
        }
        if (coordinateValid && channeltypeValid && categorylevelValid
            && customernameValid && customerphoneValid && customeremailValid
        ) {
            navigation.navigate("CreateCustomerDetailThird", {
                userid: userid,
                userchannel: channeltype,
                usercustomername: customername,
                userphone: customerphone,
                useremail: customeremail,
                usercategorylevel: CategoryLevel,

            })
        }

    }

    return (
        <Layout>
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

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000000", fontSize: 25, fontWeight: "600" }}>Create Customer</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Select Second CRM *</Text>
                        </View>

                        <Dropdown
                            style={styles.select_view}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={GstnoListData.data.crms}
                            maxHeight={300}
                            placeholder={username ? username : 'Select Status'}
                            searchPlaceholder="Search..."
                            value={username}
                            onChange={item => {
                                setuserid(item.id);
                                setusername(item.name);
                                setuserphone(item.phone);
                            }}

                            renderLeftIcon={() => (
                                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                            )}
                            renderItem={renderItem}
                        />

                        {useriderror.length > 0 ? (
                            <Text style={{
                                color: "red",

                            }}>{useriderror}</Text>
                        ) : null}

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Select Channel Type *</Text>
                        </View>
                        {/* <TextInput
                            style={{ height: 35, width: '100%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
                        /> */}

                        <Dropdown
                            style={styles.select_view}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={GstnoListData.data.channeltypes}
                            maxHeight={300}
                            placeholder={channeltype ? channeltype : 'Select Status'}
                            searchPlaceholder="Search..."
                            value={channeltype}
                            onChange={item => {
                                setchanneltype(item);
                            }}

                            renderLeftIcon={() => (
                                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                            )}
                            renderItem={renderItemchannel}
                        />

                        {channeltypeerror.length > 0 ? (
                            <Text style={{
                                color: "red",

                            }}>{channeltypeerror}</Text>
                        ) : null}


                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Select Category level *</Text>
                        </View>

                        <Dropdown
                            style={styles.select_view}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={GstnoListData.data.Levels}
                            maxHeight={300}
                            placeholder={CategoryLevel ? CategoryLevel : 'Select Status'}
                            searchPlaceholder="Search..."
                            value={CategoryLevel}
                            onChange={item => {
                                setCategoryLevel(item);
                            }}

                            renderLeftIcon={() => (
                                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                            )}
                            renderItem={renderItemCategoryLevel}
                        />

                        {categorylevelerror.length > 0 ? (
                            <Text style={{
                                color: "red",

                            }}>{categorylevelerror}</Text>
                        ) : null}

                        <View style={{ marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Customer Name</Text>
                                <TextInput
                                    onChangeText={(text) => setcustomername(text)}
                                    value={customername}
                                    style={{ height: 35, width: '100%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
                                />
                            </View>

                        </View>
                        {customernameerror.length > 0 ? (
                            <Text style={{
                                color: "red",

                            }}>{customernameerror}</Text>
                        ) : null}



                        <View style={{ marginTop: 20, flexDirection: 'row', width: '100%' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Customer Phone</Text>
                                <TextInput
                                    keyboardType='phone-pad'
                                    maxLength={10}
                                    onChangeText={(text) => setcustomerphone(text)}
                                    value={customerphone}
                                    style={{ height: 35, width: '95%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
                                />
                                {customerphoneerror.length > 0 ? (
                                    <Text style={{
                                        color: "red",

                                    }}>{customerphoneerror}</Text>
                                ) : null}
                            </View>

                            <View style={{ width: '50%' }}>
                                <Text style={{ color: "#000000", fontSize: 14, fontWeight: "400" }}>Customer Email</Text>
                                <TextInput
                                    onChangeText={(text) => setcustomeremail(text)}
                                    value={customeremail}
                                    style={{ height: 35, width: '100%', borderWidth: 1, borderColor: '#0085FF', marginTop: 10, borderRadius: 5 }}
                                />
                                {customeremailerror.length > 0 ? (
                                    <Text style={{
                                        color: "red",

                                    }}>{customeremailerror}</Text>
                                ) : null}
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '48%' }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{
                                        backgroundColor: '#9B9B9B', width: '100%',
                                        height: 54, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: '#fff', fontSize: 21, fontWeight: "500" }}>Back</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '48%' }}>
                                <TouchableOpacity
                                    onPress={() => handleSubmit()}
                                    style={{
                                        backgroundColor: '#086FB7', width: '100%',
                                        height: 54, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Text style={{ color: '#fff', fontSize: 21, fontWeight: "500" }}>Next</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                </KeyboardAwareScrollView>

            </View>
        </Layout>
    );
};

export default CreateCustomerDetailSecond;
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
