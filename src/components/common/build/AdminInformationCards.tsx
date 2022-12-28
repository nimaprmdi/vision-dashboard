import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import BreadCrumbItem from "../BreadCrumbItem";
import Skull from "../Skull";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";

const AdminInformationCards = () => {
    const requestsState = useSelector((state: RootState) => state.requests);
    const accountsState = useSelector((state: RootState) => state.accounts);
    const ticketsState = useSelector((state: RootState) => state.tickets);

    return (
        <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                {requestsState.isLoading ? (
                    <Skull sx={{ height: "85px" }} />
                ) : (
                    <BreadCrumbItem
                        title="Total Requests"
                        value={requestsState && requestsState.requests.length.toString()}
                        icon={<DocumentScannerIcon sx={{ fontSize: "18px" }} />}
                    />
                )}
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                {!accountsState.isLoading && accountsState.accounts.length ? (
                    <BreadCrumbItem
                        title="Total Users"
                        value={accountsState && accountsState.accounts.length.toString()}
                        icon={<DocumentScannerIcon sx={{ fontSize: "18px" }} />}
                    />
                ) : (
                    <Skull sx={{ height: "85px" }} />
                )}
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                {!accountsState.isLoading && accountsState.accounts.length > 0 ? (
                    <BreadCrumbItem
                        title="Total Stafs"
                        value={accountsState.accounts.filter((account) => account.isAdmin).length.toString()}
                        icon={<DocumentScannerIcon sx={{ fontSize: "18px" }} />}
                    />
                ) : (
                    <Skull sx={{ height: "85px" }} />
                )}
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                {!ticketsState.isLoading && ticketsState.tickets.length ? (
                    <BreadCrumbItem
                        title="Total Tickets"
                        value={ticketsState && ticketsState.tickets.length.toString()}
                        icon={<DocumentScannerIcon sx={{ fontSize: "18px" }} />}
                    />
                ) : (
                    <Skull sx={{ height: "85px" }} />
                )}
            </Grid>
        </Grid>
    );
};

export default AdminInformationCards;
