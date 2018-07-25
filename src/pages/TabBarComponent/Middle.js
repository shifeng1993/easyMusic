import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated} from 'react-native';
import utils from '../../utils'

export default class Middle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const routes = this.props.navigation.state.routes;
    return (
      <View style={[styles.tabbarContainer, {width: newWidth / 2.5}]}>
        {routes && routes.map((route, index) => this.renderItem(route, index))}
      </View>
    );
  }

  renderItem = (route, index) => {
    const {navigation, jumpTo} = this.props;
    const focused = index === navigation.state.index;
    let TabScene = {
      route: route,
      tintColor: this.props.activeTintColor
    };
    return (
      <TouchableOpacity
        key={route.key}
        activeOpacity={0.8}
        style={[
        styles.tabItem
      ]}
        onPress={() => focused ? null : jumpTo(route.key)}>
        <View style={[styles.tabItem,{opacity: focused ? 1 : 0.7}]}>
          {this.props.renderIcon(TabScene)}
        </View>
      </TouchableOpacity>
    );
  };
}
const styles = StyleSheet.create({
  tabbarContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex:1,
    height: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});