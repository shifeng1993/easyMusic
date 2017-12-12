/**
 * 组件名称： Navigator
 * 功能： 头部导航
 * 作者： haise
 * 邮箱： shifeng199307@gmail.com
 * props：
 *  backgroundColor: String       导航栏的背景颜色，非线性
 *  title: String                 中间字体名称
 *  titleColor: String            中间字体颜色
 *  translucent: Boolen           是否为沉浸式导航栏
 *  renderLeft: function          ()=> <Text>我是左</Text>
 *  renderMiddle: function        ()=> <Text>我是中</Text>
 *  renderRight: function         ()=> <Text>我是右</Text>
 *  line: Boolen                  开启线性渐变，
 *  lineColors: Array             线性渐变颜色，
 *  lineStart: Object             线性渐变起始坐标，
 *  lineEnd: Object               线性渐变结束坐标
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
  StatusBar,
  Platform,
  TouchableOpacity
} from 'react-native';
import Orientation from 'react-native-orientation';
import LinearGradient from 'react-native-linear-gradient';
import utils from '../../utils'; // 识别iphonex

const {height, width} = Dimensions.get('window');
const isIphoneX = utils.isIphoneX();

export default class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static defaultProps = {
    backgroundColor: 'rgba(0,0,0,0)',
    title: '',
    titleColor: '#000',
    translucent: false,
    renderLeft: null,
    renderMiddle: null,
    renderRight: null,
    line: false,
    lineColors: [],
    lineStart: {
      x: 0.0,
      y: 1.0
    },
    lineEnd: {
      x: 1.0,
      y: 1.0
    }
  };

  render() {
    const renderLeft = this._renderLeft(this.props.renderLeft)
    const renderRight = this._renderRight(this.props.renderRight)
    let renderMiddle;
    if (this.props.renderMiddle) {
      renderMiddle = this._renderMiddle(this.props.renderMiddle)
    } else {
      renderMiddle = this._renderTitle(this.props.title)
    }
    if (this.props.translucent) {
      return (
        <View
          style={[
          styles.header1, {
            backgroundColor: this.props.backgroundColor
          }
        ]}>
          {renderLeft}
          <View style={styles.headerMiddle}>
            {renderMiddle}
          </View>
          {renderRight}
        </View>
      );
    } else {
      if (this.props.line) {
        return (
          <LinearGradient
            colors={this.props.lineColors}
            start={this.props.lineStart} end={this.props.lineEnd}
            style={styles.header}>
            {renderLeft}
            <View style={styles.headerMiddle}>
              {renderMiddle}
            </View>
            {renderRight}
          </LinearGradient>
        );
      } else {
        return (
          <View
            style={[
            styles.header, {
              backgroundColor: this.props.backgroundColor
            }
          ]}>
            {renderLeft}
            <View style={styles.headerMiddle}>
              {renderMiddle}
            </View>
            {renderRight}
          </View>
        );
      }
    }
  }
  _renderLeft = (props) => {
    if (props) {
      return (
        <TouchableOpacity style={styles.headerLeft} activeOpacity={1}>
          {React.cloneElement(props())}
        </TouchableOpacity>
      )
    } else {
      return null;
    }
  }
  _renderRight = (props) => {
    if (props) {
      return (
        <View style={styles.headerRight}>
          {React.cloneElement(props())}
        </View>
      )
    } else {
      return null;
    }
  }
  _renderMiddle = (props) => {
    if (props) {
      return React.cloneElement(props());
    } else {
      return null;
    }
  }
  _renderTitle = () => {
    if (this.props.title && this.props.titleColor) {
      return (
        <Text
          style={{
          color: this.props.titleColor,
          backgroundColor: 'rgba(0,0,0,0)',
          textAlign: 'center',
          fontSize: 18
        }}>{this.props.title}</Text>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 10,
    position: 'relative',
    height: (Orientation.getInitialOrientation() === 'PORTRAIT')
      ? (width / 8)
      : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
        ? (width / 8)
        : (height / 8))),
    alignItems: 'center'
  },
  header1: {
    flexDirection: 'row',
    padding: 10,
    position: 'absolute',
    width: width,
    top: Platform.OS === 'ios'
      ? (isIphoneX
        ? 44
        : 20)
      : StatusBar.currentHeight,
    height: (Orientation.getInitialOrientation() === 'PORTRAIT')
      ? (width / 8)
      : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
        ? (width / 8)
        : (height / 8))),
    alignItems: 'center',
    zIndex: 1
  },
  headerLeft: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0)'
  },
  headerMiddle: {
    flex: 8,
    paddingLeft: 5,
    paddingRight: 5
  },
  headerRight: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0)'
  }
});
