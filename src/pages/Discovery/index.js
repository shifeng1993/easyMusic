import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import {StatusBar, Navigator, RootView, TabView} from '../../components';
import Theme from '../../common/ThemeStyle';

class Discovery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <RootView
        style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <TabView
          initialPage={this.state.initialPage}
          page={this.state.curTab}
          backgroundColor={'#fff'}
          tabbarPadding={15}
          tabbarHeight={newWidth/10}
          underlineMargin={10}
          underlineStyle={{height:2}}
          onChangeTab={this.onChangeTab}>
          <View tabLabel="音乐" style={{flex:1}}><Text>1</Text></View>
          <View tabLabel="视频" style={{flex:1}}><Text>2</Text></View>
          <View tabLabel="电台" style={{flex:1}}><Text>3</Text></View>
        </TabView>
      </RootView>
    );
  }
}

const styles = StyleSheet.create({})

export default Discovery;