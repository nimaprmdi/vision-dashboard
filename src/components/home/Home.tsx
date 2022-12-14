import WideCardMore from "../common/build/WideCardMore";
import WideCardDetails from "../common/build/WideCardDetails";
import WideCard from "../common/WideCard";
import Table from "../common/Table";
import Skull from "../common/Skull";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

import Chart from "../common/Chart";
import AdminInformationCards from "../common/build/AdminInformationCards";
import TableRowRequests from "../common/build/TableRowRequests";

const Home = (): JSX.Element => {
    const requestsState = useSelector((state: RootState) => state.requests);
    const accountsState = useSelector((state: RootState) => state.accounts);
    const ticketsState = useSelector((state: RootState) => state.tickets);

    return (
        <Grid container className="c-home" sx={{ px: { xs: 2, md: 0 } }}>
            <AdminInformationCards />

            <Grid item container spacing={2} xs={12} mt={2}>
                <Grid item xs={12} md={7}>
                    {accountsState.isLoading ? <Skull sx={{ height: "386px" }} /> : <WideCardMore />}
                </Grid>

                <Grid item xs={12} md={5}>
                    {requestsState.isLoading ? (
                        <Skull sx={{ height: "386px" }} />
                    ) : (
                        <WideCardDetails
                            title="Tickets Information"
                            boxTopTitle="Answered"
                            boxTopValue={ticketsState.tickets.length.toString()}
                            boxBottomTitle="Not Answered"
                            boxBottomValue={(ticketsState.tickets.length - ticketsState.totalClosedTickets).toString()}
                            progressPercent={(ticketsState.totalClosedTickets / ticketsState.tickets.length) * 100}
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
                    <Table data="requests">
                        <TableRowRequests />
                    </Table>
                )}
            </Grid>
        </Grid>
    );
};

export default Home;
