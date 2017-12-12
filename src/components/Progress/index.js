/**
 * 组件名称：Progress
 * 功能：进度条
 * 作者：xin
 * props:
 *  value: Number|String       进度的百分比 0 - 100
 */
import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View
} from 'react-native';
import BaseStyle from '../../common/BaseStyle';

export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value * 1
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../images/progress.jpg')}
          resizeMode={'cover'}
          style={{flex: this.state.value}}>
          <ImageBackground
            source={require('../../images/light.png')}
            resizeMode={'cover'}
            style={{width: 20, height: 14, position: 'absolute', right: 0, top: -2}}
          />
        </ImageBackground>
        <View style={{flex: 100 - this.state.value}}/>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    height: 14,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: BaseStyle.card.borderColor,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingTop: 2,
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: 2
  },
  left: {
    height: 12
  }
});