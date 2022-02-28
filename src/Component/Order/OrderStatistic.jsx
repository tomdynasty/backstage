import React from 'react';
import {
  Statistic, Row, Col, Button,
} from 'antd';
import {
  ArrowUpOutlined,
} from '@ant-design/icons';
import '../../SCSS/Component/orderStatistic.scss';

export default function OrderStatistic() {
  return (
    <div style={{ lineHeight: 50 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="該年度已續約人數" value={9999} />
        </Col>
        <Col span={8}>
          <Statistic
              title="年度續約比例"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              className="renew-percent"
            />
        </Col>
        <Col span={8}>
          <Statistic title="年度收益" value={112893} precision={2} />
        </Col>
      </Row>

  </div>
  );
}
