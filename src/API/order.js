import axios from 'axios';

/**
 * 呼叫`取得指定年份的訂單明細記錄`API
 * @param int year
 * @return {Promise<AxiosResponse<T> | never>}
 */
export const callGetOrderRecords = (year) => {
  const url = `/order_api/orders/${year}/record`;
  const params = {
    year,
  };

  return axios.get(url, params)
    .then((response) => (response.data));
};

/**
 * 呼叫`指定年份的訂單分類數據`API
 * @param int year
 * @return {Promise<AxiosResponse<T> | never>}
 */
export const callGetOrderCategories = (year) => {
  const url = `/order_api/orders/${year}/categories`;
  const params = {
    year,
  };

  return axios.get(url, params)
    .then((response) => (response.data));
};

export default callGetOrderRecords;
