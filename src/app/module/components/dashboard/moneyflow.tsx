import React from "react";
import ReactApexChart from "react-apexcharts";
import DateCalendarServerRequest from "./DataTime";

export const Moneyflow = () => {
  const ApexChart = () => {
    const [state, setState] = React.useState({
      series: [140, 410],
      options: {
        colors: ["#FF4560", "#000"],
        chart: {
          width: 3000,
          type: "donut" as "donut",
        },
        plotOptions: {
          pie: {
            startAngle: -20,
            endAngle: 340,
            donut: {
              size: "20%",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: "gradient",
        },
        legend: {
          formatter: function (val: any, opts: any) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex];
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
