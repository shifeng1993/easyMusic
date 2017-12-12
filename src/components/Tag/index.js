/**
 * 组件名称： Tag
 * 功能： 标签Tag
 * 作者： 刘书鹏
 * 邮箱： 807028828@qq.com
 * props：
 *  type  Number    类型，控制显示的文字及背景色
 *  size  Number    文字大小，默认为12
 *  text  String    覆盖默认的type对应的文字描述
 *
 *  业务服务对应关系 null-未知  1-严重  2-告警 3-正常
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

export default class Tag extends Component{
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: this.filterColor(this.props.type),
      name: this.props.text || this.filterName(this.props.type),
      size: this.props.size || 12
    };
  }


  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
          <Text style={{color: '#fff', fontSize: this.state.size}}>{this.state.name}</Text>
      </View>
    )
  }

  filterColor(tagType) {
    switch(tagType) {
      case 0:
        return '#7351a3';
      case 1:
        return '#f7ba2a';
      case 2:
        return '#13ce66';
      case 3:
        return '#23a8f8';
      case 4:
        return '#648bb8';
      case 5: 
        return '#4dc8eb';

      case 8:
        return '#648bb8';

      case 10:
        return '#648bb8';
      case 11:
        return '#e63434';
      case 12:
        return '#f3a52e';
      case 13:
        return '#25bf4d';
        
      case 20:
        return '#e0653a';
      case 21:
        return '#c5518e';
      case 22:
        return '#23a8f8';
      case 23:
        return '#13ce66';
      
      case 26:
        return '#3fe04b';
      case 27:
        return '#fb0808'    
    }
  }

  filterName(tagType) {
    switch(tagType) {
      case 0:
        return '事件';
      case 1: 
        return '问题';
      case 2: 
        return '变更';
      case 3: 
        return '发布';
      case 4: 
        return '特殊运维';
      case 5: 
        return '知识工单';

      case 8:
        return '待处理';
      

      case 10:
        return '未知';
      case 11:
        return '严重';
      case 12:
        return '告警';
      case 13:
        return '正常';
        
      case 20:
        return '文档';
      case 21:
        return '资产';
      case 22:
        return '主机';
      case 23:
        return '命令';    
        return '资产'; 
      case 26: 
        return '创建成功';
      case 27:
        return '创建失败';       
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  }
});