/**
 * 组件名称： Radio
 * 功能： 单选框
 * 作者： 刘书鹏
 * 邮箱： 807028828@qq.com
 * props：
 * 
 *  disabled: Boolen（选填/默认：false）       // 是否禁用
 *  radius: Number   （选填/默认：22）         // 单选框的直径 
 * 
 *  value: String/Boolen                    // 单选框对应的value值
 *  onCheck: function                       // 选中操作
 *             例如：checkImpEvent = (value) => {
                      this.setState({
                        isImportentEvents: value
                      });
                    }
 *  checked: 表达式                          // 选中标识 （用于跟其他）
 *             例如：this.state.xxx === 对应的value值  
 */
import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import BaseStyle from '../../common/BaseStyle'

export default class Radio extends Component{
  constructor(props){
    super(props);
  }
  static defaultProps = {
    disabled: false,
    radius: 22,
    onCheck: ()=> {}
  };

  render() {
    let disabledRadius = this.props.radius + 2;
    if(this.props.checked) {
      if(this.props.disabled) {
        return(
          <View style={{width: this.props.radius, height: this.props.radius,
                        borderRadius: this.props.radius/2,flexDirection: 'row', 
                        justifyContent: 'center', alignItems: "center", backgroundColor: '#2a3646'}}>
              <View style={{width:this.props.radius/2,height:this.props.radius/2,
                            borderRadius:this.props.radius/4,backgroundColor:'#414e5f'}}>
              </View>
          </View>
        )
      } else {
        return(
          <LinearGradient colors={BaseStyle.color.linearColor}
              style={{width:this.props.radius,height:this.props.radius,borderRadius:this.props.radius/2,}}
              start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}}>
                <TouchableOpacity onPress={this._pressed.bind(this)} style={{width:this.props.radius,height:this.props.radius,flexDirection:'row',justifyContent:'center',alignItems:"center"}}>
                    <View style={{width:this.props.radius/2,height:this.props.radius/2,borderRadius:this.props.radius/4,backgroundColor:'#fff'}}></View>
                </TouchableOpacity>
          </LinearGradient>
        )
      }
    } else {
      if(this.props.disabled){
        return(
          <View style={{width:this.props.radius,height:this.props.radius,borderRadius:this.props.radius/2,borderWidth:2,
            borderColor:'#283443',backgroundColor:'#121922'}}>
          </View>
        )
      } else {
        return(
          <TouchableOpacity onPress={this._pressed.bind(this)}>
              <View style={{width:this.props.radius,height:this.props.radius,borderRadius:this.props.radius/2,borderWidth:2,
                              borderColor:'#19589f',backgroundColor:'#0a2c44'}}>
              </View>
          </TouchableOpacity>
        )
      }
    }
  }


  _pressed(){
    let {value,onCheck} = this.props;
    onCheck(value);
  }
}