/* 
* @file sample.tsx
* Copyright (c) 2023 Yun LIU
*/
import React from 'react';
import CustomChart from './reactive_charts/CustomCharts'; // 替换为正确的组件路径
import { Form, Select } from 'antd';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const App = () => {

  const lineData = [
    { from: [48, 15], to: [110, -7] },
    { from: [48, 15], to: [55, -21] },
    // ...其他数据
  ];

  const pointData = [
    { name: 'Linux1', state: [48, 15],arrival:1414 },
    { name: 'Linux2', state: [110, -7],arrival:1212 },
    { name: 'Linux3', state: [55, -21], arrival:1515},
    // ...其他数据
  ];

  const animationSpeeds = ['2s', '4s', '6s'];

  const onChange = (value: string[]) => {
    console.log(value);
  };

  const options1: Option[] = [
    {
      value: 'Input',
      label: 'Input',
    },

    {
      value: 'Output',
      label: 'Output',
    },

  ]

  const options2: Option[] = [
    {
      value: 'TCP Conection Delay',
      label: 'TCP Conection Delay',
    },

    {
      value: 'TCP Wait Time',
      label: 'TCP Wait Time',
    },
  ]

  return (
    <div>
      <h1>Overview</h1>
      <CustomChart lineData={lineData} pointData={pointData} speed={animationSpeeds}/>
      <Form
        layout={'horizontal'}
        labelCol={{span:2}}
        wrapperCol={{span:22}}
      >
        <Form.Item label="Input/Output">
          <Select
            options={options1} onChange={() => onChange} allowClear placeholder="Please select" />
        </Form.Item>

        <Form.Item label="Type">
          <Select
            options={options2} onChange={() => onChange} allowClear placeholder="Please select" />
        </Form.Item>

      </Form>
    </div>
  );
};

export default App;
