
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import React, {useEffect, useRef } from 'react';
import { userAccountStore } from '../../../store/store';
  

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

  interface VerticalBarProps {
    option: any; 
    data: any; 
}

const VerticalBar: React.FC<VerticalBarProps> = ({ option, data }) => {

  const containerRef:any = useRef(null);
  const { setBarThickness } = userAccountStore()

  useEffect(() => {
      function handleResize() {
          const width = containerRef.current ? containerRef.current.offsetWidth : 0;
          if (width <= 600) {
              setBarThickness(10);
          } else if (width <= 1024) {
              setBarThickness(19);
          } else {
              setBarThickness(19);
          }
      }

      handleResize(); // Initial set
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

    return (      
        <div className="graph" ref={containerRef}>
            <Bar options={option} data={data}/>
        </div>
    );
};

export default VerticalBar;