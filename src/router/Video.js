import React, {Component} from 'react';
import {View, Dimensions, Platform, Image, Text} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import utils from '../utils'; // 识别iphonex

// 引入页面容器
import {Videosuggest, Music, Showtime, MV, TwoDimensions} from '../pages';

/* ****************************** tabbar ****************************** */
const Video = createMaterialTopTabNavigator({
  Videosuggest: Videosuggest,
  Music: Music,
  Showtime: Showtime,
  MV: MV,
  TwoDimensions: TwoDimensions,
}, {
  swipeEnabled: true, 
  animationEnabled: true, 
  initialRouteName: 'Videosuggest',
  navigationOptions: ({navigation}) => ({
    tabBarLabel: ({focused,tintColor}) => {
      const { routeName } = navigation.state;
      let text;
      let fontSize;
      switch (routeName) {
        case 'Videosuggest':
          text = '推荐';
          fontSize = 14;
          break;
        case 'Music':
          text = '音乐';
          fontSize = 14;
          break;
        case 'Showtime':
          text = 'Showtime';
          fontSize = 12;
          break;
        case 'MV':
          text = 'MV';
          fontSize = 12;
          break;
        case 'TwoDimensions':
          text = '二次元';
          fontSize = 14;
          break;
        default:
          break;
      }
      return <Text style={{color: tintColor, fontSize: fontSize}}>{text}</Text>;
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

export default Video;