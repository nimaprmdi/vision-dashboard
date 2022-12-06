import { useMemo } from "react";
import BreadCrumbItem from "../common/BreadCrumbItem";
import WideCardMore from "../common/build/WideCardMore";
import WideCardDetails from "../common/build/WideCardDetails";
import WideCard from "../common/WideCard";
import ReactApexChart from "react-apexcharts";
import Table from "../common/Table";
import PopUp from "../common/PopUp";
import PreLoader from "../common/PreLoader";
import { Grid } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_REQUESTS } from "../../graphql/quey";
import { IRequests } from "../../models/requests";
import HomeIcon from "@mui/icons-material/Home";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

const Home = (): JSX.Element => {
    const { data, loading, error } = useQuery(GET_REQUESTS);

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

    if (loading) return <PreLoader />;

    if (error) return <PopUp title={error.message} />;

    console.log(data.requests);

    return (
        <Grid container className="c-home" sx={{ px: { xs: 2, md: 0 } }}>
            <Grid item container spacing={2}>
                <BreadCrumbItem
                    title="Requests"
                    value={data && data.requests.length}
                    icon={<DocumentScannerIcon sx={{ fontSize: "18px" }} />}
                />
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
