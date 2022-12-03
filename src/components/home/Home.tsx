import { Grid } from "@mui/material";
import BreadCrumbItem from "../common/BreadCrumbItem";
import WideCardMore from "../common/build/WideCardMore";
import WideCardDetails from "../common/build/WideCardDetails";
import WideCard from "../common/WideCard";

import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import Table from "../common/Table";
import PopUp from "../common/PopUp";

const Home = (): JSX.Element => {
    const [chartOptions, setChartOptions] = useState<ApexOptions>({
        chart: {
            type: "area",
            foreColor: "#fff",
        },
        dataLabels: {
            enabled: false,
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
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60],
            },

            {
                name: "series-1",
                data: [60, 10, 40, 30, 20, 80],
            },
        ],
    });

    return (
        <Grid container className="c-home" sx={{ px: { xs: 2, md: 0 } }}>
            {/* <PopUp /> */}
            <Grid item container spacing={2}>
                <BreadCrumbItem />
                <BreadCrumbItem />
                <BreadCrumbItem />
                <BreadCrumbItem />
            </Grid>

            <Grid item container spacing={2} xs={12} mt={2}>
                <Grid item xs={12} md={7}>
                    <WideCardMore />
                </Grid>

                <Grid item xs={12} md={5}>
                    <WideCardDetails />
                </Grid>
            </Grid>

            <Grid item container spacing={2} xs={12} mt={1}>
                <Grid item xs={12} md={7}>
                    <WideCard hasBackground={false} sx={{ pr: 3, pl: 1, pt: 4, pb: 1 }}>
                        <ReactApexChart
                            options={chartOptions}
                            series={chartData.series}
                            type="area"
                            width="100%"
                            height="335px"
                        />
                    </WideCard>
                </Grid>

                <Grid item xs={12} md={5}>
                    <WideCardDetails />
                </Grid>
            </Grid>

            <Grid item container xs={12}>
                <Table />
            </Grid>
        </Grid>
    );
};

export default Home;
