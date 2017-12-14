import React, {Component} from 'react';
import {View} from 'react-native';

export default class RootView extends Component {
  static defaultProps = {
    style: null
  };

  render() {
    return (
      <View style={[{flex: 1,backgroundColor: ThemeStyle.weak_1},this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}