import React, {Component} from 'react';
import {View, Dimensions, Platform, Image, Text} from 'react-native';
import {createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import {TabBarComponent} from '../pages';
import utils from '../utils'; // 识别iphonex
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// 引入页面容器
import {My} from '../pages';
import Find from './Find';
import Video from './Video';
// 设置常量
const {height, width} = Dimensions.get('window');
const isIphoneX = utils.isIphoneX()

/* ****************************** tabbar ****************************** */
const tabbar = createMaterialTopTabNavigator({
  My: My,
  Find: Find,
  Video: Video
}, {
  backBehavior: 'initialRoute', // 后退切换到初始route
  swipeEnabled: true, 
  animationEnabled: true, 
  initialRouteName: 'My',
  tabBarComponent: props => <TabBarComponent {...props}/>,
  navigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused,tintColor}) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'My':
          iconName = focused ? 'music' : 'music';
          break;
        case 'Find':
          iconName = focused ? 'jsfiddle' : 'jsfiddle';
          break;
        case 'Video':
          iconName = focused ? 'film' : 'film';
            break;
        default:
          break;
      }
      return <Icon name={iconName} size={24} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    // label和icon的背景色 活跃状态下（选中） ios
    activeBackgroundColor: '#rgba(0,0,0,0)',
    // label和icon的前景色 活跃状态下（选中）
    activeTintColor: '#fff',
    // label和icon的背景色 不活跃状态下（未选中） ios
    inactiveBackgroundColor: 'rgba(0,0,0,0)',
    // label和icon的前景色 不活跃状态下(未选中)
    inactiveTintColor: '#e58983',
    showIcon: true,
    showLabel: false
  }
});

/* ****************************** 抽屉导航 ****************************** */
const Main = createDrawerNavigator({
  main: {
    screen: tabbar,
    navigationOptions: {
      // drawerLockMode: 'locked-closed',
      drawerWidth: width * 0.86
    }
  }
}, {
  contentComponent: props => (
    <Text>左侧抽屉导航</Text>
  )
})

export default Main;