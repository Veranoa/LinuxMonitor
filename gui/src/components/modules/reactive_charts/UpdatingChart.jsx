/* 
* @file UpdatingChart.jsx
* Copyright (c) 2023 Yun LIU
*/

import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const UpdatingChart = ({ dataSource }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;
      const series = chart.series[0];

      const updateSeries = () => {
        const x = (new Date()).getTime();
        const y = dataSource[dataSource.length - 1];
        series.addPoint([x, y], true, true);
      };

      const updateInterval = setInterval(updateSeries, 1000);

      return () => clearInterval(updateInterval);
    }
  }, [dataSource]);

  const options = {
    chart: {
      type: 'spline',
      animation: Highcharts.svg,
      marginRight: 10,
      height: 600, // 设置图表高度
      spacingTop: 40, // 设置图表顶部间距
      spacingBottom: 20, // 设置图表底部间距
      backgroundColor: 'black',
    },
    time: {
      useUTC: false,
    },
    title: {
      text: 'TCP Connect Delay',
      style: {
        marginBottom:50,
        color: 'rgba(255,255,255,0.85)', // 设置标题颜色为 rgba(255,255,255,0.85)
      },
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150,
      labels: {
        style: {
          color: 'rgba(255,255,255,0.85)', // 设置刻度标签颜色为白色
        },
      },
      title: {
        text: 'Time',
        style: {
          color: 'rgba(255,255,255,0.85)', // 设置横坐标轴名称颜色为 rgba(255,255,255,0.85)
        },
      },
    },
    yAxis: {
      title: {
        text: 'Delaytime (ms)',
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: 'rgba(255,255,255,0.85)',
      }],
      labels: {
        style: {
          color: 'rgba(255,255,255,0.85)', 
        },
      },
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}',
    },
    legend: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    series: [{
      // ... other settings ...
      data: (() => {
        const data = [];
        const time = (new Date()).getTime();
        for (let i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: dataSource[i + 19] || 0, // 默认值为 0，避免未填充的数据为 undefined
          });
        }
        return data;
      })(),
      color: 'aqua',
    }],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />;
};

export default UpdatingChart;
