import React, { Component } from 'react';
import {
  View
} from 'react-native';
import BaseStyle from '../../common/BaseStyle';


export default class RootView extends Component {
  static defaultProps = {
    style: null,
  };

  render() {
    return (
      <View style={[{
        flex: 1,
        backgroundColor: BaseStyle.color.bgColor
      },this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}