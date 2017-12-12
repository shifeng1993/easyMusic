/**
 * 组件名称： TabView
 * 功能： ScrollableTabView 封装的高级组件
 * 作者： haise
 * 邮箱： shifeng199307@gmail.com
 * props：
 *  backgroundColor: String          不是线性渐变下tabbar背景色
 *  containerWidth: Number           容器宽度，默认为设备宽度
 *  tabItemWidth: Number             tabbar每项的宽度(新加入), emun {‘auto’ ，数字}
 *  line: false,                     tabbar线性渐变色
 *  lineColors: []                   tabbar线性渐变色值
 *  initialPage: integer                 the index of the initially selected tab, 默认0
 *  page: integer                    set selected tab
 *  tabOnPress: (index)=>{}          子传父当前tab所在的index
 */

import React, {Component} from 'react';
import {View, Text, Dimensions, Animated, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import ScrollableTabView from 'react-native-scrollable-tab-view';
const {height, width} = Dimensions.get('window');

class TabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }
  static defaultProps = {
    backgroundColor: 'rgba(0,0,0,0)',
    containerWidth: width,
    line: false,
    lineColors: [],
    lineStart: {
      x: 0.0,
      y: 1.0
    },
    lineEnd: {
      x: 1.0,
      y: 1.0
    },
    initialPage: 0,
    onChangeTab: ()=>{}
  };

  componentWillMount() {
    if (this.props.page) {
      this.setState({page: this.props.page});
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.state.page) {
      this.setState({page: nextProps.page});
    }
  }

  onChangeTab = (item) => {
    this.setState({page: item.i})
    this.props.onChangeTab(item);
  };

  render() {
    return (
      <ScrollableTabView
        renderTabBar={this._renderTabBar}
        initialPage={this.props.initialPage}
        page={this.state.page}
        onChangeTab={this.onChangeTab}>
        {this.props.children}
      </ScrollableTabView>
    );
  }
  _renderTabBar = (props) => {
    const tabs = React
      .Children
      .map(this.props.children, (child) => child.props.tabLabel)
    const tabUnderlineStyle = {
      position: 'absolute',
      width: !this.props.tabItemWidth
        ? (this.props.containerWidth / tabs.length)
        : this.props.tabItemWidth,
      height: 3,
      backgroundColor: ThemeStyle.importantText_2,
      bottom: 0
    };
    const translateX = props
      .scrollValue
      .interpolate({
        inputRange: [
          0, 1
        ],
        outputRange: [
          0, !this.props.tabItemWidth
            ? (this.props.containerWidth / tabs.length)
            : this.props.tabItemWidth
        ]
      });
    if (this.props.line) {
      return (
        <LinearGradient
          colors={this.props.lineColors}
          start={this.props.lineStart}
          end={this.props.lineEnd}
          style={{
          height: width / 7.5,
          width: this.props.containerWidth
        }}>
          <ScrollView
            ref={(scrollView) => {
            this._scrollView = scrollView;
          }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            directionalLockEnabled={true}
            bounces={false}
            scrollsToTop={false}>
            <View
              style={{
              height: width / 7.5,
              width: !this.props.tabItemWidth
                ? this.props.containerWidth
                : 'auto',
              position: 'relative',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              {tabs.map((title, index) => {
                const isTabActive = props.activeTab === index;
                return this._renderTabBarItem(title, index, isTabActive, props.goToPage)
              })}
              <Animated.View
                style={[
                tabUnderlineStyle, {
                  transform: [{
                      translateX
                    }]
                },
                this.props.underlineStyle
              ]}/>
            </View>
          </ScrollView>
        </LinearGradient>
      )
    } else {
      return (
        <View
          style={{
          height: width / 7.5,
          width: this.props.containerWidth,
          backgroundColor: this.props.backgroundColor
        }}>
          <ScrollView
            ref={(scrollView) => {
            this._scrollView = scrollView;
          }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            directionalLockEnabled={true}
            bounces={false}
            scrollsToTop={false}>
            <View
              style={{
              position: 'relative',
              height: width / 7.5,
              width: !this.props.tabItemWidth
                ? this.props.containerWidth
                : 'auto',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              {tabs.map((title, index) => {
                const isTabActive = props.activeTab === index;
                return this._renderTabBarItem(title, index, isTabActive, props.goToPage)
              })}
              <Animated.View
                style={[
                tabUnderlineStyle, {
                  transform: [{
                      translateX
                    }]
                },
                this.props.underlineStyle
              ]}/>
            </View>
          </ScrollView>
        </View>
      )
    }
  }
  _renderTabBarItem = (title, index, isTabActive, goToPage) => {
    const color = isTabActive
      ? ThemeStyle.textColor
      : ThemeStyle.subtitleColor;
    return (
      <Text
        key={title}
        onPress={() => {
          goToPage(index);
        }}
        style={!this.props.tabItemWidth
        ? {
          flex: 1,
          padding: width / 25,
          backgroundColor: 'rgba(0,0,0,0)',
          textAlign: 'center',
          color: color,
          fontSize: 14
        }
        : {
          width: this.props.tabItemWidth,
          padding: width / 25,
          backgroundColor: 'rgba(0,0,0,0)',
          textAlign: 'center',
          color: color,
          fontSize: 14
        }}>{title}</Text>
    );
  };
}

export default TabView;
