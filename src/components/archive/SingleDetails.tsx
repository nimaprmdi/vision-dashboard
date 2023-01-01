import Skull from "../common/Skull";
import MapBox from "../common/MapBox";
import Details from "../common/build/Details";
import Actions from "../common/build/Actions";
import ServiceBadge from "../common/build/ServiceBadge";
import ProfileSummary from "../common/build/ProfileSummary";
import { pendRequest, solveRequest, reviewRequest } from "../../store/requests/requestsActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ICommandButtons } from "../../models/commandButtons";
import { RootState } from "../../store/rootReducer";
import { IRequest } from "../../models/request";

interface requestsChart {
    title: string;
    payload: any;
}

const SingleDetails = () => {
    // params
    const { id } = useParams<{ id: string }>();
    // state
    const [request, setRequest] = useState<IRequest>();
    const [requestChart, setRequestChart] = useState<requestsChart[]>();
    const [isMapChanged, setIsMapChanged] = useState(false);
    // utils
    const requestState = useSelector((state: RootState) => state.requests);
    const currentAccount = useSelector((state: RootState) => state.accounts.currentAccount);
    const navigate = useNavigate();

    const commandButtons: ICommandButtons[] = [
        { title: "Mark as solved", color: "primary", handler: solveRequest(id!, request && request.itemStatus) },
        { title: "Mark as pending", color: "error", handler: pendRequest(id!, request && request.itemStatus) },
        { title: "Mark as reviewing", color: "warning", handler: reviewRequest(id!, request && request.itemStatus) },
    ];

    useEffect(() => {
        if (!requestState.isLoading && id) {
            const currentRequest = requestState.requests.find((request) => request.itemId === id);
            currentRequest ? setRequest(currentRequest) : navigate(`${process.env.REACT_APP_GLOBAL_HOME_LOCATION!}404`);
        } else {
            if (!id) {
                navigate(`${process.env.REACT_APP_GLOBAL_HOME_LOCATION!}404`);
            }
        }
    }, [requestState]);

    useEffect(() => {
        if (request) {
            setRequestChart([
                { title: "Address: ", payload: request.address },
                { title: "Service: ", payload: request.service },
                { title: "Status: ", payload: request.itemStatus },
                { title: "Mobile: ", payload: request.mobile },
                { title: "Phone: ", payload: request.phone },
                { title: "Gender: ", payload: request.gender },
            ]);

            setIsMapChanged(true);
        }
    }, [request]);

    return (
        <Grid container spacing={2} sx={{ px: { xs: 2, md: 0 } }}>
            <Grid item container xs={12} md={7} spacing={1}>
                <Grid item xs={12} xl={6}>
                    {!requestState.isLoading && request ? (
                        request.account ? (
                            <ProfileSummary
                                name={request.account.name || ""}
                                lastName={request.account.lastName || ""}
                                isAdmin={request.account.isAdmin || false}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                className="u-box-light"
                            >
                                <Typography variant="h6" color="white">
                                    User Not Found (Deleted)
                                </Typography>
                            </Box>
                        )
                    ) : (
                        <Skull sx={{ height: "210px" }} />
                    )}
                </Grid>
                <Grid item xs={12} xl={6}>
                    {requestState.isLoading ? (
                        <Skull sx={{ height: "210px" }} />
                    ) : (
                        <ServiceBadge
                            service={(request && request.service) || ""}
                            address={(request && request.address) || ""}
                            date={(request && request.date) || ""}
                        />
                    )}
                </Grid>

                <Grid item xs={12} pl={2}>
                    {requestState.isLoading ? (
                        <Skull sx={{ height: "250px" }} />
                    ) : (
                        <Details description={(request && request.description) || ""}>
                            {requestChart &&
                                requestChart?.map((request, index: number) => (
                                    <Box className="c-details__item" key={`details-item${request.title}-${index}`} sx={{ display: "flex", gap: 1, mb: 1 }}>
                                        <Typography variant="h6" className="u-text-small" color="gray.light">
                                            {request.title}
                                        </Typography>

                                        <Typography textTransform="capitalize" variant="h6" className="u-text-small" color="white">
                                            {typeof request.payload !== "boolean" ? request.payload : request.payload ? "Male" : "Female"}
                                        </Typography>
                                    </Box>
                                ))}
                        </Details>
                    )}
                </Grid>
            </Grid>

            <Grid item container xs={12} md={5}>
                {requestState.isLoading && request && Object.keys(request.location).length ? (
                    <Skull sx={{ height: "470px" }} />
                ) : (
                    <Box className="u-box-light" sx={{ width: "100%", height: { xs: "500px", md: "100%" } }} p={3}>
                        {request && request?.location ? (
                            <>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="h5" color="white" mb={2}>
                                        Location
                                    </Typography>
                                </Box>

                                <Box sx={{ height: "90%" }}>
                                    <MapBox isChanged={isMapChanged} location={request.location} />
                                </Box>
                            </>
                        ) : (
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h6" color="white">
                                    No Location Found
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </Grid>

            <Grid item xs={12}>
                {currentAccount.isAdmin && (
                    <Actions
                        title="Requests Actions"
                        buttons={commandButtons}
                        parentProps={{
                            className: "u-box-light",
                        }}
                        parentSx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                            justifyContent: { xs: "center", md: "space-between" },
                            py: 4,
                            px: 3,
                        }}
                        childSx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                            justifyContent: { xs: "center", md: "flex-end" },
                        }}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default SingleDetails;
