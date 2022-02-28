import {
  RECEIVE_ORDER_RECORDS,
  RECEIVE_ORDER_RECORDS_ERROR,
  RECEIVE_ORDER_CATEGORIES,
  RECEIVE_ORDER_CATEGORIES_ERROR,
} from './Type';
import {
  callGetOrderRecords,
  callGetOrderCategories,
} from '../../API/order';

/**
   * 定義`取得指定年份的訂單記錄清單`行為
   * @param json
   * @return {{type: string, list: array}}
   */
export const orderAction = (json) => ({
  type: RECEIVE_ORDER_RECORDS,
  list: json,
});

/**
   * 定義`取得指定年份的訂單記錄清單 ERROR`行為
   * @param errorCode
   * @param errorText
   * @return {{type: string, errorCode: *, errorText: *}}
   */
export const orderErrorAction = (errorCode, errorText) => ({
  type: RECEIVE_ORDER_RECORDS_ERROR,
  errorCode,
  errorText,
});

/**
 * 派遣`取得指定年份的訂單記錄清單`行為
 * @returns {function(): Promise<AxiosResponse<T> | never | never>}
 */
export const receiveOrderRecords = (year) => (
  (dispatch) => (
    callGetOrderRecords(year)
      .then((json) => {
        dispatch(orderAction(json));
      })
      .catch((error) => {
        dispatch(orderErrorAction(error.response.status, error.response.statusText));
      })
  )
);

/**
   * 定義`取得指定年份的訂單分類數據`行為
   * @param json
   * @return {{type: string, list: array}}
   */
export const orderCategoriesAction = (json) => ({
  type: RECEIVE_ORDER_CATEGORIES,
  categories: json,
});

/**
   * 定義`取得指定年份的訂單分類數據 ERROR`行為
   * @param errorCode
   * @param errorText
   * @return {{type: string, errorCode: *, errorText: *}}
   */
export const orderCategoriesErrorAction = (errorCode, errorText) => ({
  type: RECEIVE_ORDER_CATEGORIES_ERROR,
  errorCode,
  errorText,
});

/**
 * 派遣`取得指定年份的訂單分類數據`行為
 * @returns {function(): Promise<AxiosResponse<T> | never | never>}
 */
export const receiveOrderCategories = (year) => (
  (dispatch) => (
    callGetOrderCategories(year)
      .then((json) => {
        dispatch(orderCategoriesAction(json));
      })
      .catch((error) => {
        dispatch(orderCategoriesErrorAction(error.response.status, error.response.statusText));
      })
  )
);
