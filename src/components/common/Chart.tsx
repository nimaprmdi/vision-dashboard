import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

const Chart = () => {
    const requestsState = useSelector((state: RootState) => state.requests);

    const [chartOptions, setChartOptions] = useState<ApexOptions>({
        chart: {
            type: "area",
            foreColor: "#fff",
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19T00:00:00.000Z",
                "2018-09-19T01:30:00.000Z",
                "2018-09-19T02:30:00.000Z",
                "2018-09-19T03:30:00.000Z",
                "2018-09-19T04:30:00.000Z",
                "2018-09-19T05:30:00.000Z",
            ],
            labels: {
                style: {
                    colors: "white",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "white",
                },
            },
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
    });

    const [chartData, setChartData] = useState({
        series: [
            {
                name: "Requests",
                data: [1, 2, 3, 4, 5, 5],
            },
        ],
    });

    useEffect(() => {
        if (!requestsState.isLoading) {
            const requestsDates = requestsState.requests.map((item) => new Date(item.date).toISOString().split("T")[0]);

            const uniq = [...new Set(requestsDates)];

            const count: any = {};
            const arr: any = [];

            requestsDates.forEach((element) => {
                count[element] = ((count[element] as any) || 0) + 1;
            });

            Object.entries(count).forEach(([key, value]) => {
                arr.push(value);
            });

            setChartOptions({
                ...chartOptions,
                xaxis: {
                    ...chartOptions.xaxis,
                    categories: uniq,
                },
            });

            setChartData({
                series: [
                    {
                        name: "Requests",
                        data: arr,
                    },
                ],
            });
        }
    }, [requestsState]);

    return <ReactApexChart options={chartOptions} series={chartData.series} type="area" width="100%" height="335px" />;
};

export default Chart;
