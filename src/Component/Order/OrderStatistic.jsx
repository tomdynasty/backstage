import React, {
  useState, useEffect,
} from 'react';
import { Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import '../../SCSS/Component/orderStatistic.scss';
import PropTypes from 'prop-types';
import OrderStatisticNumber from './OrderStatisticNumber';
import OrderMonthlyBar from './OrderMonthlyBar';
import { receiveOrderStatistics } from '../../Redux/Action/Order';

export default function OrderStatistic(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { year } = props;
  const dispatch = useDispatch();
  const {
    renewAmount,
    renewPercent,
    annualRevenue,
    monthlyRevenue,
  } = useSelector((state) => ({
    renewAmount: state.orderRecordsReducer.renewAmount,
    renewPercent: state.orderRecordsReducer.renewPercent,
    annualRevenue: state.orderRecordsReducer.annualRevenue,
    monthlyRevenue: state.orderRecordsReducer.monthlyRevenue,
  }));

  useEffect(() => {
    const fetchingStatistics = async () => {
      await dispatch(receiveOrderStatistics(year));
      setIsLoading(false);
    };
    fetchingStatistics();
  }, [dispatch, year]);

  return (
    <div>
      <div className="site-layout-background" style={{ padding: 24 }}>
        { isLoading
          ? <Spin tip="loading...">
              <OrderStatisticNumber style={{ marginBottom: '15px' }}
                renewAmount={renewAmount}
                renewPercent={renewPercent}
                annualRevenue={annualRevenue}
              />
           </Spin>
          : <OrderStatisticNumber style={{ marginBottom: '15px' }}
          renewAmount={renewAmount}
          renewPercent={renewPercent}
          annualRevenue={annualRevenue}
        />
        }
      </div>
      <div className="site-layout-background" style={{ padding: 24 }}>
        { isLoading
          ? <Spin tip="loading...">
              <OrderMonthlyBar monthlyRevenue={monthlyRevenue} />
            </Spin>
          : <OrderMonthlyBar monthlyRevenue={monthlyRevenue} />}
      </div>
  </div>
  );
}

OrderStatistic.propTypes = {
  year: PropTypes.number.isRequired,
};
