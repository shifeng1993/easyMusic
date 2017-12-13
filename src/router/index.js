import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import Main from './Main'

// 引入原生切换动画
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

// 引入页面容器
import {
  Login
} from '../pages';

/* ****************************** 总导航 ****************************** */
const AppNavigator = StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,                 // 自带头部置空
      gesturesEnabled: false         // 左侧滑动返回   ios默认开启，android默认关闭
    }
  },
  // 登录
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,                 // 自带头部置空
      gesturesEnabled: false         // 左侧滑动返回   ios默认开启，android默认关闭
    }
  }
}, {
  initialRouteName: 'Main',
  transitionConfig: () => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})
});

export default AppNavigator;