/* 
* @file LiveHistoryChart.jsx
* Copyright (c) 2023 Yun LIU
*/
import "./LiveHistoryChart.css";
import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const LiveHistoryChart = ({ dataSource }) => {
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

  const commonOptions = {
    chart: {
      animation: Highcharts.svg,
      marginRight: 10,
      backgroundColor: 'transparent'
    },
    time: {
      useUTC: false
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150,
      labels: {
      },
      title: {
        text: 'Time',
      },
    },
    legend: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    series: [{
      name: '',
      data: []
    }]
  };

  const liveOptions = {
    ...commonOptions,
    chart: {
      ...commonOptions.chart,
      events: {
        load: function () {
          const series = this.series[0];
          setInterval(function () {
            const x = (new Date()).getTime();
            const y = Math.random() * 100;
            series.addPoint([x, y], true, true);
          }, 1000);
        }
      }
    },
    title: {
      text: 'Intense Data'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
    series: [{
      ...commonOptions.series[0],
      data: dataSource.slice(-20).map(data => [data.key, data.value])
    }]
  };

  const allDataOptions = {
    ...commonOptions,
    chart: {
      ...commonOptions.chart,
      height: 200,
    },
    title: {
      text: 'Recorded Data'
    },
    rangeSelector: {
      buttons: [{
        count: 1,
        type: 'minute',
        text: '1M'
      }, {
        count: 5,
        type: 'minute',
        text: '5M'
      }, {
        type: 'all',
        text: 'All'
      }],
      inputEnabled: false,
      selected: 0
    },
    xAxis: {
      type: 'datetime'
    },
    series: [{
      ...commonOptions.series[0],
      data: dataSource.map(data => [data.key, data.value])
    }]
  }


  return (
    <div>
      {dataSource.length > 0 && (
        <>
          <HighchartsReact highcharts={Highcharts} options={liveOptions} ref={chartRef} />
          <HighchartsReact highcharts={Highcharts} options={allDataOptions} ref={chartRef} />
        </>
      )}
      {dataSource.length === 0 && <p>No data available</p>}
    </div >
  );
}

export default LiveHistoryChart;
