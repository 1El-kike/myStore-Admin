import React from "react";
import ReactApexChart from "react-apexcharts";
import DateCalendarServerRequest from "./DataTime";
import { useDashboardData } from "../../../hooks/useDashboardData";


interface TypeData{
  entityType:string
}


export const Moneyflow:React.FC<TypeData> = ({entityType}) => {

     const { data: dashboardData, isLoading, isError } = useDashboardData(entityType);

// Muestra estados de carga y error
if (isLoading) return <div>Cargando...</div>;
if (isError) return <div>Error cargando datos</div>;


const series =  [dashboardData?.del,dashboardData?.can]

  const ApexChart = () => {
    const [state, setState] = React.useState({
      series: series,
      options: {
        colors: ['#128af3',"#FF4560",'#eed118', "#000"],
        chart: {
          width: 300,
          type: "donut" as "donut",
        },
        plotOptions: {
          pie: {
            startAngle: 45,
            endAngle: 360,
            donut: {
              size: "20%",
            },
          },
        },
        dataLabels: {
          enabled: true,
        },
        fill: {
          type: "gradient",
        },
        legend: {
          formatter: function (val: any, opts: any) {
            const label = ["DELIVERED","CANCELLED",]

            return label[opts.seriesIndex] + " - "  + opts.w.globals.series[opts.seriesIndex];
          },
        },
        title: {
          text: "",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    });


    
    return (
      
      <div>
        <div id="chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            width={380}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  };

  return (
    <div className="w-full animate-transition flex-col h-full flex items-center justify-center">
      <h1 className="text-2xl font-bold w-full mb-5 ml-28">Money flow</h1>
      <div className="bg-gradient-to-bl from-rose-200 to-violet-200 gap-6 flex flex-col rounded-2xl">
        <div className="relative ml-4 ms-4 mb-10">
          <DateCalendarServerRequest />
        </div>
        <div className="mt-3">
          <ApexChart />
        </div>
      </div>
    </div>
  );
};
