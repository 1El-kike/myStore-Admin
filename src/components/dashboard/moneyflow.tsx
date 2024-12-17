import React from 'react'
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts';
import { Datepicker } from 'flowbite-react';


export const Moneyflow = () => {

    

    const ApexChart = () => {
        const [state, setState] = React.useState({
          
            series: [140, 410],
            options: {
                 colors: ['#FF4560', '#000'], 
              chart: {
                width: 3000,
                type: 'donut' as 'donut',
              },
              plotOptions: {
                pie: {
                  startAngle: -20,
                  endAngle: 340,
                  donut:{
                    size:'20%'
                  }
                }
              },
              dataLabels: {
                enabled: false
              },
              fill: {
                type: 'gradient',
              },
              legend: {
                formatter: function(val:any, opts:any) {
                  return val + " - " + opts.w.globals.series[opts.seriesIndex]
                }
              },
              title: {
                text: ''
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          
          
        });

        return (
          <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="donut" width={380} />
              </div>
            <div id="html-dist"></div>
          </div>
        );
      }

  return (
    <div className='w-full flex-col h-full flex items-center justify-center'>
        <h1 className='text-2xl font-bold w-full mb-5 ml-28'>Money flow</h1>
        <div className='bg-red-200 rounded-2xl'>
            <div className='w-32'>
            <Datepicker/>
            </div>
        <ApexChart />
        </div>
    </div>
  )
}
