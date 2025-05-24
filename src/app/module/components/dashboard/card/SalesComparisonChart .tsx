import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface ChartSeriesData {
    name: string;
    data: number[];
}

interface SalesComparisonChartProps {
    isSmall?: boolean;
}

const SalesComparisonChart = ({ isSmall = false }: SalesComparisonChartProps) => {
    const [chartOptions, setChartOptions] = useState<ApexOptions>({});
    const [chartSeries, setChartSeries] = useState<ChartSeriesData[]>([]);

    useEffect(() => {
        // Datos de ejemplo
        const currentMonthSales = [4500, 5200, 4800, 6100, 7200, 6900, 8000, 7800, 8500, 9100, 8900, 9500];
        const previousMonthSales = [4000, 4900, 4600, 5800, 6700, 6300, 7500, 7200, 8000, 8600, 8300, 9000];

        // Configuración base
        const baseOptions: ApexOptions = {
            chart: {
                type: 'line',
                height: '100%',
                zoom: { enabled: false },
                toolbar: {
                    show: !isSmall,
                    tools: {
                        download: !isSmall,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: !isSmall
                    }
                }
            },
            colors: ['#3B82F6', '#10B981'],
            dataLabels: { enabled: false },
            stroke: {
                curve: 'smooth',
                width: isSmall ? 1.5 : 2
            },
            markers: {
                size: isSmall ? 3 : 4,
                hover: { size: isSmall ? 4 : 6 }
            },
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                labels: {
                    style: {
                        colors: '#6B7280',
                        fontSize: isSmall ? '10px' : '12px'
                    }
                },
                axisBorder: { show: false }
            },
            yaxis: {
                show: !isSmall,
                labels: {
                    style: {
                        colors: '#6B7280',
                        fontSize: '10px'
                    },
                    formatter: (value: number) => `$${isSmall ? `${value / 1000}k` : value.toLocaleString()}`
                }
            },
            grid: {
                borderColor: '#F3F4F6',
                strokeDashArray: 5,
                yaxis: { lines: { show: !isSmall } }
            },
            legend: { show: false },
            tooltip: {
                enabled: !isSmall,
                theme: 'light',
                y: {
                    formatter: (value: number) => `$${value.toLocaleString()}`
                }
            }
        };

        const series: ChartSeriesData[] = [
            { name: 'Este Mes', data: currentMonthSales },
            { name: 'Mes Anterior', data: previousMonthSales }
        ];

        setChartOptions(baseOptions);
        setChartSeries(series);
    }, [isSmall]);

    return (
        <>
            <div className={`bg-white transition-all animate-appearance-in duration-500 ${isSmall ? 'p-3 rounded-lg shadow-xs' : 'p-6 rounded-xl shadow-sm'} w-full border border-gray-100 h- bg-black`}>
                {!isSmall && (
                    <div className="flex justify-between items-center mb-4 ">
                        <h3 className="text-lg font-semibold text-gray-800">Yearly sales</h3>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Periodo:</span>
                            <select title='lost' className="text-sm border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                <option>Than last year</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="relative bg-white h-full">
                    {chartSeries.length > 0 && (
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="line"
                            height={240}
                            width="100%"
                        />
                    )}

                    {!isSmall && (
                        <div className="absolute top-0 right-14 flex space-x-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">This Month</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Previous Month</span>
                            </div>
                        </div>
                    )}

                    {isSmall && (
                        <div className="absolute bottom-2 left-2 flex space-x-3">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>

    );
};

export default SalesComparisonChart;