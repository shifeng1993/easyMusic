/**
 * 组件名称： BadgeView
 * 功能： 角标容器，提示消息数量
 * 作者： haise
 * 邮箱： shifeng199307@gmail.com
 * props：
 *  renderHTML: function 
 *  badgeText: String
 *  badgeColor: String
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
const {height, width} = Dimensions.get('window');

class BadgeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderHTML(props) {
    if (props) {
      return React.cloneElement(props());
    } else {
      return null;
    }
  }
  _renderBadge() {
    if(this.props.badgeText && this.props.badgeColor){
      return(
        <View
          style={{
          position: 'absolute',
          top: width/5/10,
          right: width/5/4,
          width: width/5/4,
          height: width/5/4,
          borderRadius: width/5/4/2,
          borderWidth: 1,
          borderColor: this.props.badgeColor,
          backgroundColor: '#fff',
          zIndex: 999
        }}>
          <Text style={{
            color: this.props.badgeColor,
            textAlign: 'center',
            fontSize: width/5/7,
            lineHeight: width/5/7 + 5,
            backgroundColor: 'rgba(0,0,0,0)'
          }}>{this.props.badgeText}</Text>
        </View>
      ) 
    }else{
      return null
    }
  }
  render() {
    const {TouchableHighlightStyle, underlayColor, onPress, badgeColor, badgeText} = this.props;
    const renderHTML = this._renderHTML(this.props.renderHTML)
    return (
      <TouchableHighlight
        style={TouchableHighlightStyle}
        underlayColor={underlayColor}
        onPress={onPress}>
        <View
          style={{
          position: 'relative',
          paddingTop: width/5/5,
          paddingBottom: width/5/5
        }}>
          {this._renderBadge()}
          {renderHTML}
        </View>
      </TouchableHighlight>
    );
  }
}

export default BadgeView;