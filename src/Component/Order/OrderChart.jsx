import React from 'react';
import OrderPie from './OrderPie';
import OrderStatistic from './OrderStatistic';

export default function OrderChart() {
  return (
    <>
      <OrderPie style={{ maxWidth: 700 }}/>
      <OrderStatistic style={{ maxWidth: 700 }} />
    </>
  );
}
