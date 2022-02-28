import React from 'react';
import { Pie } from '@ant-design/plots';

export default function OrderPie() {
  const data = [
    {
      type: '線上課程',
      value: 27,
    },
    {
      type: '穿戴裝置',
      value: 18,
    },
    {
      type: '健身保健/代餐',
      value: 15,
    },
    {
      type: '運動配件/服飾',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
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
  return <Pie {...config} height={300} />;
}
