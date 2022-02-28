import React from 'react';
import { Column } from '@ant-design/plots';
import PropTypes from 'prop-types';

export default function OrderMonthlyBar(props) {
  const { monthlyRevenue } = props;
  const config = {
    data: monthlyRevenue,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} width={300} height={200}/>;
}

OrderMonthlyBar.propTypes = {
  monthlyRevenue: PropTypes.array.isRequired,
};
