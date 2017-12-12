import { merge } from 'lodash'

var echart = {};

function filterData (data, key) {
  var dataAry = []
  for (var i = 0, l = data.length; i < l; i++) {
    dataAry.push(data[i][key])
  }
  return dataAry
}


function getColorList (xdata) {
  var colorList = []
  for (var i = 0; i <= xdata.length - 1; i++) {
    switch (xdata[i]) {
      case '正常':
        colorList.push('#279e64')
        break
      case '告警':
        colorList.push('#c06902')
        break
      case '宕机':
        colorList.push('#4e545a')
        break
      case '严重':
        colorList.push('#ac0c25')
        break
      case '主要':
        colorList.push('#ac0c25')
        break
      case '次要':
        colorList.push('#a52a5b')
        break
      case '警告':
        colorList.push('#c06902')
        break
      case '提示':
        colorList.push('#03659b')
        break
      case '未知':
        colorList.push('#4e545a')
        break
      case '警报':
        colorList.push('#c06902')
        break
      case '致命':
        colorList.push('#ac0c25')
        break
      case '错误':
        colorList.push('#b94047')
        break
      case '信息':
        colorList.push('#047ebf')
        break
      case '应急':
        colorList.push('#59b9c7')
        break
      case '诊断':
        colorList.push('#91856f')
        break
    }
  }
  return colorList
}

// 环形图表
echart.ringChart = function (el, data, name, config) {
  var option = {
    backgroundColor: ThemeStyle.cardColor,
    grid: { // 控制图的大小，调整下面这些值就可以，
      borderWidth: 0,
      x: 20,
      y: 20,
    },
    series: [
      {
        type: 'pie',
        radius: ['70%', '80%'],
        startAngle: 90,
        clockwise: false,
        center: ['50%', '50%'],
        data: [
          {
            name: (typeof name !== 'undefined') ? name : '',
            value: parseFloat(data),
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: '{d} %',
                textStyle: {
                  baseline: 'top',
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold'
                }
              }
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: getProgressColor(data, 0.8)[0] // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: getProgressColor(data, 0.8)[1] // 100% 处的颜色
                  }],
                  globalCoord: true // 缺省为 false
                }
              }
            }
          },
          {
            name: '',
            value: 100 - parseFloat(data),
            label: {
              normal: {show: false}
            },
            itemStyle: {
              normal: {color: 'transparent'}
            }
          }
        ]
      },
      { // 仪表图指针模仿最外层带分割的圆环
        type:'gauge',
        radius: '88%',
        startAngle: 90,
        endAngle: -269.9,
        splitNumber: 12,
        axisLine:{
          show:true,
          lineStyle:{
            color: [[1, 'rgba(255, 255, 255, 0.25)']],
            width:0.5
          }
        },
        splitLine:{
          show:true,
          length:2,
          lineStyle:{
            color: 'auto',
            width:0.5
          }
        },
        axisTick:{show:false},
        axisLabel:{show:false},
        pointer:{show:false},
        detail:{show:false}
      },
      { // 仪表图指针模仿条纹圆环
        name: '',
        type: 'gauge',
        radius: '80%',
        startAngle: 90,
        endAngle: -269.9,
        splitNumber: 12, // 分割段数，默认为5
        axisLine: { // 坐标轴线
          show: false,
          lineStyle: { // 属性lineStyle控制线条样式
            opacity: 0
          }
        },
        axisTick: { // 坐标轴小标记
          splitNumber: 5, // 每份split细分多少段
          length: 5, // 属性length控制线长
          lineStyle: { // 属性lineStyle控制线条样式
            color: 'rgba(255, 255, 255, 0.25)',
            width: 0.8
          }
        },
        axisLabel: {show: false}, // 坐标轴文本标签，详见axis.axisLabel
        splitLine: {show: false}, // 分隔线
        pointer: {show: false},
        detail: {show: false}
      }
    ]
  };

  if (typeof config !== 'undefined') {
    return merge({}, option, config)
  } else {
    return option;
  }
}

function getProgressColor(data, opacity) {
  if (data < 60) { // 蓝色
    return [`rgba(25,132,205,${opacity})`, `rgba(53,172,245,${opacity})`]
  } else if (data >= 60 && data < 90) { // 黄色
    return [`rgba(241,169,55,${opacity})`, `rgba(251,220,74,${opacity})`]
  } else {
    return [`rgba(214,38,35,${opacity})`, `rgba(249,92,76,${opacity})`]
  }
}
// 仪表盘
echart.gaugeChart = function (el, data, title, config) {
  var formatter = '{c}%'
  if (typeof title !== 'undefined') {
    formatter = '{b} : {c}%'
  }
  var option = {
    backgroundColor: ThemeStyle.cardColor,
    tooltip: {
      formatter: formatter,
      // zlevel: 2
    },
    series: [
      { // 刻度与内部指针
        name: '',
        type: 'gauge',
        radius: '85%',
        startAngle: 180,
        endAngle: 0,
        splitNumber: 6, // 分割段数，默认为5
        axisLine: { // 坐标轴线
          show: true,
          lineStyle: { // 属性lineStyle控制线条样式
            color: [
              [0.6, '#1e97e2'],
              [0.9, '#eac42d'],
              [1, '#f95448']
            ],
            opacity: 0
          }
        },
        axisTick: { // 坐标轴小标记
          splitNumber: 5, // 每份split细分多少段
          length: 5, // 属性length控制线长
          lineStyle: { // 属性lineStyle控制线条样式
            color: 'rgba(255, 255, 255, 0.25)',
            width: 0.8
          }
        },
        axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
          show: false
        },
        splitLine: { // 分隔线
          show: false
        },
        pointer: {
          width: 3
        },
        itemStyle: {
          normal: {
            color: 'rgb(158, 173, 192)'
          }
        },
        title: {
          show: true,
          offsetCenter: [0, '-40%'], // x, y，单位px
          textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder'
          }
        },
        detail: {
          formatter: '{value}%',
          offsetCenter: [0, '-50%'],
          textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bolder'
          }
        },
        data: [{
          name: '',
          value: data
        }]
      },
      { // 与刻度分离的外层圆弧
        type: 'gauge',
        radius: '90%',
        startAngle: 180,
        endAngle: 0,
        splitNumber: 6, // 分割段数，默认为5
        axisLine: {
          show:true,
          lineStyle:{
            color:[
              [0.6, '#1e97e2'],
              [0.9, '#eac42d'],
              [1, '#f95448'],
            ],
            width:1
          }
        },
        splitLine:{
          show: true,
          length: 3,
          lineStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel:{//刻度标签
          show:false
        },
        pointer:{//指针
          show: false
        },
        detail:{
          show:false
        },
      },
      {
        name: '进度展示条',
        type: 'pie',
        radius: ['75%', '85%'],
        avoidLabelOverlap: false,
        startAngle: 180,
        zlevel: 1,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          // 展示数据
          value: data/2,
          name: '显示进度条',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 1,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: getProgressColor(data, 0.4)[0] // 0% 处的颜色
                },{
                  offset: 1,
                  color: getProgressColor(data, 0.4)[1] // 100% 处的颜色
                }],
                globalCoord: true // 缺省为 false
              }
            }
          }
        }, {
          // 占位数据(写死)
          value: 100-data/2,
          name: '空白部分',
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          }
        }]
      }
    ]
  }
  if (typeof config !== 'undefined') {
    return merge({}, option, config)
  } else {
    return option
  }
}

