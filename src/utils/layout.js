import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Layout extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView contentContainerStyle={{height: '100%'}}>
          {this.props.children}
        </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Layout;
