import React, { Component } from 'react';
import { WebView, View, StyleSheet,Platform} from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';

export default class Echarts extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }
  static defaultProps = {
    backgroundColor: 'rgba(0,0,0,0)'
  } 
  render() {
    const source = (Platform.OS == 'ios') ? require('./index.html') : {'uri':'file:///android_asset/echarts/index.html'}
    return (
      <View style={{flex: 1, height: this.props.height || 400}}>
        <WebView
          ref="chart"
          style={{backgroundColor:this.props.backgroundColor}} // 设置背景色透明，修复闪白bug
          scrollEnabled = {false}
          injectedJavaScript = {renderChart(this.props)}
          source={source}
        />
      </View>
    );
  }
}
