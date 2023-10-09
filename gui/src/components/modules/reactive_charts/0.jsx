import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

class LiveHistoryChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liveData: this.generateInitialLiveData(),
      allData: this.generateInitialAllData(),
      selectedRange: '1M', // Default selected range
    };
  }

  componentDidMount() {
    // Set up the interval to update the chart data
    this.interval = setInterval(this.updateLiveData.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  generateInitialLiveData() {
    const data = [];
    const currentTime = new Date().getTime();

    for (let i = -19; i <= 0; i++) {
      data.push({
        x: currentTime + i * 1000,
        y: Math.random(),
      });
    }

    return data;
  }

  generateInitialAllData() {
    const data = [];
    const currentTime = new Date().getTime();

    for (let i = -999; i <= 0; i++) {
      data.push([
        currentTime + i * 1000,
        Math.round(Math.random() * 100),
      ]);
    }

    return data;
  }

  updateLiveData() {
    const currentTime = new Date().getTime();
    const newData = {
      x: currentTime,
      y: Math.random(),
    };

    this.setState((prevState) => ({
      liveData: [...prevState.liveData.slice(1), newData],
    }));
  }

  handleRangeSelectorChange = (event) => {
    const selectedRange = event.target.value;
    const { allData } = this.state;

    let newData = allData;

    if (selectedRange === '1M') {
      newData = allData.slice(-60); // Last 60 points for 1M range
    } else if (selectedRange === '5M') {
      newData = allData.slice(-300); // Last 300 points for 5M range
    }

    this.setState({
      liveData: newData,
      selectedRange,
    });
  };

  render() {
    const { liveData, selectedRange } = this.state;

    const liveChartOptions = {
      chart: {
        type: 'spline',
        animation: Highcharts.svg,
        marginRight: 10,
        events: {
          load: function () {
            const series = this.series[0];
            setInterval(function () {
              const x = new Date().getTime();
              const y = Math.random();
              series.addPoint([x, y], true, true);
            }, 1000);
          },
        },
      },
      time: {
        useUTC: false,
      },
      title: {
        text: 'Live random data',
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
      },
      yAxis: {
        title: {
          text: 'Value',
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080',
          },
        ],
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
      series: [
        {
          name: 'Random data',
          data: liveData,
        },
      ],
    };

    const allChartOptions = {
      chart: {
        events: {
          load: function () {
            const series = this.series[0];
            setInterval(function () {
              const x = new Date().getTime();
              const y = Math.round(Math.random() * 100);
              series.addPoint([x, y], true, true);
            }, 1000);
          },
        },
      },
      accessibility: {
        enabled: false,
      },
      time: {
        useUTC: false,
      },
      rangeSelector: {
        buttons: [
          {
            count: 1,
            type: 'minute',
            text: '1M',
          },
          {
            count: 5,
            type: 'minute',
            text: '5M',
          },
          {
            type: 'all',
            text: 'All',
          },
        ],
        inputEnabled: false,
        selected: 0,
      },
      title: {
        text: 'Live random data',
      },
      exporting: {
        enabled: false,
      },
      series: [
        {
          name: 'Random data',
          data: this.state.allData,
        },
      ],
    };

    return (
      <div>
        <div>
          <label>
            Select Range:{' '}
            <select value={selectedRange} onChange={this.handleRangeSelectorChange}>
              <option value="1M">1 Minute</option>
              <option value="5M">5 Minutes</option>
            </select>
          </label>
        </div>
        <HighchartsReact highcharts={Highcharts} options={liveChartOptions} />
        <HighchartsReact highcharts={Highcharts} options={allChartOptions} />
      </div>
    );
  }
}

export default LiveHistoryChart;
