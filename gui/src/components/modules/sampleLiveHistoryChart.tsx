/* 
* @file sampleLiveHistoryChart.css
* Copyright (c) 2023 Yun LIU
*/
import React, { useEffect, useState } from 'react';
import LiveHistoryChart from './reactive_charts/LiveHistoryChart' // 路径需要根据实际情况进行调整

const SampleLiveHistoryChart = () => {
  const [dataSource, setDataSource] = useState([]) as any;

  useEffect(() => {
    const generateRandomNumber = () => ({
      key: new Date().getTime(),
      value: Math.random() * 100
    });

    const updateDataSource = () => {
      setDataSource(prevDataSource => [
        ...prevDataSource,
        generateRandomNumber()
      ]);
    };

    const updateInterval = setInterval(updateDataSource, 1000);

    return () => clearInterval(updateInterval);
  }, []);
  

  return (
    <div>
      <LiveHistoryChart dataSource={dataSource}/>
    </div>
  );
};

export default SampleLiveHistoryChart;
