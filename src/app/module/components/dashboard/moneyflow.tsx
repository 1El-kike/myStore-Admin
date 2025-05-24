import React from "react";
import ReactApexChart from "react-apexcharts";
import DateCalendarServerRequest from "./DataTime";
import { useDashboardData } from "../../../hooks/useDashboardData";

interface TypeData {
  entityType: string;
}

export const Moneyflow: React.FC<TypeData> = ({ entityType }) => {
  const { data: dashboardData, isLoading, isError } = useDashboardData(entityType);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const series = dashboardData ? [dashboardData?.del, dashboardData?.can] : null;

  // Función para verificar si todos los valores son cero
  const allValuesZero = (arr: number[] | null) => {
    return arr?.every(num => num === 0) ?? false;
  };


  const ApexChart = () => {
    const [state] = React.useState({
      series: series,
      options: {
        colors: ['#128af3', "#FF4560", '#eed118', "#000"],
        chart: {
          width: 300,
          type: "donut" as const,
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
            const label = ["DELIVERED", "CANCELLED"];
            return `${label[opts.seriesIndex]} - ${opts.w.globals.series[opts.seriesIndex]}`;
          },
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
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series || [0, 0]}
          type="donut"
          width={380}
        />
      </div>
    );
  };

  const NoDataMessage = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 space-y-4">
      <div className="text-6xl">📭</div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-600">No Orders Data</h3>
        <p className="text-gray-500">No orders have been placed yet</p>
      </div>
    </div>
  );

  return (
    <div className="w-full animate-transition flex-col h-full flex items-center justify-center">
      <h1 className="text-2xl text-white font-bold w-full mb-5 ml-28">Money flow</h1>
      <div className="bg-gradient-to-bl from-rose-200/60 to-violet-200 gap-6 flex flex-col rounded-2xl">
        <div className="relative ml-4 ms-4 mb-10">
          <DateCalendarServerRequest />
        </div>
        <div className="mt-3 min-h-[300px] flex items-center justify-center">
          {!series || allValuesZero(series) ? (
            <NoDataMessage />
          ) : (
            <ApexChart />
          )}
        </div>
      </div>
    </div>
  );
};