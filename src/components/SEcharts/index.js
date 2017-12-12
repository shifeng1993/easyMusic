import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import Echarts from '../Echarts';
import PropTypes from 'prop-types';
import myChart from './chart.interface'
import {isEqual} from 'lodash';

const {width} = Dimensions.get('window');

export default class SEcharts extends Component{
  constructor(props) {
    super(props);
    this.state = {
      option: {}
    }
  }

  static defaultProps = {
    chart: {
      type: null,
      data: null,
      width: null,
      height: null,
      itemName: null,
      name: null,
      isReverseColor: null
    },
    height: width / 2
  };
  static propTypes = {
    chart: PropTypes.object.isRequired,
    height: PropTypes.number
  };

  componentWillMount() {
    if (Object.keys(this.props.chart).length !== 0) {
      // console.log(1, this.props.chart)
      this._drewChart();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.chart).length !== 0 && !isEqual(this.props.chart, nextProps.chart)) {
      this._drewChart();
    }
  }
  
  _drewChart = () => {
    let chart = this.props.chart;
    let option = {};
    switch (chart.type) {
      case 'ringChart' :
        option = myChart.ringChart(chart.name, chart.data, chart.itemName, chart.option);
        break;
      case 'gaugeChart' :
        option = myChart.gaugeChart(chart.name, chart.data, chart.itemName, chart.option);
        break;
      case 'stackChart' :
        option = myChart.stackChart(chart.name, chart.data, chart.unit, chart.option);
        break;
      case 'lineChart' :
        option = myChart.lineChart(chart.name, chart.data, chart.itemName, chart.option);
        break;
    }
    this.setState({option: option});
  }
  
  
  
  render() {
    if (Object.keys(this.props.chart).length === 0) {
      return (<View/>)
    } else {
      // console.log('chart的option', JSON.stringify(this.state.option))
      return (
        <Echarts option={this.state.option} height={this.props.height}/>
      )
    }
  }
}
