import React from 'react';
import mockAxios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import {
  render, waitFor, screen,
} from '../../TestsMock/test-utils';
import fakeOrderData from '../../TestsMock/fakeOrderData';
import OrderTable from './OrderTable';

jest.mock('axios');

const year = 2022;
function getResponse(url) {
  let response = null;
  switch (url) {
    case `/order_api/orders/${year}/record`:
      response = Promise.resolve({ data: fakeOrderData });
      break;
    default:
      break;
  }
  return response;
}

describe('訂單列表', () => {
  it('[success] 顯示訂單明細列表成功', async () => {
    mockAxios.get.mockImplementation((url) => getResponse(url));
    render(<OrderTable year={year}/>);

    let columnNames = null;
    let rows = null;
    await waitFor(() => {
      const tableBody = document.querySelector('.ant-table-tbody');
      rows = tableBody.childNodes;
      columnNames = document.querySelectorAll('.order-table th');
    });

    // 確認 table header 表頭內容
    expect(columnNames.length).toBe(7);
    expect(columnNames[0].textContent).toBe('訂單編號');
    expect(columnNames[1].textContent).toBe('名字');
    expect(columnNames[2].textContent).toBe('性別');
    expect(columnNames[3].textContent).toBe('訂購項目');
    expect(columnNames[4].textContent).toBe('訂購日期');
    expect(columnNames[5].textContent).toBe('付款狀態');
    expect(columnNames[6].textContent).toBe('後台人員備註');

    // 確認 table body 內容
    expect(rows.length).toBe(2);
    let columns = rows[0].childNodes;
    expect(columns[0].textContent).toBe('1');
    expect(columns[1].textContent).toBe('王力紅');
    expect(columns[2].textContent).toBe('male');
    let orderItems = columns[3].childNodes;
    expect(orderItems.length).toBe(1);
    expect(orderItems[0].textContent).toBe('體重計');
    expect(orderItems[0]).toHaveClass('ant-tag-green');
    expect(columns[4].textContent).toBe('2022-01-05 16:30:00');
    expect(columns[5].textContent).toBe('已付清');

    columns = rows[1].childNodes;
    expect(columns[0].textContent).toBe('2');
    expect(columns[1].textContent).toBe('周截倫');
    expect(columns[2].textContent).toBe('male');
    orderItems = columns[3].childNodes;
    expect(orderItems.length).toBe(2);
    expect(orderItems[0].textContent).toBe('雕塑營課程');
    expect(orderItems[0]).toHaveClass('ant-tag-blue');
    expect(orderItems[1].textContent).toBe('體重計');
    expect(orderItems[1]).toHaveClass('ant-tag-green');
    expect(columns[4].textContent).toBe('2022-01-03 16:30:00');
    expect(columns[5].textContent).toBe('尚未付款');
  });

  it('[error] 顯示訂單明細列表成功失敗', async () => {
    const error = {
      response: {
        status: 404,
        statusText: '不存在',
      },
    };
    mockAxios.get.mockRejectedValue(error);
    render(<OrderTable />);
    await waitFor(() => {
      expect(screen.getByText('404 : 取得訂單記錄清單失敗')).toBeInTheDocument();
    });
  });
});
