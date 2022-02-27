import { notification } from 'antd';
import {
  RECEIVE_ORDER_RECORDS,
  RECEIVE_ORDER_RECORDS_ERROR,
} from '../Action/Type';

// 初始`取得指定年份的訂單記錄清單`的狀態
const orderRecordsInitState = {
  list: [],
};

/**
 * 依據行為的類型更新 store 內的`取得指定年份的訂單記錄清單`
 * @param state
 * @param action
 * @return {*}
 */
const orderRecordsReducer = (state = orderRecordsInitState, action) => {
  switch (action.type) {
    case RECEIVE_ORDER_RECORDS:
      return {
        ...state,
        list: action.list,
      };
    case RECEIVE_ORDER_RECORDS_ERROR:
      notification.error({
        message: `${action.errorCode} : 取得訂單記錄清單失敗`,
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

export default orderRecordsReducer;
