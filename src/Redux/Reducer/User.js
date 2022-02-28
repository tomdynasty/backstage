import { notification } from 'antd';
import {
  RECEIVE_USER_INFO,
  RECEIVE_USER_INFO_ERROR,
} from '../Action/Type';

// 初始`取得當前登入的使用者`的狀態
const userInfoInitState = {
  userInfo: {},
};

/**
 * 依據行為的類型更新 store 內的`取得當前登入的使用者`
 * @param state
 * @param action
 * @return {*}
 */
const userInfoReducer = (state = userInfoInitState, action) => {
  switch (action.type) {
    case RECEIVE_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case RECEIVE_USER_INFO_ERROR:
      notification.error({
        message: `${action.errorCode} : 取得當前登入的使用者失敗`,
        description: action.errorText,
        duration: 0,
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
