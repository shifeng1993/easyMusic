/**
 * 组件名称： TextInput
 * 功能： 公共控件-输入框，双向绑定
 * 作者： haise
 * 邮箱： shifeng199307@gmail.com
 * props：
 *  type: String                          区分样式类型 emun{ 'search', 'defined', 'password','textarea'}
 *  model: string || number               双向绑定的值      （父传子）
 *  returnModel: func                     model => this._returnModel(model) （子传父）
 *  bindEndEvent: func                    绑定搜索函数
 *  placeholder: String                   未输入之前显示文字
 *  iconName: String                      iconname
 *  keyboardType: String                  键盘类型 enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search') 
 *  editable: boolen                      是否是可编辑
 *  returnKeyType: String                 键盘回车键类型 enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo') 
 * 使用示例：
 * 父组件需添加箭头函数
 * _returnModel = (model) => {
 *    this.setState((prevState, props) => ({双向绑定的键名: model}));
 *  }
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TextInput,
  ImageBackground,
  TouchableHighlight
} from 'react-native'

const {height, width} = Dimensions.get('window');

export default class TextInputView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seePassword: true
    };
  }
  static defaultProps = {
    model: null,
    returnModel: ()=>{},
    placeholder: null,
    editable: true,
    keyboardType: 'default',
    bindEndEvent: ()=>{},
    onSubmitEditing: () => {
      this._textInput.blur();
    },
    autoFocus: false,
    onBlur: ()=>{},
    width: width/1.5
  };
  render() {
    let view;
    switch (this.props.type) {
      case 'search':
        view =  <View style={styles.searchContainer}>
                  <Icon
                    size={18}
                    name={'magnifier'}
                    color={'#9accff'}
                    style={{
                    margin: width / 300,
                    marginRight: 8
                  }}/>
                  <TextInput
                    style={[{
                      flex: 1,
                      fontSize: 16,
                      color: ThemeStyle.textColor,
                      height: width / 7,
                      lineHeight: 18
                    }
                  ]}
                    ref={component => this._textInput = component}
                    underlineColorAndroid="transparent"
                    returnKeyType={'search'}
                    maxLength={40}
                    multiline={false}
                    caretHidden={false}
                    selectionColor={'#9accff'}
                    blurOnSubmit={true}
                    autoFocus={this.props.autoFocus}
                    onEndEditing={()=>{
                      this.props.bindEndEvent()
                    }}
                    onSubmitEditing={() => {
                      this._textInput.blur();
                    }}
                    keyboardType={'default'}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={ThemeStyle.subtitleColor}
                    onChangeText={(model) => {
                    this.props.returnModel(model)
                  }}
                    value={this.props.model}/>
                  <TouchableHighlight
                    underlayColor={'rgba(0,0,0,0)'}
                    onPress={() => this.props.returnModel(null)}>
                    {this._returnClearIcon()}
                  </TouchableHighlight>
                </View>
        break;
      case 'defined':
        view = <View style={styles.definedContainer}>
                <Icon
                  size={18}
                  name={this.props.iconName}
                  color={'#9accff'}
                  style={{
                  margin: width / 300,
                  marginLeft: 5,
                  marginRight: 10
                }}/>
                <TextInput
                  style={[{
                    flex: 1,
                    fontSize: 16,
                    color: ThemeStyle.textColor,
                    height: width / 7,
                    lineHeight: 18
                  }
                ]}
                
                  ref={component => this._textInput = component}
                  underlineColorAndroid="transparent"
                  returnKeyType={this.props.returnKeyType}
                  maxLength={40}
                  multiline={false}
                  caretHidden={false}
                  selectionColor={'#9accff'}
                  blurOnSubmit={true}
                  autoFocus={false}
                  onEndEditing={()=>{
                    this.props.bindEndEvent()
                  }}
                  onBlur={this.props.onBlur}
                  onSubmitEditing={this.props.onBlur?()=>{}:this.props.onSubmitEditing}
                  keyboardType={this.props.keyboardType}
                  placeholder={this.props.placeholder}
                  editable={this.props.editable}
                  placeholderTextColor={ThemeStyle.subtitleColor}
                  onChangeText={(model) => {
                    this.props.returnModel(model)
                  }}
                  value={this.props.model}/>
                <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0)'}
                  onPress={() => this.props.returnModel(null)}>
                  {this._returnClearIcon()}
                </TouchableHighlight>
              </View>
        break;
      case 'password':
        view = <View style={styles.passwordContainer}>
                <Icon
                  size={18}
                  name={'lock'}
                  color={'#9accff'}
                  style={{
                  margin: width / 300,
                  marginLeft: 5,
                  marginRight: 10
                }}/>
                <TextInput
                  style={[{
                    flex: 1,
                    fontSize: 16,
                    color: ThemeStyle.textColor,
                    height: width / 7,
                    lineHeight: 18
                  }
                ]}
                  ref={component => this._textInput = component}
                  underlineColorAndroid="transparent"
                  returnKeyType={'done'}
                  maxLength={40}
                  multiline={false}
                  caretHidden={false}
                  selectionColor={'#9accff'}
                  blurOnSubmit={true}
                  autoFocus={false}
                  secureTextEntry={this.state.seePassword}
                  onEndEditing={()=>{
                    this.props.bindEndEvent()
                  }}
                  onSubmitEditing={this.props.onSubmitEditing}
                  keyboardType={'default'}
                  placeholder={this.props.placeholder}
                  placeholderTextColor={ThemeStyle.subtitleColor}
                  onChangeText={(model) => {
                  this.props.returnModel(model)
                }}
                  value={this.props.model}/>
                <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0)'}
                  onPress={this._seePassword}>
                  {this._returnSeeIcon()}
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0)'}
                  onPress={() => this.props.returnModel(null)}>
                  {this._returnClearIcon()}
                </TouchableHighlight>
              </View>
        break;
        case 'password_1':
        view = <View style={styles.password1Container}>
                <TextInput
                  style={[{
                    flex: 1,
                    fontSize: 16,
                    color: ThemeStyle.textColor,
                    height: width / 7,
                    lineHeight: 18
                  }
                ]}
                  ref={component => this._textInput = component}
                  underlineColorAndroid="transparent"
                  returnKeyType={'done'}
                  maxLength={40}
                  multiline={false}
                  caretHidden={false}
                  selectionColor={'#9accff'}
                  blurOnSubmit={true}
                  autoFocus={false}
                  secureTextEntry={this.state.seePassword}
                  onEndEditing={()=>{
                    this.props.bindEndEvent()
                  }}
                  onSubmitEditing={this.props.onBlur?()=>{}:this.props.onSubmitEditing}
                  keyboardType={'default'}
                  placeholder={this.props.placeholder}
                  placeholderTextColor={ThemeStyle.subtitleColor}
                  onChangeText={(model) => {
                  this.props.returnModel(model)
                }}
                  value={this.props.model}/>
                <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0)'}
                  onPress={this._seePassword}>
                  {this._returnSeeIcon()}
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0)'}
                  onPress={() => this.props.returnModel(null)}>
                  {this._returnClearIcon()}
                </TouchableHighlight>
              </View>
        break;
        case 'input_view':
            view = <View style={styles.inputViewContainer}>
                <Text style={{fontSize:14,color:'#a5b5c8', lineHeight:18}}>
                    {
                        this.props.isRequired
                         ?
                        <Text style={{fontSize: 14,color:'red'}}>*</Text>
                         :
                        null
                    }
                    {this.props.leftText}
                </Text>
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 14,
                        color: ThemeStyle.textColor,
                        height: width / 7,
                        lineHeight: 18,
                        textAlign: 'right'
                    }}
                    ref={component => this._textInput = component}
                    underlineColorAndroid="transparent"
                    returnKeyType={this.props.returnKeyType}
                    maxLength={40}
                    multiline={false}
                    caretHidden={false}
                    selectionColor={'#9accff'}
                    blurOnSubmit={true}
                    autoFocus={false}
                    onEndEditing={()=>{
                        this.props.bindEndEvent()
                    }}
                    onBlur={this.props.onBlur}
                    onSubmitEditing={this.props.onBlur?()=>{}:this.props.onSubmitEditing}
                    keyboardType={this.props.keyboardType}
                    placeholder={this.props.placeholder}
                    editable={this.props.editable}
                    placeholderTextColor={ThemeStyle.subtitleColor}
                    onChangeText={(model) => {
                        this.props.returnModel(model)
                    }}
                    value={this.props.model}/>
                <TouchableHighlight
                    underlayColor={'rgba(0,0,0,0)'}
                    onPress={() => this.props.returnModel(null)}>
                    {this._returnClearIcon()}
                </TouchableHighlight>
            </View>
            break;
      case 'textarea':
        view = <View style={styles.textareaContainer}>
                <TextInput
                  style={[{
                    flex: 1,
                    fontSize: 16,
                    color: ThemeStyle.textColor,
                    textAlign:'right',
                    minHeight:width/5,
                    paddingRight:!this.props.model?15: 0
                  }
                ]}
                  ref={component => this._textInput = component}
                  underlineColorAndroid="transparent"
                  returnKeyType={'done'}
                  maxLength={500}
                  multiline={true}
                  caretHidden={false}
                  selectionColor={'#9accff'}
                  blurOnSubmit={false}
                  autoFocus={false}
                  onEndEditing={()=>{
                    this.props.bindEndEvent()
                  }}
                  onSubmitEditing={this.props.onSubmitEditing}
                  keyboardType={'default'}
                  placeholder={this.props.placeholder}
                  placeholderTextColor={'#444444'}
                  onChangeText={(model) => {
                  this.props.returnModel(model)
                }}
                  value={this.props.model}/>
                <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0)'}
                  onPress={() => this.props.returnModel(null)}>
                  {this._returnClearIcon()}
                </TouchableHighlight>
              </View>
        break;
    }
    return view;
  }
  _seePassword = () => {
    if(this.state.seePassword) {
      this.setState({seePassword: false})
    } else {
      this.setState({seePassword: true})
    }
    
  }
  _returnSeeIcon = () => {
    if (!this.props.model) {
      return <Text/>
    } else {
      if(this.state.seePassword) {
        return <Icon
          name={'close-eye'}
          style={{
          margin: width / 200,
          marginLeft: 8
        }}
          size={17}
          color={ThemeStyle.subtitleColor}/>
      } else {
        return <Icon
          name={'open-eye'}
          style={{
          margin: width / 200,
          marginLeft: 8
        }}
          size={17}
          color={ThemeStyle.subtitleColor}/>
      }
    }
  }
  _returnClearIcon = () => {
    if (!this.props.model || this.props.model && this.props.editable === false) {
      return <Text/>
    } else {
      return <Icon
        name={'cancel'}
        style={{
        marginRight: (this.props.type === 'textarea')? 15 : 5,
        marginLeft:0
      }}
        size={18}
        color={ThemeStyle.subtitleColor}/>
    }
  }
  _returnText = () => {}
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'rgba(154,204,255,0.3)',
    padding: width / 100,
    height: width / 12,
    borderRadius: 3
  },
  definedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    padding: width / 100,
    height: width / 9.375,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: '#215a9a',
    backgroundColor: 'rgba(13,26,44,0.8)',
    borderRadius: 3
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    padding: width / 100,
    height: width / 9.375,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: '#215a9a',
    backgroundColor: 'rgba(13,26,44,0.8)',
    borderRadius: 3
  },
  password1Container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0)',
    width: width/1.5,
    height: 30
  },
  inputViewContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 10,
    paddingRight: 10,
    height: width / 9.375,
    borderBottomWidth:1,
    borderBottomColor:'#212c3a'
  },
  textareaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: width/1.5
  }
})