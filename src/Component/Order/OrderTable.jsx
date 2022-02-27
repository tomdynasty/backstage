import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Tag, Spin } from 'antd';
import { receiveOrderRecords } from '../../Redux/Action/Order';

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
    dataIndex: 'order_items',
    key: 'order_items',
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
    title: '訂購日期',
    dataIndex: 'order_date',
    key: 'order_date',
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
    order_items: ['體重計'],
    payStatus: 1,
    note: '',
    order_date: '2022/01/05 10:00:00',
  },
  {
    id: '2',
    name: '周截倫',
    sex: 'man',
    order_items: ['智慧手錶', '體重計'],
    payStatus: 2,
    note: '',
    order_date: '2022/01/04 10:00:00',
  },
  {
    id: '3',
    name: '賽琳娜',
    sex: 'female',
    order_items: ['雕塑營課程', '智慧手錶'],
    payStatus: 1,
    note: '',
    order_date: '2022/01/04 10:00:00',
  },
];

export default function OrderTable() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const {
    order,
  } = useSelector((state) => ({
    order: state.orderRecordsReducer.list,
  }));

  useEffect(() => {
    const year = 181;
    const fetchingOrders = async () => {
      await dispatch(receiveOrderRecords(year));
      setIsLoading(false);
    };
    fetchingOrders();
  }, [dispatch]);
  return (
    <>
    {
      isLoading
        ? <Spin />
        : <Table columns={columns} dataSource={data} rowKey="id" />
    }
    </>
  );
}
