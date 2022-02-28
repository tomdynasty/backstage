import { notification } from 'antd';
import {
  RECEIVE_ORDER_RECORDS,
  RECEIVE_ORDER_RECORDS_ERROR,
  RECEIVE_ORDER_CATEGORIES,
  RECEIVE_ORDER_CATEGORIES_ERROR,
  RECEIVE_ORDER_STATISTICS,
  RECEIVE_ORDER_STATISTICS_ERROR,
} from '../Action/Type';

// 初始`取得指定年份的訂單記錄清單`的狀態
const orderRecordsInitState = {
  list: [],
  categories: [],
  renewAmount: 0,
  renewPercent: 0.0,
  annualRevenue: 0,
  monthlyRevenue: [],
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
        list: [],
      };
    case RECEIVE_ORDER_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case RECEIVE_ORDER_CATEGORIES_ERROR:
      notification.error({
        message: `${action.errorCode} : 取得訂單分類數據失敗`,
        description: action.errorText,
        duration: 0,
      });
      break;
    case RECEIVE_ORDER_STATISTICS:
      return {
        ...state,
        renewAmount: action.renewAmount,
        renewPercent: action.renewPercent,
        annualRevenue: action.annualRevenue,
        monthlyRevenue: action.monthlyRevenue,
      };
    case RECEIVE_ORDER_STATISTICS_ERROR:
      notification.error({
        message: `${action.errorCode} : 取得訂單分類數據失敗`,
        description: action.errorText,
        duration: 0,
      });
      break;
    default:
      return state;
  }
  return state;
};

export default orderRecordsReducer;
