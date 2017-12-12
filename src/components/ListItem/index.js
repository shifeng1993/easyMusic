/**
 * 组件名称： ListItem
 * 功能： 列表项
 * 作者： haise
 * 邮箱： shifeng199307@gmail.com
 * props：
 *  type: String                        列表项类型 emun{'base','advanced'}
 *  title: String                       基础列表和高级列表的标题
 *  value: String                       基础列表的值
 *  iconName: String                    左侧icon的名称
 *  rightComponent: react.component     右侧组件
 *  showRightIcon: boolen               显示右侧箭头icon
 *  dropDownComponent: react.component  下拉组件
 *
 * event:
 *  onPress                          点击事件
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false
    };
  }
  static defaultProps = {
    type: 'advanced',
    title: null,
    value: null,
    iconName: null,
    showRightIcon: true,
    onPress: () => {},
    dropDownComponent: null,
    rightComponent: null
  }
  render() {
    if (this.props.type === 'base') {
      return (
        <View
          style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: ThemeStyle.cardColor,
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingTop: 12,
          paddingBottom: 12
        }}>
          <Text
            style={{
            flex: 1,
            fontSize: 16,
            textAlign: 'left',
            paddingLeft: 15,
            color: ThemeStyle.subtitleColor
          }}>{this.props.title}</Text>
          {this.props.rightComponent? this.props.rightComponent() : <Text
            style={{
            flex: 1,
            fontSize: 16,
            textAlign: 'right',
            paddingRight: 15,
            color: ThemeStyle.textColor
          }}>{this.props.value}</Text>}
        </View>
      )
    } else if (this.props.type === 'advanced') {
      return (
        <View
          style={{
          width: width,
          backgroundColor: ThemeStyle.cardColor
        }}>
          <TouchableOpacity
            style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            height: 45
          }}
            activeOpacity={0.8}
            onPress={!this.props.dropDownComponent
            ? this.props.onPress
            : this.toogleDropDownComponent}>
            {this._returnIcon()}
            <Text
              style={{
              flex: 1,
              color: '#fff',
              fontSize: 14
            }}>{this.props.title}</Text>
            {this.props.showRightIcon
              ? (this.state.showDropDown ? <Icon name='bottom-bold' size={18} color={'#90c2f9'}/>:<Icon name='right-bold' size={18} color={'#90c2f9'}/>)
              : null}
          </TouchableOpacity>
          <View>
            {this.state.showDropDown? this.props.dropDownComponent() : null}
          </View>
        </View>
      );
    }
  }
  toogleDropDownComponent = () => {
    if(!this.props.dropDownComponent) {
      return
    }
    if(this.state.showDropDown) {
      this.setState({showDropDown: false})
    } else {
      this.setState({showDropDown: true})
    }
  }
  _returnIcon = () => {
    if (!this.props.iconName) {
      return <Text/>
    } else {
      return <Icon
        name={this.props.iconName}
        size={22}
        style={{
        marginRight: 10
      }}
        color={ThemeStyle.importantText_1}/>
    }
  }
}

export default ListItem;

const styles = StyleSheet.create({})