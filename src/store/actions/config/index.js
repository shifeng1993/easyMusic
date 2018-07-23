import {
  SET_THEME
} from '../actionTypes';
import theme from '../../../common/ThemeStyle'

class ConfigActions {
  // 设置主题
  setTheme = (themeName) => (dispatch, getState) => {
    const data = theme[themeName]
    return {
      type: SET_THEME,
      data
    };
  };
}

export default new ConfigActions();
