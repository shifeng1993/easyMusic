import React, {Component} from 'react';
import {
  ScrollView,View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import {StatusBar, Navigator} from '../../components';

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
        <Text>什么蛇皮布局</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
})

export default Friend;