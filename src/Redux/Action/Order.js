import {
  RECEIVE_ORDER_RECORDS,
  RECEIVE_ORDER_RECORDS_ERROR,
} from './Type';
import {
  callGetOrderRecords,
} from '../../API/order';

/**
   * 定義`取得指定年份的訂單記錄清單`行為
   * @param json
   * @return {{type: string, list: array}}
   */
export const orderAction = (json) => ({
  type: RECEIVE_ORDER_RECORDS,
  list: json.data,
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
        console.log(json);
        dispatch(orderAction(json));
      })
      .catch((error) => {
        dispatch(orderErrorAction(error.response.status, error.response.statusText));
      })
  )
);
