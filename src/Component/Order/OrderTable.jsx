import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
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
    render: (orderDates) => dayjs(orderDates).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '付款狀態',
    dataIndex: 'payment_status',
    key: 'payment_status',
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

export default function OrderTable(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { year } = props;

  const dispatch = useDispatch();
  const {
    orderData,
  } = useSelector((state) => ({
    orderData: state.orderRecordsReducer.list,
  }));

  useEffect(() => {
    const fetchingOrders = async () => {
      await dispatch(receiveOrderRecords(year));
      setIsLoading(false);
    };

    fetchingOrders();
  }, [dispatch, year]);
  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={orderData}
        rowKey="id"
        className='order-table'
      />
    </>
  );
}

OrderTable.propTypes = {
  year: PropTypes.number.isRequired,
};