// 百分比层叠表
echart.stackChart = function (el, data, units, config) {
  var unit = units || 'GB'
  var xyData = filterData(data, 'use');
  var x = 1;

  var option = {
    backgroundColor: ThemeStyle.cardColor,
    tooltip: {
      show: false,
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
        for (var i = 0, l = option.xAxis[0].data.length; i < l; i++) {
          if (option.xAxis[0].data[i] == params[0].name) {
            return '内存使用率' + '</br>' +
              option.series[0].name + ':' + (option.series[0].data[i]).toFixed(2) + unit + '</br>' +
              '剩余' + ':' + parseFloat(option.series[1].data[i] - option.series[0].data[i]).toFixed(2) + unit + '</br>' +
              option.series[1].name + ':' + parseFloat(option.series[1].data[i]).toFixed(2) + unit
          }
        }
      }
    },
    grid: { // 控制图的大小，调整下面这些值就可以，
      borderWidth: 0,
      x: 70,
      y: 20,
      x2: 5,
      y2: 20 // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgb(42, 59, 77)',
          }
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#fff'
          }
        },
        data: xyData
      },
      {
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitArea: {
          show: false
        },
        data: xyData
      }
    ],
    yAxis: [{
      type: 'value',
      axisLabel: {
        formatter: '{value}' + unit
      },
      splitNumber: 4,
      axisTick: { // 坐标轴刻度
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgb(158, 174, 192)',
        }
      },
      splitArea: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgb(42, 59, 77)',
        }
      }
    }],
    series: [
      {
        name: '总量',
        type: 'bar',
        xAxisIndex: 1,
        silent: true,
        itemStyle: {
          normal: {
            show: true,
            color: '#303b47'
          }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            formatter: function (p) {
              return '总量:' + p.value
            },
            textStyle: {
              color: '#cbcbcb'
            }
          }
        },
        data: filterData(data, 'sum')
      },
      {
        name: '已使用',
        type: 'bar',
        silent: true,
        itemStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgb(35,168,248)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgb(25,88,159)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            textStyle: {
              color: '#fff'
            },
            formatter: function (params) {
              // 移动端不知为何，使用外部变量渲染异常
              return Math.round(params.value / data[params.dataIndex].sum * 100) + '%';
            }
          }
        },
        data: filterData(data, 'use')
      }
    ]
  }
  if (typeof config !== 'undefined') {
    return merge({}, option, config)
  } else {
    return option
  }
}
// 折线图表
echart.lineChart = function (el, data, name, config) {
  var option = {
    backgroundColor: ThemeStyle.cardColor,
    grid: { // 控制图的大小，调整下面这些值就可以，
      borderWidth: 0,
      left: 30,
      top: 30
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [name],
      x: 'right'
    },
    // calculable : true,
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisTick: { // 坐标轴刻度
        show: false
      },
      axisLine: { // 坐标轴轴线
        lineStyle: {
          color: 'rgb(42, 59, 77)'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          align: 'left',
          color: function (value, index) {
            return '#fff'
          }
        }
      },
      data: filterData(data, 'name')
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: ['rgb(42, 59, 77)'],
          type: 'solid'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: function (value, index) {
            return 'rgb(158, 174, 192)'
          }
        }
      },
      axisLine: { // 坐标轴轴线
        show: false
      },
      axisTick: { // 坐标轴刻度
        show: false
      }
    },
    series: [{
      name: name,
      type: 'line',
      showSymbol: true, // 显示折线上的点
      itemStyle: {
        normal: {
          color: 'rgb(35, 168, 248)'
        }
      },
      lineStyle: {
        normal: {
          width: 1
        }
      },
      areaStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(25,88,159,0.6)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(48,179,255,0.2)' // 100% 处的颜色
            }],
            globalCoord: false
          }
        }
      },
      data: filterData(data, 'value')
    }]
  }

  if (typeof config !== 'undefined') {
    return merge({}, option, config)
  } else {
    return option
  }
}

echart.getChartColorList = getColorList

export default echart

