import React, {Component} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {StatusBar, Navigator} from '../../components'
import Middle from './Middle';

// 设置常量
const {height, width} = Dimensions.get('window');

export default class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={ThemeStyle.important_1}
          barStyle={"light-content"}
          translucent={false}/>
        <Navigator
          backgroundColor={ThemeStyle.important_1}
          renderLeft={this._navigatorLeft}
          renderMiddle={this._navigatorMiddle}
          renderRight={this._navigatorRight}
          translucent={false}/>
      </View>
    );
  }
  _navigatorMiddle = () => {
    const props = this.props
    return (
      <Middle {...props}/>  
    );
  }
  _navigatorLeft = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={() => alert('are you ok?')}>
        <Icon style={{flex:1,textAlign:'center'}} name="list-ul" size={20} color="#fff"/>
      </TouchableOpacity>
    )
  }
  _navigatorRight = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={() => alert('are you ok?')}>
        <Icon style={{flex:1,textAlign:'center'}} name="search" size={20} color="#fff"/>
      </TouchableOpacity>
    )
  }
}
