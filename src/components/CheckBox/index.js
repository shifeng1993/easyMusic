/**
 * 组件名称： CheckBox
 * 功能： 复选框
 * 作者： haise
 * 邮箱： shifeng199307@gmail.com
 * props：
 *  opacity: number                         点击透明度，默认黑色 0.8
 *  model: string || number                 双向绑定的值      （父传子）
 *  returnModel: func                       model => this._returnModel(model) （子传父）
 *  disabled: boolen                        是否禁用多选
 *  label: string                           多选框的label
 * 使用示例：
 * 父组件需添加箭头函数
 * _returnModel = (model) => {}
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

const {height, width} = Dimensions.get('window');

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      lineStart: {
        x: 0.0,
        y: 0.5
      },
      lineEnd: {
        x: 1.0,
        y: 1.0
      }
    };
  }
  static defaultProps = {
    opacity: 0.8,
    model: false,
    returnModel: ()=>{},
    disabled: false,
    label: null
  };
  render() {
    if(this.props.disabled) {
      if (!this.props.model) {
        return (
          <View style={styles.container}>
            <View style={[styles.checked,{borderWidth:StyleSheet.hairlineWidth,borderColor:'#293545',backgroundColor:'#121922'}]}></View>
            {this._returnLabel()}
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <View style={[styles.checked,{backgroundColor:'#2a3646'}]}>
              <Icon name={'correct-bold'} size={14} color={'#414e5f'} style={{flex:1,textAlign:'center',backgroundColor:'rgba(0,0,0,0)'}}/>
            </View>
            {this._returnLabel()}
          </View>
        );
      }
    } else {
      if (!this.props.model) {
        return (
          <TouchableOpacity 
            activeOpacity={this.props.opacity}
            onPress={this._toogleChecked}>
            <View style={styles.container}>
              <View style={[styles.checked,{borderWidth:StyleSheet.hairlineWidth,borderColor:ThemeStyle.importantText_1,backgroundColor:'#0a2c44'}]}></View>
              {this._returnLabel()}
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity 
            activeOpacity={this.props.opacity}
            onPress={this._toogleChecked}>
            <View style={styles.container}>
            <LinearGradient 
              colors={ThemeStyle.linearColor}
                start={this.state.lineStart}
                end={this.state.lineEnd}
              style={styles.checked}>
              <Icon name={'correct-bold'} size={14} color={ThemeStyle.textColor} style={{flex:1,textAlign:'center',backgroundColor:'rgba(0,0,0,0)'}}/>
            </LinearGradient>
              {this._returnLabel()}
            </View>
          </TouchableOpacity>
        );
      }
    }
  }
  _returnLabel = () => {
    if(!this.props.label) {
      return null
    } else {
      return <Text style={{color:ThemeStyle.textColor,marginLeft:5}}>{this.props.label}</Text>
    }
  }
  _toogleChecked = () => {
    if (this.props.model) {
      this.props.returnModel(false)
    } else {
      this.props.returnModel(true)
    }
  }
}

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor:'rgba(0,0,0,0)'
  },
  checked: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 18,
    height: 18,
    borderRadius: 5
  }
})