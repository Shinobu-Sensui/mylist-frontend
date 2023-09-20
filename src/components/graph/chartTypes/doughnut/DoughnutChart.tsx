
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
  

ChartJS.register(ArcElement, Tooltip, Legend);

  interface DoughnutProps {
    data: any; 
    option:any;
}

const DoughnutChart: React.FC<DoughnutProps> = ({ data, option }) => {
    return (      
        <div className="graph">
            <Doughnut data={data} options={option}/>
        </div>
    );
};

export default DoughnutChart;