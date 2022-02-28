import {
  RECEIVE_USER_INFO,
  RECEIVE_USER_INFO_ERROR,
} from './Type';
import {
  callGetUserInfo,
} from '../../API/auth';

/**
   * 定義`取得當前登入的使用者`行為
   * @param json
   * @return {{type: string, userInfo: object}}
   */
export const userInfoAction = (json) => ({
  type: RECEIVE_USER_INFO,
  userInfo: json,
});

/**
   * 定義`取得當前登入的使用者 ERROR`行為
   * @param errorCode
   * @param errorText
   * @return {{type: string, errorCode: *, errorText: *}}
   */
export const userInfoErrorAction = (errorCode, errorText) => ({
  type: RECEIVE_USER_INFO_ERROR,
  errorCode,
  errorText,
});

/**
 * 派遣`取得當前登入的使用者`行為
 * @returns {function(): Promise<AxiosResponse<T> | never | never>}
 */
export const receiveUserInfo = () => (
  (dispatch) => (
    callGetUserInfo()
      .then((json) => {
        dispatch(userInfoAction(json));
      })
      .catch((error) => {
        dispatch(userInfoErrorAction(error.response.status, error.response.statusText));
      })
  )
);
