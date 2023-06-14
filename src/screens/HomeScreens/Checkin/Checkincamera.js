import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  PermissionsAndroid,
  View,
  Platform,
  Modal,
  Image,
  ImageBackground,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import * as actions from '../../../redux/actions/authaction';
import Loader from '../../../utils/Loader';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {SelectList} from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import * as Progress from 'react-native-progress';

const Checkincamera = ({route, navigation}) => {


console.log(route.params)

  const {datasend, itemId ,pincodeaddress} = route.params

  const loginData = useSelector(state => state.auth.loginData);

  const Checkindropdownlist = useSelector(
    state => state.CheckInList.createcheckindropdownlist,
  );




  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imagepath, setimagepath] = useState(null);
  const [showProgressBar, setShowProgessBar] = useState(false)
  const [uploadProgress,setUploadProgress] = useState(0)

  const [image2, setImage2] = useState(null);
  const [uploading2, setUploading2] = useState(false);
  const [transferred2, setTransferred2] = useState(0);
  const [imagepath2, setimagepath2] = useState(null);

  const [sendtoapi, setsendtoapi] = useState(null);

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBsc_32ip44ZxiwytqSxKdczopDmUAFpow';

  const [totaldistance, settotaldistance] = useState(null);
  const [comment, setcomment] = useState(null);
  // const [longitude, setlongitude] = useState(null);
  // const [latitude, setlatitude] = useState(null);
  const [pincode, setpincode] = useState(null);
  const [distance_km, setdistance_km] = useState(null);
  const [distance_time, setdistance_time] = useState(null);
  const [useloader, setuseloader] = useState(false);

  const [SelectedInterested, setSelectedInterested] = useState('');
  const [Interested, setInterested] = useState([]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const Currentdate = moment(date).format('YYYY-MM-DD');

  useEffect(() => {
    dropdowngetfunc();
  }, []);


  const dropdowngetfunc = () => {
    // let newArraysubcattype = Checkindropdownlist.data.sections.map(
    //   (item, index) => {
    //     return {key: item.id, value: item.name};
    //   },
    // );
    // //Set Data Variable
    // setsubcattype(newArraysubcattype);

    let newArrayInterested = Checkindropdownlist?.data?.interestedAt.map(
      (item, index) => {
        return {key: item, value: item};
      },
    );
    //Set Data Variable
    setInterested(newArrayInterested);
  };


  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,

        {
          title: 'App Camera Permission',

          message: 'App needs access to your camera ',

          buttonNeutral: 'Ask Me Later',

          buttonNegative: 'Cancel',

          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        selectImage();

        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const selectImage = () => {
    const options = {
      maxWidth: 2000,

      maxHeight: 2000,

      storageOptions: {
        skipBackup: true,

        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        setImage(source);
      }
    });
  };

  const requestCameraPermission2 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,

        {
          title: 'App Camera Permission',

          message: 'App needs access to your camera ',

          buttonNeutral: 'Ask Me Later',

          buttonNegative: 'Cancel',

          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        selectImage2();

        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const selectImage2 = () => {
    const options = {
      maxWidth: 500,

      maxHeight: 500,

      storageOptions: {
        skipBackup: true,

        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uris: response.assets[0].uri};
        //setimagepath(filename)
        setImage2(source);
      }
    });
  };

  const [useriderror, setuseriderror] = useState('');
  const [channeltypeerror, setchanneltypeerror] = useState('');

  const handleSubmit = async () => {
    var coordinateValid = false;
    if (image == null) {
      setuseriderror('Upload Image 1*');
    } else {
      setuseriderror('');
      coordinateValid = true;
    }

    var channeltypeValid = false;
    if (image2 == null) {
      setchanneltypeerror('Upload Image 2*');
    } else {
      setchanneltypeerror('');
      channeltypeValid = true;
    }

    if (coordinateValid && channeltypeValid) {
      editUserProfile();
    }
  };

  const editUserProfile = async () => {
    setShowProgessBar(true)
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    const {uris} = image2;
    const filename2 = uris.substring(uris.lastIndexOf('/') + 1);

    var datas = new FormData();
    datas.append('salesmenable_id', loginData.data.ID);
    datas.append('userable_id', itemId);
    //datas.append('next_visit', Currentdate);
    datas.append('userable_type', 'checkin_customer');
    // datas.append('interestedAt', SelectedInterested);
    datas.append('longitude', datasend.latitude);
    datas.append('latitude', datasend.longitude);
    datas.append('pincode', pincodeaddress);
    datas.append('distance_km', 20);
    datas.append('distance_time', 10);
    datas.append('photo_one', {
      uri: image?.uri,
      name: filename,
      type: 'image/jpg',
    });
    datas.append('photo_two', {
      uri: image2?.uris,
      name: filename2,
      type: 'image/jpg',
    });

    await axios
      .post('https://rnsvalves.com/api/v1/sales/checkin', datas, {
        headers: {
          Authorization: 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC',
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => onProgessEvent(progressEvent) ,
        
      })
      .then(response => {
        console.log(response.data)
        setShowProgessBar(false)
       navigation.replace('OrderFollowList', { ItemId: itemId, udid:response.data.data.UUID });
      })
      .catch(error => {
        console.log("error")
        console.log(error)
        setShowProgessBar(false)
      });
  };


  const onProgessEvent = (progressEvent)=>{
    const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total)*100);
    setUploadProgress(percentCompleted);
  }
  const width = Dimensions.get('screen').width - 40
  return (
    <View
      style={{
        flex: 1,
      }}>
      {useloader ? <Loader /> : null}
      <ImageBackground
        style={{height: 60, width: '100%'}}
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
              Back
            </Text>
          </View>

     
        </View>
      </ImageBackground>
      <Modal
      transparent={true}
      animationType={'none'}
      visible={showProgressBar}
      onRequestClose={() => {
        console.log('close modal');
      }}>
       
      <View style={styles.modalBackground}>
        <View>
        <View style={{marginBottom:20}}>
          <Text>{uploadProgress}%</Text>
        </View>
      <Progress.Bar progress={uploadProgress} width={width} />
        </View>
      </View>
    </Modal>
      <View
        style={{
          flex: 0.92,
          paddingVertical: 10,
          width: '100%',
          alignItems: 'center',
          paddingHorizontal:10
        }}>
           {/* <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{width: '50%', marginTop: 10, marginRight: 5}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Interested
                    </Text>
                    <SelectList
                      setSelected={setSelectedInterested}
                      data={Interested}
                    />
                  </View>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      Next visit date
                    </Text>
                    <TouchableOpacity
                      onPress={() => setOpen(true)}
                      style={{
                        height: 45,
                        width: '95%',
                        borderWidth: 1,
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      <Text style={{marginLeft: 10}}>{Currentdate}</Text>
                      <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={date => {
                          setOpen(false);
                          setDate(date);
                        }}
                        onCancel={() => {
                          setOpen(false);
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View> */}
                <View style={{flexDirection: 'row', width: '100%',marginTop:40}}>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      IMAGE 1 (Selfie **)
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        onPress={() => requestCameraPermission()}>
                        <Image
                          source={require('../../../assests/iconcamera.png')}
                          // style={{height:50,width:50}}
                        />
                      </TouchableOpacity>
                      {image !== null ? (
                        <Image
                          source={{uri: image.uri}}
                          style={{height: 80, width: 80}}
                        />
                      ) : (
                        <Image
                          source={require('../../../assests/user_icon.png')}
                          // style={{height:50,width:50}}
                        />
                      )}
                    </View>
                    {useriderror.length > 0 ? (
              <Text
                style={{
                  color: 'red',marginLeft:5,marginTop:10
                }}>
                {useriderror}
              </Text>
            ) : null}
                  </View>
                  <View style={{width: '50%', marginTop: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginBottom: 5,
                      }}>
                      IMAGE 2 (Selfie **)
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        onPress={() => requestCameraPermission2()}>
                        <Image
                          source={require('../../../assests/iconcamera.png')}
                          // style={{height:50,width:50}}
                        />
                      </TouchableOpacity>

                      {image2 !== null ? (
                <Image source={{uri: image2.uris}} style={{height:80,width:80}} />
              ) : <Image
              source={require('../../../assests/user_icon.png')}
              // style={{height:50,width:50}}
            />}
            
                     
                    </View>
                    {channeltypeerror.length > 0 ? (
              <Text
                style={{
                  color: 'red',marginLeft:5,marginTop:10
                }}>
                {channeltypeerror}
              </Text>
            ) : null}
                  </View>
                </View>

                <View style={{width: '100%', paddingVertical: 15,marginTop:40}}>
                  <TouchableOpacity
                 onPress={()=>handleSubmit()}
                    style={{
                      width: '100%',
                      height: 50,
                      backgroundColor: '#00A9FF',
                      borderRadius: 10,
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#fff', fontSize: 20, fontWeight: '500'}}>
                      Check In
                    </Text>
                  </TouchableOpacity>
                </View>
        {/* <ScrollView style={{flex: 1, width: '100%'}}>
          <View style={{width: '100%', paddingHorizontal: 10}}>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => requestCameraPermission()}>
              <Text style={styles.buttonText}>Pick an image 1</Text>
            </TouchableOpacity>
            {useriderror.length > 0 ? (
              <Text
                style={{
                  color: 'red',
                }}>
                {useriderror}
              </Text>
            ) : null}

            <View style={styles.imageContainer}>
              {image !== null ? (
                <Image source={{uri: image.uri}} style={styles.imageBox} />
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => requestCameraPermission2()}>
              <Text style={styles.buttonText}>Pick an image 2</Text>
            </TouchableOpacity>
            {channeltypeerror.length > 0 ? (
              <Text
                style={{
                  color: 'red',
                }}>
                {channeltypeerror}
              </Text>
            ) : null}

            <View style={styles.imageContainer}>
              {image2 !== null ? (
                <Image source={{uri: image2.uris}} style={styles.imageBox} />
              ) : null}
            </View>
          </View>

          <View style={{width: '100%', paddingHorizontal: 10}}>
            {uploading ? (
              <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Upload image</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView> */}
      </View>
    </View>
  );
};

export default Checkincamera;
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,

    paddingHorizontal: 24,
  },

  sectionTitle: {
    fontSize: 24,

    fontWeight: '600',
  },

  sectionDescription: {
    marginTop: 8,

    fontSize: 18,

    fontWeight: '400',
  },

  highlight: {
    fontWeight: '700',
  },

  container: {
    flex: 1,

    alignItems: 'center',

    backgroundColor: '#bbded6',
  },

  selectButton: {
    borderRadius: 5,

    width: 150,

    height: 50,

    backgroundColor: '#8ac6d1',

    alignItems: 'center',

    justifyContent: 'center',
  },

  uploadButton: {
    borderRadius: 5,

    width: 150,

    height: 50,

    backgroundColor: '#ffb6b9',

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 20,
  },

  buttonText: {
    color: 'white',

    fontSize: 18,

    fontWeight: 'bold',
  },

  imageContainer: {
    marginTop: 30,

    marginBottom: 50,

    alignItems: 'center',
  },

  progressBarContainer: {
    marginTop: 20,
  },

  imageBox: {
    width: '100%',

    height: 450,
  },
  errcolor: {
    color: 'red',
    //marginLeft: 25,
  },
  modalBackground: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'column',
    backgroundColor: '#00000090',
  },
});
