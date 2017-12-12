import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Text>我是登录页面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
})

export default Login;