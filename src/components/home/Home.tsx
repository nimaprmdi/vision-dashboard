import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import BreadCrumbItem from "../common/BreadCrumbItem";
import WideCardMore from "../common/build/WideCardMore";
import WideCardDetails from "../common/build/WideCardDetails";
import WideCard from "../common/WideCard";

import Table from "../common/Table";
import Skull from "../common/Skull";

import { Grid } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

import Chart from "../common/Chart";

const Home = (): JSX.Element => {
    const requestsState = useSelector((state: RootState) => state.requests);

    return (
        <Grid container className="c-home" sx={{ px: { xs: 2, md: 0 } }}>
            <Grid item container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    {requestsState.isLoading ? (
                        <Skull sx={{ height: "85px" }} />
                    ) : (
                        <BreadCrumbItem
                            title="Requests"
                            value={requestsState && requestsState.requests.length.toString()}
                            icon={<DocumentScannerIcon sx={{ fontSize: "18px" }} />}
                        />
                    )}
                </Grid>
            </Grid>

            <Grid item container spacing={2} xs={12} mt={2}>
                <Grid item xs={12} md={7}>
                    <WideCardMore />
                </Grid>

                <Grid item xs={12} md={5}>
                    {requestsState.isLoading ? (
                        <Skull sx={{ height: "386px" }} />
                    ) : (
                        <WideCardDetails
                            title="Requests Information"
                            boxTopTitle="Answered"
                            boxTopValue={requestsState.answeredRequests.toString()}
                            boxBottomTitle="Not Answered"
                            boxBottomValue={(requestsState.requests.length - requestsState.answeredRequests).toString()}
                            progressPercent={(requestsState.answeredRequests / requestsState.requests.length) * 100}
                            progressTitle="Total"
                            progressDesc="Percent"
                        />
                    )}
                </Grid>
            </Grid>

            <Grid item container spacing={2} xs={12} mt={1}>
                <Grid item xs={12} md={7}>
                    {requestsState.isLoading ? (
                        <Skull sx={{ height: "390px" }} />
                    ) : (
                        <WideCard hasBackground={false} sx={{ pr: 3, pl: 1, pt: 4, pb: 1 }}>
                            <Chart />
                        </WideCard>
                    )}
                </Grid>

                <Grid item xs={12} md={5}>
                    {requestsState.isLoading ? (
                        <Skull sx={{ height: "386px" }} />
                    ) : (
                        <WideCardDetails
                            title="Requests Information"
                            boxTopTitle="Answered"
                            boxTopValue={requestsState.answeredRequests.toString()}
                            boxBottomTitle="Not Answered"
                            boxBottomValue={(requestsState.requests.length - requestsState.answeredRequests).toString()}
                            progressPercent={(requestsState.answeredRequests / requestsState.requests.length) * 100}
                            progressTitle="Total"
                            progressDesc="Percent"
                        />
                    )}
                </Grid>
            </Grid>

            <Grid item container xs={12}>
                {requestsState.isLoading ? (
                    <Skull sx={{ height: { xs: "450px", md: "906px" }, mt: 3 }} />
                ) : (
                    <Table data="requests" />
                )}
            </Grid>
        </Grid>
    );
};

export default Home;
