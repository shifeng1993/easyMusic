/**
 * 组件名称： InputTree
 * 功能： 左侧树形选择器
 * 作者： haise
 * 邮箱： shifeng199307@gmail.com
 * props：
 * data:json                      json树
 * model: string                  默认的初始值
 * onPress:()=>{}                 点击字的事件
 * returnModel={(item)=>{}        回调函数，
 * width:number                   按钮宽度 默认80，
 * placeholder：string            默认显示的。
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Tree from './Tree';

const {height, width} = Dimensions.get('window');

class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      model: null
    };
  }
  static defaultProps = {
    data: [],
    returnModel: () => {},
    onPress:()=>{},
    model: null,
    width: width/2,
    placeholder: '请选择'
  };
  queryTree = (str, tree) => {
    if(tree.length !== 0){
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i];
        if (item[this.props.title] === str) {
          return item
        } else {
          this.queryTree(str, item[this.props.childNode]);
        }
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.model && nextProps.data) {
      this.setState({model: nextProps.model});
      let item = this.queryTree(nextProps.model, nextProps.data)
      if(!item){
        item = null
      }
      nextProps.returnModel(item);
    }
  }
  render() {
    let items;
    if (this.props.data) {
      items = this.props.data.map((item, index) => {
        return <Tree key={index} data={item} title={this.props.title} childNode={this.props.childNode} value={this.props.value} returnModel={this.props.returnModel} setModel={(title)=>{this.setState({model:title});this.hideModal()}}/>
      })
    }
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
                padding:0,
                textAlign: 'right'
              }}>{this.props.placeholder}<Icon name={'bottom-bold'} size={14} color={'#90c2f9'}/></Text>
            : <Text style={{
              flex: 1,
              textAlign: 'right',
              flexDirection: 'row',
              alignItems: 'center',
              padding:0
            }}>
              <Text
                style={{
                fontSize: 16,
                color: '#fff',
                padding:0
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
            animationIn={'fadeInLeft'}
            animationOut={'fadeOutLeft'}
            isVisible={this.state.isModalVisible}
            style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            margin: 0
          }}>
            <View
              style={{
              width: width * 0.67,
              height: height,
              backgroundColor: ThemeStyle.pageColor,
              paddingBottom:width/10,
              paddingTop:width/10 + ((Platform.OS === 'ios') ? 20:StatusBar.currentHeight)
            }}>
              <ScrollView style={{
                flex: 1
              }}>
                {items}
              </ScrollView>
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

  showModal = () => this.setState({isModalVisible: true})

  hideModal = () => this.setState({isModalVisible: false})
}

export default Modals;

const styles = StyleSheet.create({
  itemTitle: {
    height: 45,
    width: width*0.67,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#000'
  }
})