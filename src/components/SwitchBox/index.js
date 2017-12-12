/**
 * 组件名称： SwitchBox
 * 功能： 开关盒子
 * 作者： haise
 * 邮箱： shifeng199307@gmail.com
 * 
 * props：
 *  active: boolen                          初始开关状态，
 *  style: object                           外部容器样式
 *  inactiveButtonColor: string             关闭时按钮颜色
 *  inactiveButtonPressedColor: string      关闭时按下颜色
 *  inactiveBackgroundColor: string         关闭时背景色
 *  activeButtonColor: string               开启时按钮颜色
 *  activeButtonPressedColor: string        开启时按下颜色
 *  activeBackgroundColor: string           开启时背景色
 *  buttonRadius: number                    按钮半径
 *  switchWidth: number                     滑动容器宽度
 *  switchHeight: number                    滑动容器高度
 *  buttonContent: React.Component          切换按钮自定义组件
 *  disabled: boolen                        是否禁用
 *  switchAnimationTime: number             切换动画持续时间
 *  line: Boolen                            开启线性渐变，
 *  lineActiveBackgroundColor: array        线性渐变下开启背景色
 *  lineInactiveBackgroundColor: array,     线性渐变下关闭背景色
 * 
 * event：
 *  onActivate: func                        开启时事件
 *  onDeactivate: func                      关闭时事件
 *  onChangeState: func                     状态变化时事件
 */

