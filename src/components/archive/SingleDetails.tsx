import MapBox from "../common/MapBox";
import ServiceBadge from "../common/build/ServiceBadge";
import ProfileSummary from "../common/build/ProfileSummary";
import CommandButtons from "../common/build/CommandButtons";
import Details from "../common/build/Details";
import Actions from "../common/build/Actions";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ICommandButtons } from "../../models/commandButtons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useEffect, useState } from "react";
import { IRequest } from "../../models/request";
import Skull from "../common/Skull";
import axios from "axios";

interface requestsChart {
    title: string;
    payload: any;
}

const SingleDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [request, setRequest] = useState<IRequest>();
    const [requestChart, setRequestChart] = useState<requestsChart[]>();
    const [isMapChanged, setIsMapChanged] = useState(false);
    const requestState = useSelector((state: RootState) => state.requests);
    const dispatch = useDispatch();

    const [data, setData] = useState<File>();
    const [assetId, setAssetId] = useState<string>();

    const commandButtons: ICommandButtons[] = [
        { title: "Close Ticket", color: "primary" },
        { title: "Delete Ticket", color: "error" },
        { title: "Mark as Reviewing", color: "warning" },
    ];

    useEffect(() => {
        if (!requestState.isLoading && id) {
            const currentRequest = requestState.requests.find((request) => request.itemId === Number(id));
            currentRequest ? setRequest(currentRequest) : navigate("/404");
        } else {
            if (!id) {
                navigate("/404");
            }
        }
    }, [requestState]);

    useEffect(() => {
        if (request) {
            setRequestChart([
                { title: "Address", payload: request.address },
                { title: "Service", payload: request.service },
                { title: "Status", payload: request.itemStatus },
                { title: "Mobile", payload: request.mobile },
                { title: "Phone", payload: request.phone },
                { title: "Gender", payload: request.gender },
            ]);

            setIsMapChanged(true);
        }
    }, [request]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget && e.currentTarget.files && setData(e.currentTarget.files[0]);

        const formData = new FormData();

        if (e.currentTarget && e.currentTarget.files) {
            formData.append("fileUpload", e.currentTarget.files[0]);
            fetch(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clayawfwp14ev01ukh88s2hit/master/upload`, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("Success:", result);
                    setAssetId("");
                    setAssetId(result.id);

                    return result;
                })
                .then((result) => {
                    console.log("result", result);

                    const imageId: string = result.id;

                    const data = JSON.stringify({
                        query: `mutation MyMutation {
                            publishAsset(where: {id: "${imageId.toString()}" }) {
                              id
                            }
                        }`,
                    });

                    axios
                        .post(
                            "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clayawfwp14ev01ukh88s2hit/master",
                            data
                        )
                        .then((response) => console.log("publish response ", response))
                        .catch((error) => console.log("publish error", error));
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    return (
        <Grid container spacing={2} sx={{ px: { xs: 2, md: 0 } }}>
            <Grid item container xs={12} md={7} spacing={1}>
                <Grid item xs={12} xl={6}>
                    {requestState.isLoading ? (
                        <Skull sx={{ height: "210px" }} />
                    ) : (
                        <ProfileSummary
                            name={(request && request.account.name) || ""}
                            lastName={(request && request.account.lastName) || ""}
                            isAdmin={(request && request.account.isAdmin) || false}
                        />
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
                                    <Box
                                        className="c-details__item"
                                        key={`details-item${request.title}-${index}`}
                                        sx={{ display: "flex", gap: 1, mb: 1 }}
                                    >
                                        <Typography variant="h6" className="u-text-small" color="gray.light">
                                            {request.title}
                                        </Typography>

                                        <Typography
                                            textTransform="capitalize"
                                            variant="h6"
                                            className="u-text-small"
                                            color="white"
                                        >
                                            {typeof request.payload !== "boolean"
                                                ? request.payload
                                                : request.payload
                                                ? "Male"
                                                : "Female"}
                                        </Typography>
                                    </Box>
                                ))}
                        </Details>
                    )}
                </Grid>
            </Grid>

            <Grid item container xs={12} md={5}>
                {requestState.isLoading ? (
                    <Skull sx={{ height: "470px" }} />
                ) : (
                    <Box className="u-box-light" sx={{ width: "100%", height: { xs: "500px", md: "100%" } }} p={3}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h5" color="white">
                                Location
                            </Typography>

                            <Button variant="contained" color="primary">
                                View On Map
                            </Button>
                        </Box>

                        {request && request?.location && (
                            <Box sx={{ height: "90%" }}>
                                <MapBox isChanged={isMapChanged} location={request.location} />
                            </Box>
                        )}
                    </Box>
                )}
            </Grid>

            <Grid item xs={12}>
                {/* <input type="file" onChange={(e) => handleInputChange(e)} /> */}
                <Actions buttons={commandButtons} />
            </Grid>
        </Grid>
    );
};

export default SingleDetails;
