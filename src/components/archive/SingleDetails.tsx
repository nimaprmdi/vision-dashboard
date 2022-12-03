import MapBox from "../common/MapBox";
import ServiceBadge from "../common/build/ServiceBadge";
import ProfileSummary from "../common/build/ProfileSummary";
import CommandButtons from "../common/build/CommandButtons";
import { ICommandButtons } from "../../models/commandButtons";
import { Grid, Box, Typography, Stack, Button } from "@mui/material";
import Details from "../common/build/Details";
import Actions from "../common/build/Actions";

const SingleDetails = () => {
    const commandButtons: ICommandButtons[] = [
        { title: "Close Ticket", color: "primary" },
        { title: "Delete Ticket", color: "error" },
        { title: "Mark as Reviewing", color: "warning" },
    ];

    return (
        <Grid container spacing={2} sx={{ px: { xs: 2, md: 0 } }}>
            <Grid item container xs={12} md={7} spacing={1}>
                <Grid item xs={12} xl={6}>
                    <ProfileSummary />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <ServiceBadge />
                </Grid>

                <Grid item xs={12} pl={2}>
                    <Details />
                </Grid>
            </Grid>

            <Grid item container xs={12} md={5}>
                <Box className="u-box-light" sx={{ width: "100%", height: { xs: "500px", md: "100%" } }} p={3}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h5" color="white">
                            Location
                        </Typography>

                        <Button variant="contained" color="primary">
                            View On Map
                        </Button>
                    </Box>

                    <Box sx={{ height: "90%" }}>
                        <MapBox />
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Actions />
            </Grid>
        </Grid>
    );
};

export default SingleDetails;
