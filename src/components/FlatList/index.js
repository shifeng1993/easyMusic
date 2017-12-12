/**
 * 组件名称： FlatList
 * 功能： 无限滚动列表页
 * 作者： haise
 * 邮箱： shifeng199307@gmail.com
 * props：
 *  layout: String                    列表类型枚举， 目前就一个list
 *  onFetch: async function           获取分页函数，
 *  item: function                    render的每个item
 *  onEndReachedThreshold: float     （可选）离底部为当前容器的百分之多少触发滚动加载。百分比得化成小数。float类型。
 *  使用示例： https://github.com/shifeng1993/easy-rn/blob/master/src/containers/Main/Home/List.js
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Platform, Dimensions, ActivityIndicator} from 'react-native';
import { UltimateListView, UltimateRefreshView } from 'react-native-ultimate-listview'
import {LoadingSpinner} from "../index";

// 常量设置
const {width, height} = Dimensions.get('window');

class list extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      layout,
      onFetch,
      item,
      onEndReachedThreshold,
      onViewableItemsChanged
    } = this.props
    return (
      <UltimateListView
        {...this.props}
        ref={(ref) => this.listView = ref}
        keyExtractor={(item, index) => `${index} - ${item}`}
        key={layout}
        refreshableMode="basic" // 可选基础或者高级 basic or advanced
        onFetch={onFetch}
        numColumns={layout === 'list' ? 1 : 3}
        item={item}
        // 可见视图优化 (info)=>{}
        onViewableItemsChanged={onViewableItemsChanged}
        // 设置第一次加载页面
        paginationFetchingView={this._renderPaginationFetchingView}
        fetchingSpinnerSize={20}
        // 设置正在加载页面
        paginationWaitingView={this._renderPaginationWaitingView}
        //设置没有更多了页面
        paginationAllLoadedView={this._renderPaginationAllLoadedView}
        // 设置空列表
        emptyView={this._renderEmptyView}
        // 设置上拉加载
        waitingSpinnerText={'正在加载...'}
        waitingSpinnerSize={'small'}
        allLoadedText={'没有更多了'}
        onEndReachedThreshold={onEndReachedThreshold}
        spinnerColor={'gray'}
        // 设置下拉刷新
        refreshableTitlePull={'下拉刷新'}
        refreshableTitleRelease={'释放立即刷新'}
        refreshableTitleRefreshing={'正在加载...'}
        refreshViewStyle={Platform.OS === 'ios' ? {height: height/8, top: -height/8} : {height: height/10}}
        refreshViewHeight={Platform.OS === 'ios' ? height/8 : height/10}
        arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}} //箭头图标
        // 设置日期
        displayDate={true}
        dateFormat={'yyyy-MM-dd hh:mm'}
        dateStyle={{color: 'lightgray'}}
        dateTitle={'最近更新:'} 
      />
    );
  }
  _renderPaginationFetchingView = () => {
    if(Platform.OS === 'ios'){
      return (
        <LoadingSpinner height={height * 0.2} text="正在加载，请稍候..."/>
      )
    } else {
      return (
        <LoadingSpinner height={height * 0.2} text="正在加载，请稍候..."/>
      )
    }
  };
  _renderEmptyView = () => {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#fff'}}>列表是空滴，刷新试试~</Text>
      </View>
    );
  }
  _renderPaginationWaitingView = () => {
    return (
      <View style={{paddingTop: 5,paddingBottom: 10}}>
        <ActivityIndicator animating={true}/>
        <Text style={{textAlign: 'center',color: '#999999'}}>正在加载...</Text>
      </View>
    )
  }
  _renderPaginationAllLoadedView = () => {
    return (
      <View style={{paddingTop: 5,paddingBottom: 10}}><Text style={{textAlign: 'center',color: '#999999'}}>没有更多了</Text></View>
    )
  }
}

const styles = StyleSheet.create({
  footer:{
    paddingTop: 5,
    paddingBottom: 10
  },
  loading: {
    textAlign: 'center',
    color: '#999999'
  }
});

export default list;