import React, {Component} from "react";
import {Provider, connect} from "react-redux";
import {View, BackHandler, Platform, Dimensions} from "react-native";
import {NavigationActions, addNavigationHelpers} from "react-navigation";
import Orientation from 'react-native-orientation';
import getStore from "./src/store";
import {StatusBar, Navigator, Toast} from './src/components';
import ThemeStyle from './src/common/ThemeStyle';
import BaseStyle from './src/common/BaseStyle'

const {width,height} = Dimensions.get('window');

// 工具部分
import http from './src/utils/http';
import storage from './src/utils/storage';

// 引入路由
import AppNavigator from './src/router';

// 全局组件
global.storage = storage;
global.http = http;
// global.BaseStyle = BaseStyle;

// 定义navigation 用于后面render函数时候完成后导出
let navigation;

// 以下是同步路由状态到redux函数
const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

class App extends Component {
  componentWillMount() {
    // 禁止横屏
    Orientation.lockToPortrait();
  }
  /*处理安卓硬件返回按键 开始*/
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  exit = 0;
  onBackPress = () => {
    const {dispatch, nav} = this.props;
    const currentScreen = this.getCurrentRouteName(nav)
    // 只有在主页面的第一个页面或者是登录页面 才会退出
    if (currentScreen === 'Home' || currentScreen === 'Login' ) {
      this.exit += 1;
      if (this.exit === 1){
        toastShow('再点一次退出')
        setTimeout(() => {
          this.exit = 0;
        }, 2000); 
      } else if (this.exit >= 2) {
        return false
      }
    }
    dispatch(NavigationActions.back());
    return true;
  };
  /*处理安卓硬件返回按键 结束*/

  // 获取当前屏幕名称
  getCurrentRouteName = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }
    return route.routeName;
  }

  render() {
    const {dispatch, nav} = this.props;
    navigation = addNavigationHelpers({dispatch, state: nav});
    global.navigation = navigation
    global.ThemeStyle = ThemeStyle[this.props.config.theme]   // 添加主题全局对象   需要的地方调用 例：ThemeStyle.pageColor
    // 默认底部toastshow
    global.toastShow = (message) => {
      this.refs.Toast.show(message, 2000);
    }
    return (
    <View style={{flex:1}}>
      <AppNavigator navigation={navigation}/>
        <Toast
             ref='Toast'
             style={{backgroundColor:'#38506d',borderRadius:5}}
             position='bottom'
             positionValue={width/3}
             fadeInDuration={600}
             fadeOutDuration={600}
             opacity={0.95}
             textStyle={{color:'#c9d0d7',textAlign:'center',fontSize:16}}
        />
    </View>
    );
  }
}

// 根组件连接状态
const AppWithNavigationState = connect((state) => ({nav: state.nav, config: state.config}))(App);

// 输出渲染
const Root = () => {
  return (
    <Provider store={getStore(navReducer)}>
      <AppWithNavigationState/>
    </Provider>
  );
}

export {Root, navigation}