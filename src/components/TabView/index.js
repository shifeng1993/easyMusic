/**
 * 组件名称： TabView
 * 功能： ScrollableTabView 封装的高级组件
 * 作者： haise
 * 邮箱： shifeng199307@gmail.com
 * props：
 *  backgroundColor: String          tabbar背景色
 *  containerWidth: Number           容器宽度，默认为设备宽度
 *  tabItemWidth: Number             tabbar每项的宽度(新加入), emun {‘auto’ ，数字}
 *  tabbarPadding:Number                  tabbar样式
 *  tabbarHeight: number                   tabbar高度
 *  underlineStyle: {}               追加的下划线样式
 *  underlineMargin：number                  下划线margin
 *  initialPage: integer             the index of the initially selected tab, 默认0
 *  page: integer                    set selected tab
 *  tabOnPress: (index)=>{}          子传父当前tab所在的index
 */

import React, {Component} from 'react';
import {View, Text, Dimensions, Animated, ScrollView} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import utils from '../../utils'
const {height, width} = Dimensions.get('window');
const newWidth = utils.getWidth(); 
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
    tabbarPadding: 0,
    underlineMargin:0,
    tabbarHeight: newWidth / 7.5,
    initialPage: 0,
    onChangeTab: () => {}
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
    this
      .props
      .onChangeTab(item);
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
        ? ((this.props.containerWidth - this.props.tabbarPadding * 2) / tabs.length - this.props.underlineMargin * 2)
        : this.props.tabItemWidth - this.props.underlineMargin * 2,
      height: 3,
      backgroundColor: ThemeStyle.important_1,
      marginLeft: this.props.underlineMargin,
      marginRight: this.props.underlineMargin,
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
            ? ((this.props.containerWidth - this.props.tabbarPadding*2) / tabs.length)
            : this.props.tabItemWidth
        ]
      });
    return (
      <View
        style={[{
        height: this.props.tabbarHeight,
        width: this.props.containerWidth,
        paddingLeft: this.props.tabbarPadding,
        paddingRight: this.props.tabbarPadding,
        backgroundColor: this.props.backgroundColor
      },this.props.tabbarStyle]}>
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
            height: this.props.tabbarHeight,
            width: !this.props.tabItemWidth
              ? (this.props.containerWidth - this.props.tabbarPadding*2)
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
  _renderTabBarItem = (title, index, isTabActive, goToPage) => {
    const color = isTabActive
      ? ThemeStyle.important_1
      : ThemeStyle.normal_1;
    return (
      <Text
        key={title}
        onPress={() => {
        goToPage(index);
      }}
        style={!this.props.tabItemWidth
        ? {
          flex: 1,
          padding: newWidth / 25,
          backgroundColor: 'rgba(0,0,0,0)',
          textAlign: 'center',
          color: color,
          fontSize: 14
        }
        : {
          width: this.props.tabItemWidth,
          padding: newWidth / 25,
          backgroundColor: 'rgba(0,0,0,0)',
          textAlign: 'center',
          color: color,
          fontSize: 14
        }}>{title}</Text>
    );
  };
}

export default TabView;
