import React, {Component} from 'react'

export default class BaseStyle extends Component {
  static color = {
    buttonColor: '#1786c6',                // 按钮颜色
    bgColor:'#0c1520',                     // 容器背景色
    linearColor: ['#1786c6', '#19589f'],   // 线性渐变色
    textColor: '#fff',                     // 字体颜色(白色)
    opacityColor:'rgba(0,0,0,0)',          // 透明色
    contentColor: '#151e29',               // 内容背景色
  };

  static fontSize = {
    fontSize_12: 12,
    fontSize_14: 14,
    fontSize_22: 22,
  };


  static zIndex = {
    ContentIndex: 1,        // 内容层
    NavigationIndex: 10,    // 导航层
    MaskIndex: 100,         // 蒙层 （锁定内容层和导航曾，与弹出层配合使用）
    PopoutIndex: 1000,      // 弹出层
  }

  static margin = {
    margin_10: 10
  };

  static padding = {
    padding_10: 10
  };

  static card = {
    bgColor: '#151e29',
    activeBgColor: '#0e293d',
    borderColor: '#212c3a'
  };

}

