/**
 * 组件名称： Modals
 * 功能： 上拉选择器
 * 作者： 刘书鹏
 * 邮箱： 807028828@qq.com
 * props：
 * title: string                   标题
 * data: array                     数组，里面可以是对象或者字符串，对象必须有一个label
 * model: string                  默认的初始值
 * onPress:()=>{}                 点击字的事件
 * returnModel={(item)=>{}        回调函数，
 * width: number                   按钮宽度 默认80，
 * placeholder：string            默认显示的。
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import utils from '../../utils'

const {height, width} = Dimensions.get('window');
const isIphoneX = utils.isIphoneX()

class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      model: null
    };
  }
  static defaultProps = {
    title: null,
    data: [],
    returnModel: () => {},
    onPress:()=>{},
    model: null,
    width: 100,
    placeholder: '请选择'
  };
  componentWillMount() {
    if (this.props.model) {
      this.setState({model: this.props.model});
      const index = (this.props.data.indexOf(this.props.model) !== -1)? this.props.data.indexOf(this.props.model) : null
      this.props.returnModel(this.props.model, index);
    }
  }
  render() {
    return (
      <View style={{
        width: this.props.width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight:15
      }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
          flex:1,
          width: this.props.width,
          flexDirection: 'row',
          alignItems: 'center'
        }}
          onPress={() => {
            this.props.onPress();
            this.showModal();
          }}>
          {!this.state.model
            ? <Text
                style={{
                fontSize: 16,
                color: '#444444',
                flex: 1,
                textAlign: 'right'
              }}>{this.props.placeholder}<Icon name={'bottom-bold'} size={14} color={'#90c2f9'}/></Text>
            : <Text style={{
              flex: 1,
              textAlign: 'right',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text
                style={{
                fontSize: 16,
                color: '#fff'
              }}>
                {((typeof(this.state.model) === 'string')
                  ? this.state.model
                  : this.state.model.label) + ' '}</Text>
            </Text>}
          <Modal
            backdropColor={'black'}
            backdropOpacity={0.4}
            onBackButtonPress={this.hideModal}
            onBackdropPress={this.hideModal}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            isVisible={this.state.isModalVisible}
            style={{
            justifyContent: 'flex-end',
            margin: 0,
            paddingBottom: isIphoneX ? 25 : 0  // 兼容iphonX
          }}>
            <View
              style={{
              height: this.props.data.length * 45 + (this.props.title
                ? 45
                : 0),
              backgroundColor: ThemeStyle.pageColor
            }}>
              <View style={{
                flex: 1
              }}>
                {this.props.title
                  ? <LinearGradient
                      style={styles.itemTitle}
                      colors={ThemeStyle.linearColor}
                      start={{
                      x: 0.0,
                      y: 1.0
                    }}
                      end={{
                      x: 1.0,
                      y: 1.0
                    }}>
                      <Text
                        style={{
                        flex: 1,
                        fontSize: 16,
                        textAlign: 'center',
                        color: ThemeStyle.textColor,
                        backgroundColor: 'rgba(0,0,0,0)'
                      }}>this.props</Text>
                    </LinearGradient>
                  : null}
                {this._renderList(this.props.data)}
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        {!this.state.model? null : <TouchableOpacity activeOpacity={0.8} onPress={() => {
          this.setState({model: null});
          this.props.returnModel(null);
        }}>
          <Icon
          name={'cancel'}
          size={18}
          color={ThemeStyle.subtitleColor}/>
        </TouchableOpacity>}
      </View>  
    );
  }
  _renderList = (data) => {
    if (data.length === 0) {
      return
    }
    return (data.map((item, index) => {
      const title = (typeof(item) === 'string')
        ? item
        : item.label;
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          style={styles.itemTitle}
          onPress={() => {
          this.props.returnModel(item, index);
          this.setState({model: item});
          this.hideModal();
        }}>
          <LinearGradient
            style={styles.itemTitle}
            colors={ThemeStyle.linearColor}
            start={{
            x: 0.0,
            y: 1.0
          }}
            end={{
            x: 1.0,
            y: 1.0
          }}>
            <Text
              style={{
              flex: 1,
              fontSize: 16,
              textAlign: 'center',
              color: ThemeStyle.textColor,
              backgroundColor: 'rgba(0,0,0,0)'
            }}>{title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )
    }))
  }

  showModal = () => this.setState({isModalVisible: true})

  hideModal = () => this.setState({isModalVisible: false})
}

export default Modals;

const styles = StyleSheet.create({
  itemTitle: {
    height: 45,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#000'
  }
})