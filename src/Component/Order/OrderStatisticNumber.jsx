import React from 'react';
import {
  Statistic, Row, Col,
} from 'antd';
import {
  ArrowUpOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import '../../SCSS/Component/orderStatistic.scss';

export default function OrderStatisticNumber(props) {
  const { renewAmount, renewPercent, annualRevenue } = props;
  return (
    <div style={{ lineHeight: 50 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="該年度已續約人數" value={renewAmount} />
        </Col>
        <Col span={8}>
          <Statistic
              title="年度續約比例"
              value={renewPercent}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              className="renew-percent"
            />
        </Col>
        <Col span={8}>
          <Statistic title="年度收益" value={`${annualRevenue} NT$`} />
        </Col>
      </Row>
  </div>
  );
}

OrderStatisticNumber.propTypes = {
  renewAmount: PropTypes.number.isRequired,
  renewPercent: PropTypes.number.isRequired,
  annualRevenue: PropTypes.number.isRequired,
};
