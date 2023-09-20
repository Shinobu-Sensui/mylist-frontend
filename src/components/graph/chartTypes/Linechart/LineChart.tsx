import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  option: any; 
  data: any; 
}

const LineChart:React.FC<LineChartProps> = ({option, data}) => {
  return (
    <div className='graph'>
       <Line options={option} data={data} />
    </div>
  );
};

export default LineChart;