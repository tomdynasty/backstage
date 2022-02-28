import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table, Tag, Input, message,
} from 'antd';
import '../../SCSS/Component/orderTable.scss';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { receiveOrderRecords } from '../../Redux/Action/Order';
import { callPatchOrderNote } from '../../API/order';

export default function OrderTable(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [noteVal, setNoteVal] = useState('');
  const [currentEditID, setCurrentID] = useState(0);
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

  /**
   * 點擊備註按鈕
   * @param {string} note
   * @param {integer} id
   */
  const handleClickNote = (note, id) => {
    setIsEditing(true);
    setCurrentID(id);
  };

  /**
   * 處理備註內容
   * @param {string} note
   */
  const handleNoteOnChange = (e) => {
    setNoteVal(e.target.value);
  };

  /**
   * 確認送出更新備註點擊
   * @param {integer} id
   */
  const handleConfirmEditSubmit = async (id) => {
    setIsEditing(false);
    await callPatchOrderNote(id, noteVal)
      .then((res) => {
        message.success(`更新訂單編號 id [${id}] 成功`);
      })
      .catch((error) => {
        const { data } = error.response;
        const { detail } = data;
        message.error(`更新訂單編號 id [${id}] 失敗，失敗原因 ${data.message || detail}`);
      });
    setIsLoading(true);
    await dispatch(receiveOrderRecords(year));
    setIsLoading(false);
  };

  const columns = [
    {
      title: '訂單編號',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <div>{text}</div>,
    },
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
      width: '20%',
      render: (note, { id }) => <>
         { isEditing && currentEditID === id
           ? <>
              <Input defaultValue={note} onChange={handleNoteOnChange} />
              <span className="Input-icon-group">
                <CheckOutlined onClick={() => handleConfirmEditSubmit(id)} />
                <CloseOutlined className="cancel-edit-icon" onClick={() => setIsEditing(false)} />
              </span>
             </>
           : <>
              <EditOutlined
                className="edit-note"
                onClick={() => handleClickNote(note, id)}
              />
              { note }
             </>
          }
      </>,
    },
  ];
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
  year: PropTypes.number,
};
