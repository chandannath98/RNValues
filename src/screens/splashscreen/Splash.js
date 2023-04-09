import React from "react";
import {View,Text, Image} from "react-native";
import Layout from "../../utils/layout";

const Splash = () =>{
  return(
    
      <View style={{flex:1}}>


        <View style={{flex:4,justifyContent:'center',alignItems:'center'}}>
          <Image
          style={{width:328,height:262}}
           source={require('../../assests/SplashScreen/image_1.png')}
          />

        </View>


        <View style={{flex:1,justifyContent:"flex-end"}}>
        <Image
          style={{width:428,height:95,position:'absolute'}}
           source={require('../../assests/SplashScreen/Vector_13.png')}
          />
        <Image
          style={{width:428,height:116}}
           source={require('../../assests/SplashScreen/Vector_14.png')}
          />
         

        </View>
   
      </View>
 
  )
}

export default Splash;