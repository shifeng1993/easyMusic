import React, {Component} from 'react';
import {View, Dimensions, Platform, Image, Text} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import utils from '../utils'; // 识别iphonex

// 引入页面容器
import {Findsuggest, Friends, Radio} from '../pages';


/* ****************************** tabbar ****************************** */
const Find = createMaterialTopTabNavigator({
  Findsuggest: Findsuggest,
  Friends: Friends,
  Radio: Radio
}, {
  swipeEnabled: true, 
  animationEnabled: true, 
  initialRouteName: 'Findsuggest',
  navigationOptions: ({navigation}) => ({
    tabBarLabel: ({focused,tintColor}) => {
      const { routeName } = navigation.state;
      let text;
      switch (routeName) {
        case 'Findsuggest':
          text = '推荐';
          break;
        case 'Friends':
          text = '朋友';
          break;
        case 'Radio':
          text = '电台';
            break;
        default:
          break;
      }
      return <Text style={{color: tintColor, fontSize: 14}}>{text}</Text>;
    }
  }),
  tabBarOptions: {
    // label和icon的背景色 活跃状态下（选中） ios
    activeBackgroundColor: '#rgba(0,0,0,0)',
    // label和icon的前景色 活跃状态下（选中）
    activeTintColor: 'rgba(255,255,255,1)',
    // label和icon的背景色 不活跃状态下（未选中） ios
    inactiveBackgroundColor: 'rgba(0,0,0,0)',
    // label和icon的前景色 不活跃状态下(未选中)
    inactiveTintColor: 'rgba(255,255,255,0.7)',
    showIcon: false,
    showLabel: true,
    style: {
      backgroundColor: '#ce3d3a',
      border: 0,
      borderColor: "rgba(0,0,0,0)"
    },
    indicatorStyle:{
      backgroundColor: '#fff',
      height: 3,
      borderRadius:2
    }
  }
});

export default Find;