import React from "react";
import { Grid, Box, Typography, Stack, Button } from "@mui/material";
import ServiceBadge from "../common/build/ServiceBadge";
import ProfileSummary from "../common/build/ProfileSummary";

const SingleDetails = () => {
    return (
        <Grid container spacing={2} sx={{ px: { xs: 2, md: 0 } }}>
            <Grid item container xs={12} md={7} spacing={2}>
                <Grid item xs={12} xl={6}>
                    <ProfileSummary />
                </Grid>
                <Grid item xs={12} xl={6}>
                    <ServiceBadge />
                </Grid>

                <Grid item xs={12} pl={2}>
                    <Box className="u-box-light" mt={2.25} py={3.5} px={5}>
                        <Typography variant="h5" color="white">
                            Profile Informations
                        </Typography>

                        <Typography mt={2} variant="h6" className="u-text-small" color="gray.light">
                            Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer is no. If two equally
                            difficult paths, choose the one more painful in the short term (pain avoidance is creating
                            an illusion of equality).
                        </Typography>

                        <Box mt={5} className="u-divider" />

                        <Stack mt={3.5}>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant="h6" className="u-text-small" color="gray.light">
                                    Address:
                                </Typography>

                                <Typography variant="h6" className="u-text-small" color="white">
                                    Tehran Azadi Street
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>

            <Grid item container xs={12} md={5}>
                <Box className="u-box-light" sx={{ width: "100%", height: "300px" }} p={3}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h5" color="white">
                            Location
                        </Typography>

                        <Button variant="contained" color="primary">
                            View On Map
                        </Button>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12} mt={4}></Grid>
        </Grid>
    );
};

export default SingleDetails;
