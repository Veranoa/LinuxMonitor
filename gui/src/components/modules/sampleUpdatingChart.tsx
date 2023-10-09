/* 
* @file sampleUpdatingChart.css
* Copyright (c) 2023 Yun LIU
*/

import React, { useEffect, useState } from 'react';
import UpdatingChart from './reactive_charts/UpdatingChart';

const SampleUpdatingChart = () => {
  const [dataSource, setDataSource] = useState([]) as any;

  useEffect(() => {
    const generateRandomNumber = () => Math.random() * 100;

    const updateDataSource = () => {
      setDataSource(prevDataSource => [
        ...prevDataSource.slice(-19),
        generateRandomNumber()
      ]);
    };

    const updateInterval = setInterval(updateDataSource, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div>
      <UpdatingChart dataSource={dataSource} />
    </div>
  );
};

export default SampleUpdatingChart;
