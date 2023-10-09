/* 
* @file CustomCharts.jsx
* Copyright (c) 2023 Yun LIU
*/
import "./CustomCharts.css";
import React, { useEffect } from 'react';
import * as _ from "lodash";
import PropTypes from 'prop-types';
import Highcharts from 'highcharts'; 
import HighchartsMap from 'highcharts/modules/map'; 

HighchartsMap(Highcharts);

const CustomChart = ({ lineData, pointData, speed }) => {

  useEffect(() => {
    Highcharts.mapChart('container', {
      title: {
        text: ''
      },
      tooltip: {
        useHTML: true,
        headerFormat: '<b>{point.key}</b>:<br/>',
        pointFormat: '{point.info}'
      },
      series: [
        {
          type: 'mapline',
          data:
            _.map(lineData, (item, index) => ({
              geometry: {
                type: 'LineString',
                coordinates: [item.from, item.to]
              },
              className: 'animated-line',
              color: '#666',
              animationSpeed: speed[index] || '2s'
            })),
          lineWidth: 2,
          enableMouseTracking: false
        },
        {
          type: 'mappoint',
          color: '#333',
          dataLabels: {
            format: '<b>{point.name}</b><br><span style="font-weight: normal; opacity: 0.5">{point.custom.arrival}</span>',
            align: 'left',
            verticalAlign: 'middle'
          },
          data:
            _.map(pointData, item => ({
              name: item.name,
              geometry: {
                type: 'Point',
                coordinates: item.state
              },
              custom: {
                arrival: item.arrival
              },
              dataLabels: {
                align: 'right'
              }
            })),
          enableMouseTracking: false
        }
      ]
    });
    //eslint-disable-next-line
  }, []);


  return (
    <div id="container" className="animated-line" style={{ width: '100%', height: '500px' }}>
      <div
        className="animated-line"
        style={{ width: '90%', height: '500px' }}
      ></div>
    </div>
  );
};

CustomChart.propTypes = {
  lineData: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.arrayOf(PropTypes.number),
      to: PropTypes.arrayOf(PropTypes.number),
    })
  ),
  pointData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      state: PropTypes.arrayOf(PropTypes.number),
      arrival: PropTypes.number,
    })
  ),
};

export default CustomChart;