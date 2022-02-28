import {
  RECEIVE_ORDER_RECORDS,
  RECEIVE_ORDER_RECORDS_ERROR,
  RECEIVE_ORDER_CATEGORIES,
  RECEIVE_ORDER_CATEGORIES_ERROR,
  RECEIVE_ORDER_STATISTICS,
  RECEIVE_ORDER_STATISTICS_ERROR,
} from './Type';
import {
  callGetOrderRecords,
  callGetOrderCategories,
  callGetOrderStatistics,
} from '../../API/order';

/**
   * 定義`取得指定年份的訂單記錄清單`行為
   * @param json
   * @return {{type: string, list: array}}
   */
export const orderAction = (json) => ({
  type: RECEIVE_ORDER_RECORDS,
  list: json,
  renewAmount: json.renew_amount,
  renewPercent: json.renew_percent,
  annualRevenue: json.annual_revenue,
  monthlyRevenue: json.monthly_revenue,
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
   * @return {{type: string, categories: array}}
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

/**
   * 定義`取得指定年份的訂單資料統計`行為
   * @param json
   * @return {{type: string, renewAmount: integer, renewPercent: float, annualRevenue: integer, monthlyRevenue: array}}
   */
export const orderStatisticsAction = (json) => ({
  type: RECEIVE_ORDER_STATISTICS,
  renewAmount: json.renew_amount,
  renewPercent: json.renew_percent,
  annualRevenue: json.annualRevenue,
  monthlyRevenue: json.monthly_revenue,
});

/**
   * 定義`取得指定年份的訂單資料統計 ERROR`行為
   * @param errorCode
   * @param errorText
   * @return {{type: string, errorCode: *, errorText: *}}
   */
export const orderStatisticsErrorAction = (errorCode, errorText) => ({
  type: RECEIVE_ORDER_STATISTICS_ERROR,
  errorCode,
  errorText,
});

/**
 * 派遣`取得指定年份的訂單資料統計`行為
 * @returns {function(): Promise<AxiosResponse<T> | never | never>}
 */
export const receiveOrderStatistics = (year) => (
  (dispatch) => (
    callGetOrderStatistics(year)
      .then((json) => {
        let annualRevenue = 0;
        const statistics = JSON.parse(JSON.stringify(json));
        json.monthly_revenue.forEach((month) => {
          const { value } = month;
          annualRevenue += value;
          statistics.annualRevenue = annualRevenue;
        });
        dispatch(orderStatisticsAction(statistics));
      })
      .catch((error) => {
        dispatch(orderStatisticsAction(error.response.status, error.response.statusText));
      })
  )
);
