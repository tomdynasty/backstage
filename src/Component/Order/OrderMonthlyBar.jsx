import React from 'react';
import { Column } from '@ant-design/plots';

export default function OrderMonthlyBar() {
  const data = [
    {
      type: '1月',
      value: 20,
    },
    {
      type: '2月',
      value: 30,
    },
    {
      type: '3月',
      value: 25,
    },
    {
      type: '4月',
      value: 27,
    },
    {
      type: '5月',
      value: 30,
    },
    {
      type: '6月',
      value: 28,
    },
    {
      type: '7月',
      value: 30,
    },
    {
      type: '8月',
      value: 25,
    },
    {
      type: '9月',
      value: 27,
    },
    {
      type: '10月',
      value: 30,
    },
    {
      type: '11月',
      value: 27,
    },
    {
      type: '12月',
      value: 30,
    },
  ];
  const paletteSemanticRed = '#F4664A';
  const brandColor = '#5B8FF9';
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ type }) => {
      if (type < 30) {
        return paletteSemanticRed;
      }
      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return `${(val * 100).toFixed(1)}%`;
        }
        return val;
      },
      offset: 10,
    },
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
