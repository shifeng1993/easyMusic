import React, {Component} from 'react';
import { View, Dimensions, Platform, Image} from 'react-native';
import {DrawerNavigator, TabNavigator} from 'react-navigation';
import Orientation from 'react-native-orientation';
import BaseStyle from '../common/BaseStyle';
import utils from '../utils'; // 识别iphonex

// 引入页面容器
import {Home, Monitor, BusinessMain, AlarmMain, SetUp, DrawerComponent} from '../pages';

// 设置常量
const {height, width} = Dimensions.get('window');
const isIphoneX = utils.isIphoneX()

/* ****************************** tabbar ****************************** */

const tabbar = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '工作台',
      tabBarIcon: ({tintColor, focused}) => (focused
        ? <View
        style={{
        width: 23,
        height: 22,
        position: 'relative'
      }}><Image
        source={require('../images/tabbarIcon/Home-active.png')}
        style={{
        width: 23,
        height: 22,
        zIndex: BaseStyle.zIndex.NavigationIndex + 3
      }}/><Image
        source={require('../images/tabbarIcon/active-background.png')}
        style={{
        width: (Orientation.getInitialOrientation() === 'PORTRAIT')
          ? (width / 5)
          : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
            ? (width / 5)
            : (height / 5))),
        height: (Orientation.getInitialOrientation() === 'PORTRAIT')
          ? (width / 7.5)
          : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
            ? (width / 7.5)
            : (height / 7.5))),
        position: 'absolute',
        zIndex: BaseStyle.zIndex.NavigationIndex + 2,
        left: -width / 14.5,
        top: (Platform.OS === 'ios') ? -width/ 60 : -width/ 47
      }}/></View>
        : <Image
          source={require('../images/tabbarIcon/Home.png')}
          style={{
          width: 23,
          height: 22
        }}/>),
      tabBarOnPress: (({
        route,
        index
      }, jumpToIndex) => {
        jumpToIndex(index);
      })
    }
  },
  Monitor: {
    screen: Monitor,
    navigationOptions: {
      tabBarLabel: '监控',
      tabBarIcon: ({tintColor, focused}) => (focused
        ? <View
            style={{
            width: 26,
            height: 22,
            position: 'relative'
          }}><Image
            source={require('../images/tabbarIcon/Monitor-active.png')}
            style={{
            width: 26,
            height: 22,
            zIndex: BaseStyle.zIndex.NavigationIndex + 3
          }}/><Image
            source={require('../images/tabbarIcon/active-background.png')}
            style={{
            width: (Orientation.getInitialOrientation() === 'PORTRAIT')
              ? (width / 5)
              : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
                ? (width / 5)
                : (height / 5))),
            height: (Orientation.getInitialOrientation() === 'PORTRAIT')
              ? (width / 7.5)
              : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
                ? (width / 7.5)
                : (height / 7.5))),
            position: 'absolute',
            zIndex: BaseStyle.zIndex.NavigationIndex + 2,
            left: -width / 14.5,
            top: (Platform.OS === 'ios') ? -width/ 60 : -width/ 47
          }}/></View>
        : <Image
          source={require('../images/tabbarIcon/Monitor.png')}
          style={{
          width: 26,
          height: 22
        }}/>),
      tabBarOnPress: (({
        route,
        index
      }, jumpToIndex) => {
        jumpToIndex(index);
      })
    }
  },
  Business: {
    screen: BusinessMain,
    navigationOptions: {
      tabBarLabel: '业务',
      tabBarIcon: ({tintColor, focused}) => (focused
        ? <View
        style={{
        width: 25,
        height: 22,
        position: 'relative'
      }}><Image
        source={require('../images/tabbarIcon/Business-active.png')}
        style={{
        width: 25,
        height: 22,
        zIndex: BaseStyle.zIndex.NavigationIndex + 3
      }}/><Image
        source={require('../images/tabbarIcon/active-background.png')}
        style={{
        width: (Orientation.getInitialOrientation() === 'PORTRAIT')
          ? (width / 5)
          : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
            ? (width / 5)
            : (height / 5))),
        height: (Orientation.getInitialOrientation() === 'PORTRAIT')
          ? (width / 7.5)
          : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
            ? (width / 7.5)
            : (height / 7.5))),
        position: 'absolute',
        zIndex: BaseStyle.zIndex.NavigationIndex + 2,
        left: -width / 14.5,
        top: (Platform.OS === 'ios') ? -width/ 60 : -width/ 47
      }}/></View>
        : <Image
          source={require('../images/tabbarIcon/Business.png')}
          style={{
          width: 25,
          height: 22
        }}/>),
      tabBarOnPress: (({
        route,
        index
      }, jumpToIndex) => {
        jumpToIndex(index);
      })
    }
  },
  Alarm: {
    screen: AlarmMain,
    navigationOptions: {
      tabBarLabel: '告警',
      tabBarIcon: ({tintColor, focused}) => (focused
        ? <View
        style={{
        width: 23,
        height: 22,
        position: 'relative'
      }}><Image
        source={require('../images/tabbarIcon/Alarm-active.png')}
        style={{
        width: 23,
        height: 22,
        zIndex: BaseStyle.zIndex.NavigationIndex + 3
      }}/><Image
        source={require('../images/tabbarIcon/active-background.png')}
        style={{
        width: (Orientation.getInitialOrientation() === 'PORTRAIT')
          ? (width / 5)
          : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
            ? (width / 5)
            : (height / 5))),
        height: (Orientation.getInitialOrientation() === 'PORTRAIT')
          ? (width / 7.5)
          : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
            ? (width / 7.5)
            : (height / 7.5))),
        position: 'absolute',
        zIndex: BaseStyle.zIndex.NavigationIndex + 2,
        left: -width / 14.5,
        top: (Platform.OS === 'ios') ? -width/ 60 : -width/ 47
      }}/></View>
        : <Image
          source={require('../images/tabbarIcon/Alarm.png')}
          style={{
          width: 23,
          height: 22
        }}/>),
      tabBarOnPress: (({
        route,
        index
      }, jumpToIndex) => {
        jumpToIndex(index);
      })
    }
  },
  SetUp: {
    screen: SetUp,
    navigationOptions: {
      tabBarLabel: '设置',
      tabBarIcon: ({tintColor, focused}) => (focused
        ? <View
        style={{
        width: 23,
        height: 22,
        position: 'relative'
      }}><Image
        source={require('../images/tabbarIcon/SetUp-active.png')}
        style={{
        width: 23,
        height: 22,
        zIndex: BaseStyle.zIndex.NavigationIndex + 3
      }}/><Image
        source={require('../images/tabbarIcon/active-background.png')}
        style={{
        width: (Orientation.getInitialOrientation() === 'PORTRAIT')
          ? (width / 5)
          : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
            ? (width / 5)
            : (height / 5))),
        height: (Orientation.getInitialOrientation() === 'PORTRAIT')
          ? (width / 7.5)
          : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
            ? (width / 7.5)
            : (height / 7.5))),
        position: 'absolute',
        zIndex: BaseStyle.zIndex.NavigationIndex + 2,
        left: -width / 14.5,
        top: (Platform.OS === 'ios') ? -width/ 60 : -width/ 47
      }}/></View>
        : <Image
          source={require('../images/tabbarIcon/SetUp.png')}
          style={{
          width: 23,
          height: 22
        }}/>),
      tabBarOnPress: (({
        route,
        index
      }, jumpToIndex) => {
        jumpToIndex(index);
      })
    }
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  // 懒加载
  lazy: true,
  backBehavior: 'initialRoute',
  tabBarOptions: {
    style: {
      height: (Orientation.getInitialOrientation() === 'PORTRAIT')
        ? (width / 7.5 + (isIphoneX ? 25 : 0))
        : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
          ? (width / 7.5 + (isIphoneX ? 25 : 0))
          : (height / 7.5) + (isIphoneX ? 25 : 0))),
      backgroundColor: '#0e2135',
      borderTopWidth: 0,
      borderColor: '#e4e4e4',
      paddingBottom: isIphoneX
        ? 25
        : 0,
      zIndex: BaseStyle.zIndex.NavigationIndex
    },
    labelStyle: {
      height: (Orientation.getInitialOrientation() === 'PORTRAIT')
        ? (width / 20)
        : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
          ? (width / 20)
          : (height / 20))),
      fontSize: (Orientation.getInitialOrientation() === 'PORTRAIT')
        ? (width / 35)
        : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
          ? (width / 35)
          : (height / 35))),
      marginTop: (Platform.OS === 'ios')
        ? (Orientation.getInitialOrientation() === 'PORTRAIT')
        ? (width / 22)
        : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
          ? (width / 22)
          : (height / 22)))
        : ((Orientation.getInitialOrientation() === 'PORTRAIT')
        ? (width / -31.25)
        : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
          ? (width / -31.25)
          : (height / -31.25)))),
      marginBottom: (Orientation.getInitialOrientation() === 'PORTRAIT')
      ? (width / -125)
      : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
        ? (width / -125)
        : (height / -125)))
    },
    // 图标的样式 android
    iconStyle: {
      width: (Orientation.getInitialOrientation() === 'PORTRAIT')
      ? (width / 5)
      : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
        ? (width / 5)
        : (height / 5))),
      height: (Orientation.getInitialOrientation() === 'PORTRAIT')
        ? (width / 7.5)
        : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
          ? (width / 7.5)
          : (height / 7.5))),
      marginTop: (Orientation.getInitialOrientation() === 'PORTRAIT')
      ? (width / -26.5)
      : (((Orientation.getInitialOrientation() === 'PORTRAITUPSIDEDOWN')
        ? (width / -26.5)
        : (height / -26.5)))
    },
    // 隐藏android底部多出来的线
    indicatorStyle: {
      height: 0
    },
    // 是否启用可滚动选项卡
    scrollEnabled: false,
    // label和icon的背景色 活跃状态下（选中） ios
    activeBackgroundColor: '#0e2135',
    // label和icon的前景色 活跃状态下（选中）
    activeTintColor: '#fff',
    // label和icon的背景色 不活跃状态下（未选中） ios
    inactiveBackgroundColor: '#0e2135',
    // label和icon的前景色 不活跃状态下(未选中)
    inactiveTintColor: '#185598',
    // 是否显示label，默认开启
    showLabel: true,
    // 是否显示图标，默认关闭 android
    showIcon: true
  }
});

/* ****************************** 抽屉导航 ****************************** */
const Main = DrawerNavigator({
  main: {
    screen: tabbar,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      drawerWidth: width * 0.86
    }
  }
}, {
  contentComponent: props => (<DrawerComponent props={props}></DrawerComponent>)
})

export default Main;