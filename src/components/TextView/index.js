/**
 * 组件名称： TextView
 * 功能： 带说明的列表项
 * 作者： 刘书鹏
 * 邮箱： 807028828@qq.com
 * props：
 *  leftText: String 
 *  rightText: String
 *  lineHeight: Number 默认：16
 */

import React, { Component } from 'react';
import {StyleSheet, Text, View,Dimensions} from 'react-native';

const {width,height}=Dimensions.get('window');

export default class TextView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.leftText,{lineHeight:this.props.lineHeight ? this.props.lineHeight : 16}]}>{this.props.leftText}</Text>
        <Text style={[styles.rightText,{lineHeight:this.props.lineHeight ? this.props.lineHeight : 16}]}>{this.props.rightText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#212c3a'
  },
  leftText: {
    color: '#a5b5c8',
    fontSize: 16,
  },
  rightText: {
    color: '#fff',
    fontSize: 16,
    maxWidth: (width/10)*5
  }
});

