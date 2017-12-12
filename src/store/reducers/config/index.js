import * as types from '../../actions/actionTypes';
import configState from '../../states/config';

export default function config(state = configState, action) {
  switch (action.type) {
    case types.SET_THEME:
      return {
        ...state,
        userinfo: action.data
      };
    default:
      return state;
  }
}