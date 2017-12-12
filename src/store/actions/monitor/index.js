import * as types from '../actionTypes';
import theme from '../../../common/ThemeStyle'

/* ******************* 首页列表 ******************* */ 
// 全部
export const setAlls = (themeName) => {
  const data = theme[themeName]
  return {type: types.SET_ALLS, data};
};
// 正常
export const setNormals = (themeName) => {
  const data = theme[themeName]
  return {type: types.SET_NORMALS, data};
};
// 告警
export const setAlarms = (themeName) => {
  const data = theme[themeName]
  return {type: types.SET_ALARMS, data};
};
// 宕机
export const setCrashs = (themeName) => {
  const data = theme[themeName]
  return {type: types.SET_CRASHS, data};
};

// 左侧树
export const setTreeData = (selectTreeData) => {
  return {type: types.SET_TREE_DATA, data: selectTreeData}
};