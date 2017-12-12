import * as types from '../../actions/actionTypes';
import monitorState from '../../states/monitor';

export default function monitor(state = monitorState, action) {
  switch (action.type) {
      // 全部
    case types.SET_ALLS:
      return {
        ...state,
        alls: action.data
      };
      // 正常
    case types.SET_NORMALS:
      return {
        ...state,
        normals: action.data
      };
      // 告警
    case types.SET_ALARMS:
      return {
        ...state,
        alarms: action.data
      };
      // 宕机
    case types.SET_CRASHS:
      return {
        ...state,
        crashs: action.data
      };
      // 左侧树
    case types.SET_TREE_DATA:
      return {
        ...state,
        selectTreeData: action.data
      }
    default:
      return state;
  }
}