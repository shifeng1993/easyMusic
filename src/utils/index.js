import React, {Component} from 'react';
import {Dimensions, Platform} from 'react-native';
import Orientation from 'react-native-orientation';

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
  static getWidth() {
    const {height, width} = Dimensions.get('window');
    const newWidth = (Orientation.getInitialOrientation() === 'PORTRAIT')
      ? width
      : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
        ? width
        : height))
    return newWidth
  }
}