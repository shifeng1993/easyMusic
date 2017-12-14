import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {StatusBar, Navigator, MusicIcon} from '../../components'

// 设置常量
const {height, width} = Dimensions.get('window');

export default class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderItem = (route, index) => {
    const {navigation, jumpToIndex} = this.props;

    const focused = index === navigation.state.index;
    const color = focused
      ? this.props.activeTintColor
      : this.props.inactiveTintColor;
    let TabScene = {
      focused: focused,
      route: route,
      tintColor: color
    };
    return (
      <TouchableOpacity
        key={route.key}
        activeOpacity={0.8}
        style={[
        styles.tabItem, {
          padding: newWidth / 14
        }
      ]}
        onPress={() => focused
        ? null
        : jumpToIndex(index)}>
        <View style={[styles.tabItem]}>
          {this
            .props
            .renderIcon(TabScene)}
          {/* <Text
            style={{
            ...styles.tabText,
            marginTop: 10,
            color
          }}>{this.props.getLabel(TabScene)}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={'#d33a31'}
          barStyle={"light-content"}
          translucent={false}/>
        <Navigator
          backgroundColor={'#d33a31'}
          renderLeft={this._navigatorLeft}
          renderMiddle={this._navigatorMiddle}
          renderRight={this._navigatorRight}
          translucent={false}/>
      </View>
    );
  }
  _navigatorMiddle = () => {
    const routes = this.props.navigation.state.routes;
    return (
      <View style={styles.tabbarContainer}>
        {routes && routes.map((route, index) => this.renderItem(route, index))}
      </View>
    );
  }
  _navigatorLeft = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={() => alert('are you ok?')}>
        <MusicIcon style={{flex:1,textAlign:'center'}} name="liebiao1" size={20} color="#fff"/>
      </TouchableOpacity>
    )
  }
  _navigatorRight = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={() => alert('are you ok?')}>
        <MusicIcon style={{flex:1,textAlign:'center'}} name="sousuo2" size={20} color="#fff"/>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  tabbarContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width / 2.5
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});