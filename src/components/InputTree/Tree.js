import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  // 方法-------------------------
  toggle = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    let childNodes;
    const {data, title, childNode,value, returnModel, setModel, onPress} = this.props
    if (!this.props.data[childNode] || this.props.data[childNode].length === 0) {
      childNodes = null
    } else {
      childNodes = this.props.data[childNode].map(function (node, index) {
          return <TreeView
            key={index}
            data={node}
            title={title}
            childNode={childNode}
            returnModel={returnModel}
            setModel={setModel}
            onPress={onPress}/>
        })
    }
    return (
      <View>
        <View
          style={{
          marginBottom: 15,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity onPress={this.toggle}>
            <Icon
              size={12}
              name={!childNodes
              ? 'minus-bold'
              : (this.state.visible
                ? 'bottom-bold'
                : 'right-bold')}
              color={!childNodes
              ? ThemeStyle.subtitleColor
              : ThemeStyle.importantText_1}
              style={{
              flex: 1,
              textAlign: 'left',
              paddingRight: 10,
              textAlignVertical: 'center'
            }}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
            flex: 1
          }}
            onPress={() => {
              this.props.returnModel(this.props.data);
              this.props.setModel(this.props.data[title])
            }}>
            <Text
              style={{
              color: '#fff',
              textAlignVertical: 'center',
              textAlign: 'left',
              flex: 1
            }}>
              {this.props.data[title]}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginLeft:20}}>
          {this.state.visible ? childNodes : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badgeNum: {
    backgroundColor: '#23a8f8',
    color: '#ffffff',
    minWidth: 19,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10
  }
});

export default TreeView;