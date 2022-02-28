import React, {
  useState, useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pie } from '@ant-design/plots';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { receiveOrderCategories } from '../../Redux/Action/Order';

export default function OrderPie(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { year } = props;
  const dispatch = useDispatch();
  const {
    categories,
  } = useSelector((state) => ({
    categories: state.orderRecordsReducer.categories,
  }));

  useEffect(() => {
    const fetchingCategories = async () => {
      await dispatch(receiveOrderCategories(year));
      setIsLoading(false);
    };
    fetchingCategories();
  }, [dispatch, year]);

  const config = {
    appendPadding: 10,
    data: categories,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return isLoading
    ? <Spin tip="loading...">
        <Pie {...config} height={300}/>
      </Spin>
    : <Pie {...config} height={300}/>;
}

OrderPie.propTypes = {
  year: PropTypes.number.isRequired,
};
