import React, {useEffect, useState, useCallback} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {DataInterface} from '../App';

interface InvestmentChartProps {
  data: DataInterface | null;
  investedValue: number;
}

const BUY = 'buy';

const InvestmentChart: React.FC<InvestmentChartProps> = ({ data, investedValue}) => {
  const [options, setOptions] = useState<any>({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Portfolio Distributions',
      align: 'center'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: []
  });

  const updateSeriesData = useCallback((newData: any) => {
    setOptions((prevOptions: any) => ({
      ...prevOptions,
      series: [
        {
          ...prevOptions.series[0],
          data: newData
        }
      ]
    }));
  }, []);

  useEffect(() => {
    const chartGroups: any = {};

    if (data) {
      data.items.forEach((item: any ) => {
        if (item.type === BUY) {
          if(!chartGroups[item.assetType]) {
            chartGroups[item.assetType] = 0;
          }
          chartGroups[item.assetType] += item.pricePerUnit * item.amount;
        }
      });

      const seriesData: {y: number, name: string}[] = [];
      Object.keys(chartGroups).forEach((item) => {
        const y = (chartGroups[item] / investedValue) * 100;
        const name = item;
        seriesData.push({ y, name });
      });
      updateSeriesData(seriesData);
    }
  }, [data, investedValue, updateSeriesData]);

  return (
    <div style={{ height: '200px' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default InvestmentChart;
