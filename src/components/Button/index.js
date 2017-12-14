/**
 * 组件名称： Button
 * 功能： 按钮
 * 作者： 刘书鹏
 * 邮箱： 807028828@qq.com
 * props：
 *  type:String             按钮类型 emun{'first', 'second', 'warning'}
 *  size: String            按钮规格 emun{'lg','sm'}
 *  disabled: boolen        是否可以点击
 *  title: String           按钮文字
 *  onPress: Function       绑定事件
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import utils from '../../utils';

const width = utils.getWidth(); 

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  debounce = true  // 防止单身五百年的手速
  static defaultProps = {
    type: 'first',
    size: 'lg',
    disabled: false,
    onPress:()=>{}
  };
  render() {
    let backgroundColor;
    let borderColor;
    let color;
    let btnWidth;
    if (this.props.size === 'lg') {
      btnWidth = width / 1.27
    } else if (this.props.size === 'sm') {
      btnWidth = width / 1.59
    }

    if (this.props.disabled) {
      if (this.props.type === 'first') {
        color = '#555a60';
        backgroundColor = '#1a2632';
        borderColor = '#1a2632';
      } else if (this.props.type === 'second') {
        color = '#555a60';
        backgroundColor = 'rgba(0,0,0,0)';
        borderColor = '#555a60';
      } else if (this.props.type === 'warning') {
        color = '#575c63';
        backgroundColor = '#52393f';
        borderColor = '#575c63';
      } else {
        color = '#555a60';
        backgroundColor = '#1a2632';
        borderColor = '#1a2632';
      }
      return (
        <View
          style={[
          styles.btnStyle, {
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            width: btnWidth
          }
        ]}>
          <Text
            style={[
            styles.btnText, {
              color: color
            }
          ]}>{this.props.title}</Text>
        </View>
      )
    } else {
      if (this.props.type === 'first') {
        color = '#fff';
        backgroundColor = '#1786c6';
        borderColor = '#1786c6';
      } else if (this.props.type === 'second') {
        color = '#1786c6';
        backgroundColor = 'rgba(0,0,0,0)';
        borderColor = '#1786c6';
      } else if (this.props.type === 'warning') {
        color = '#fff';
        backgroundColor = '#e64340';
        borderColor = '#e64340';
      } else {
        color = '#fff';
        backgroundColor = '#1786c6';
        borderColor = '#1786c6';
      }
      return (
        <TouchableOpacity
          style={[
          styles.btnStyle, {
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            width: btnWidth
          }
        ]}
          activeOpacity={0.8}
          onPress={()=>{
            // 防止单身五百年的手速
            if(this.debounce) {
              this.debounce = false;
              this.props.onPress();
              setTimeout(() => {this.debounce = true},500);
            }
          }}>
          <Text
            style={[
            styles.btnText, {
              color: color
            }
          ]}>{this.props.title}</Text>
        </TouchableOpacity>
      )
    }
  }

}

const styles = StyleSheet.create({
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    height: width / 7.4,
    alignItems: 'center'
  },
  btnText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center'
  }
})