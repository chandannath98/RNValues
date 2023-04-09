import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  PermissionsAndroid,
  View,
  Platform,
  Image,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

function Report() {
  const [image, setImage] = useState(null);
  const [imagepath, setimagepath] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imageUrl, setImageUrl] = useState(undefined);


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
      console.log('response==>', response.assets[0].uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};

        console.log(source);
        setImage(source);
     
      }
    });
  };
  
  const editUserProfile = async () => {

      var data = new FormData();
      data.append('salesmenable_id', 4);
      data.append('userable_id', 2);
      data.append('longitude', 12312313);
      data.append('latitude', 23423423);
      data.append('pincode', 201101);
      data.append('distance_km', 30);
      data.append('distance_time', 30);
      data.append('photo_one', {
        uri: image?.uri,
        name: 'rn_image_picker_lib_temp_63e2cb63-760b-4eea-9746-739679611b84.jpg',
        type: 'image/jpg',
      });
      data.append('photo_two', {
        uri: image?.uri,
        name: 'rn_image_picker_lib_temp_63e2cb63-760b-4eea-9746-739679611b84.jpg',
        type: 'image/jpg',
      });

      await axios.post('https://rnsvalves.com/api/v1/sales/checkin', data,
       {
          headers: {
            Authorization: 'Bearer 1|5XJC4R3nIEvzJzdTMvO4PSYEqjVpdepQeLERUPiC',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('====================================');
         console.log(response.data);
         console.log('====================================');
        })
        .catch(error => {
         console.log('====================================');
         console.log(error);
         console.log('====================================');
        });
   
      }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}>
      <View style={{paddingVertical: 10}}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => requestCameraPermission()}>
          <Text style={styles.buttonText}>Pick an image</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {image !== null ? (
            <Image source={{uri: image.uri}} style={styles.imageBox} />
          ) : null}

          {uploading ? (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={transferred} width={300} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => editUserProfile()}
            >
              <Text style={styles.buttonText}>Upload image</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

export default Report;

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
    width: 300,

    height: 300,
  },
  errcolor: {
    color: 'red',
    //marginLeft: 25,
  },
});
