import React, {Component} from 'react';
import {Dimensions, Platform} from 'react-native';

export default class utils {
  static isIphoneX() {
    const {height, width} = Dimensions.get('window');
    let iphoneXAspect = parseFloat((height / width).toString().substring(0, 5))
    if (Platform.OS === 'ios' && iphoneXAspect === 2.165) {
      return true
    } else {
      return false
    }
  }
}