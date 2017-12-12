import React, {Component} from 'react';
import {
  ScrollView,View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>我是首页</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
})

export default Home;