import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = () => {
  const options = {
    title: {
      text: 'Total Handled students'
    },
    series: [
      {
        name: 'Sample',
        data: [1, 2, 3, 4, 5]
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
