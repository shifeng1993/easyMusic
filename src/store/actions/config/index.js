import * as types from '../actionTypes';
import theme from '../../../common/themeStyle'
// 设置主题
export const setTheme = (themeName) => {
  const data = theme[themeName]
  return {type: types.SET_THEME, data};
};