import * as types from '../actionTypes';
import storage from '../../../utils/storage'
/* ******************* 用户类 ******************* */ 
// 获取用户uuid
export const getLoginUuid = (themeName) => {
  return (dispatch, getState) => {
    const loginUuid = await storage.get('loginUuid')
    return dispatch(setLoginUuid());
  };
};

export const setLoginUuid = (loginUuid) => {
  // const = storage.set('loginUuid', loginUuid)
  return {type: types.SET_LOGIN_UUID, loginUuid};
};