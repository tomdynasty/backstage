import React from 'react';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <div>{text}</div>,
  },
  {
    title: '性別',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: '訂購項目',
    dataIndex: 'orderItems',
    key: 'orderItems',
    render: (orderItems) => (
      <>
        {orderItems.map((item) => {
          let color = 'green';
          if (item === '雕塑營課程') {
            color = 'blue';
          }
          return (
            <Tag color={color} key={item}>
              {item}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '付款狀態',
    dataIndex: 'payStatus',
    key: 'payStatus',
    render: (payStatus) => {
      if (payStatus === 1) {
        return '已付清';
      }
      if (payStatus === 2) {
        return '尚未付款';
      }
      return '未知的狀態';
    },
  },
  {
    title: '後台人員備註',
    dataIndex: 'note',
    key: 'note',
  },
];

const data = [
  {
    id: '1',
    name: '王力紅',
    sex: 'man',
    orderItems: ['體重計'],
    payStatus: 1,
    note: '',
  },
  {
    id: '2',
    name: '周截倫',
    sex: 'man',
    orderItems: ['智慧手錶', '體重計'],
    payStatus: 2,
    note: '',
  },
  {
    id: '3',
    name: '賽琳娜',
    sex: 'female',
    orderItems: ['雕塑營課程', '智慧手錶'],
    payStatus: 1,
    note: '',
  },
];

export default function PaymentTable() {
  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id" />;
    </>
  );
}