import React, {Component} from 'react';
import {PanResponder, View, StyleSheet, TouchableHighlight, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types';

class SwitchBox extends Component {
  constructor(props) {
    super(props);
    const w = (this.props.switchWidth - Math.min(this.props.switchHeight, this.props.buttonRadius * 2) - this.props.buttonOffset);
    this.state = {
      width: w,
      state: this.props.active,
      position: new Animated.Value(this.props.active
        ? w
        : this.props.buttonOffset)
    };
  }
  padding = 8

  static propTypes = {
    active: PropTypes.bool,
    // style: PropTypes.style,
    inactiveButtonColor: PropTypes.string,
    inactiveButtonPressedColor: PropTypes.string,
    activeButtonColor: PropTypes.string,
    activeButtonPressedColor: PropTypes.string,
    activeBackgroundColor: PropTypes.string,
    inactiveBackgroundColor: PropTypes.string,
    buttonRadius: PropTypes.number,
    switchWidth: PropTypes.number,
    switchHeight: PropTypes.number,
    buttonContent: PropTypes.element,
    disabled: PropTypes.bool,
    switchAnimationTime: PropTypes.number,
    onActivate: PropTypes.func,
    onDeactivate: PropTypes.func,
    onChangeState: PropTypes.func
  }

  static defaultProps = {
    active: false,
    style: {},
    inactiveButtonColor: 'rgba(255,255,255,1)',
    inactiveButtonPressedColor: 'rgba(255,255,255,0.8)',
    activeButtonColor: 'rgba(255,255,255,1)',
    activeButtonPressedColor: 'rgba(255,255,255,0.8)',
    activeBackgroundColor: 'rgba(255,255,255,.5)',
    inactiveBackgroundColor: 'rgba(0,0,0,.5)',
    lineActiveBackgroundColor: [
      '#1786c6', '#19589f'
    ],
    lineInactiveBackgroundColor: ['#0a2c44','#0a2c44'],
    buttonRadius: 9,
    switchWidth: 40,
    switchHeight: 20,
    buttonContent: null,
    buttonOffset: 0,
    disabled: false,
    switchAnimationTime: 200,
    onActivate: () => {},
    onDeactivate: () => {},
    onChangeState: () => {},
    line: true, // 是否开启渐变色
    lineStart: {
      x: 0.0,
      y: 0.5
    },
    lineEnd: {
      x: 1.0,
      y: 1.0
    }
  }
  start = {}

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        if (this.props.disabled) 
          return;
        
        this.setState({pressed: true});
        this.start.x0 = gestureState.x0;
        this.start.pos = this.state.position._value;
        this.start.moved = false;
        this.start.state = this.state.state;
        this.start.stateChanged = false;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (this.props.disabled) 
          return;
        
        this.start.moved = true;
        if (this.start.pos == 0) {
          if (gestureState.dx <= this.state.width && gestureState.dx >= 0) {
            this
              .state
              .position
              .setValue(gestureState.dx);
          }
          if (gestureState.dx > this.state.width) {
            this
              .state
              .position
              .setValue(this.state.width);
          }
          if (gestureState.dx < 0) {
            this
              .state
              .position
              .setValue(0);
          }
        }
        if (this.start.pos == this.state.width) {
          if (gestureState.dx >= -this.state.width && gestureState.dx <= 0) {
            this
              .state
              .position
              .setValue(this.state.width + gestureState.dx);
          }
          if (gestureState.dx > 0) {
            this
              .state
              .position
              .setValue(this.state.width);
          }
          if (gestureState.dx < -this.state.width) {
            this
              .state
              .position
              .setValue(0);
          }
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({pressed: false});
        const currentPos = this.state.position._value;
        if (!this.start.moved || (Math.abs(currentPos - this.start.pos) < 5 && !this.start.stateChanged)) {
          this.toggle();
          return;
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        const currentPos = this.state.position._value;
        this.setState({pressed: false});
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.state !== nextProps.active) {
      nextProps.active
        ? this.activate()
        : this.deactivate()
    }
  }

  activate() {
    Animated
      .timing(this.state.position, {
      toValue: this.state.width,
      duration: this.props.switchAnimationTime,
      useNativeDriver: true
    })
      .start();
    this.changeState(true);
  }

  deactivate() {
    Animated
      .timing(this.state.position, {
      toValue: this.props.buttonOffset,
      duration: this.props.switchAnimationTime,
      useNativeDriver: true
    })
      .start();
    this.changeState(false);
  }

  changeState(state) {
    const callHandlers = this.start.state != state;
    setTimeout(() => {
      this.setState({state: state});
      if (callHandlers) {
        this.callback();
      }
    }, this.props.switchAnimationTime / 2);
  }

  callback() {
    const state = this.state.state;
    if (state) {
      this
        .props
        .onActivate();
    } else {
      this
        .props
        .onDeactivate();
    }
    this
      .props
      .onChangeState(state);
  }
  render() {
    const doublePadding = this.padding * 2 - 2;
    const halfPadding = doublePadding / 2;
    if (this.props.disabled) {
      return (
        <View
          {...this._panResponder.panHandlers}
          style={[
          {
            padding: this.padding,
            position: 'relative'
          },
          this.props.style
        ]}>
          <View
            style={{
            backgroundColor: this.state.state
              ? '#2a3646'
              : '#121922',
            height: this.props.switchHeight,
            width: this.props.switchWidth,
            borderColor: '#212c3a',
            borderWidth:StyleSheet.hairlineWidth,
            borderRadius: this.props.switchHeight / 2
          }}/>
          <TouchableHighlight
            underlayColor='transparent'
            activeOpacity={1}
            style={{
            height: Math.max(this.props.buttonRadius * 2 + doublePadding, this.props.switchHeight + doublePadding),
            width: this.props.switchWidth + doublePadding,
            position: 'absolute',
            top: 1,
            left: 1
          }}>
            <Animated.View
              style={[{
                backgroundColor: '#414e5f',
                height: this.props.buttonRadius / 0.5,
                width: this.props.buttonRadius / 0.5,
                borderRadius: this.props.buttonRadius,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                position: 'absolute',
                top: halfPadding + this.props.switchHeight / 2 - this.props.buttonRadius,
                left: this.props.switchHeight / 2 > this.props.buttonRadius
                  ? halfPadding
                  : halfPadding + this.props.switchHeight / 2 - this.props.buttonRadius,
                transform: [
                  {
                    translateX: this.state.position
                  }
                ]
              }
            ]}>
              {this.props.buttonContent}
            </Animated.View>
          </TouchableHighlight>
        </View>
      )
    } else {
      if (this.props.line) {
        return (
          <View
            {...this._panResponder.panHandlers}
            style={[
            {
              padding: this.padding,
              position: 'relative'
            },
            this.props.style
          ]}>
            <LinearGradient
              colors={this.state.state
              ? this.props.lineActiveBackgroundColor
              : this.props.lineInactiveBackgroundColor}
              start={this.props.lineStart}
              end={this.props.lineEnd}
              style={{
              backgroundColor: this.state.state
                ? 'rgba(0,0,0,0)'
                : '#0a2c44',
              height: this.props.switchHeight,
              width: this.props.switchWidth,
              borderColor: ThemeStyle.importantText_1,
              borderWidth: this.state.state
                ? 0
                : StyleSheet.hairlineWidth,
              borderRadius: this.props.switchHeight / 2
            }}/>
            <TouchableHighlight
              underlayColor='transparent'
              activeOpacity={1}
              style={{
              height: Math.max(this.props.buttonRadius * 2 + doublePadding, this.props.switchHeight + doublePadding),
              width: this.props.switchWidth + doublePadding,
              position: 'absolute',
              top: 1,
              left: 1
            }}>
              <Animated.View
                style={[{
                  backgroundColor: this.state.state
                    ? (this.state.pressed
                      ? this.props.activeButtonPressedColor
                      : this.props.activeButtonColor)
                    : (this.state.pressed
                      ? this.props.inactiveButtonPressedColor
                      : this.props.inactiveButtonColor),
                  height: this.props.buttonRadius / 0.5,
                  width: this.props.buttonRadius / 0.5,
                  borderRadius: this.props.buttonRadius,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  position: 'absolute',
                  top: halfPadding + this.props.switchHeight / 2 - this.props.buttonRadius,
                  left: this.props.switchHeight / 2 > this.props.buttonRadius
                    ? halfPadding
                    : halfPadding + this.props.switchHeight / 2 - this.props.buttonRadius,
                  transform: [
                    {
                      translateX: this.state.position
                    }
                  ]
                }
              ]}>
                {this.props.buttonContent}
              </Animated.View>
            </TouchableHighlight>
          </View>
        )
      } else {
        return (
          <View
            {...this._panResponder.panHandlers}
            style={[
            {
              padding: this.padding,
              position: 'relative'
            },
            this.props.style
          ]}>
            <View
              style={{
              backgroundColor: this.state.state
                ? this.props.activeBackgroundColor
                : this.props.inactiveBackgroundColor,
              height: this.props.switchHeight,
              width: this.props.switchWidth,
              borderRadius: this.props.switchHeight / 2
            }}/>
            <TouchableHighlight
              underlayColor='transparent'
              activeOpacity={1}
              style={{
              height: Math.max(this.props.buttonRadius * 2 + doublePadding, this.props.switchHeight + doublePadding),
              width: this.props.switchWidth + doublePadding,
              position: 'absolute',
              top: 1,
              left: 1
            }}>
              <Animated.View
                style={[{
                  backgroundColor: this.state.state
                    ? (this.state.pressed
                      ? this.props.activeButtonPressedColor
                      : this.props.activeButtonColor)
                    : (this.state.pressed
                      ? this.props.inactiveButtonPressedColor
                      : this.props.inactiveButtonColor),
                  height: this.props.buttonRadius / 0.5,
                  width: this.props.buttonRadius / 0.5,
                  borderRadius: this.props.buttonRadius,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  position: 'absolute',
                  top: halfPadding + this.props.switchHeight / 2 - this.props.buttonRadius,
                  left: this.props.switchHeight / 2 > this.props.buttonRadius
                    ? halfPadding
                    : halfPadding + this.props.switchHeight / 2 - this.props.buttonRadius,
                  transform: [
                    {
                      translateX: this.state.position
                    }
                  ]
                }
              ]}>
                {this.props.buttonContent}
              </Animated.View>
            </TouchableHighlight>
          </View>
        )
      }
    }
    
  }
  toggle() {
    if (this.props.disabled) 
      return;
    
    if (this.state.state) {
      this.deactivate();
    } else {
      this.activate();
    }
  }
}

export default SwitchBox;