import React from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import ProfileCards from "./ProfileCards";
import { IAccount } from "../../../models/account";

interface ProfileSummaryDetailsProps {
    user: IAccount;
}

const ProfileSummaryDetail = ({ user }: ProfileSummaryDetailsProps) => {
    const [progress, setProgress] = useState(95);

    const solvedRequests = user.requests.filter((request) => request.itemStatus === "solved");
    const solvedTickets = user.tickets.filter((ticket) => ticket.isClose === true);

    return (
        <Box className="u-box-light" sx={{ width: "100%", height: "100%", px: 1, pt: { xs: 2, md: 0 } }}>
            <Grid sx={{ alignContent: "center", height: "100%" }} container spacing={2} p={2} alignItems="center">
                <Grid item xs={12} sx={{ mt: { md: 2, xl: 0 } }}>
                    <Typography variant="h5" color="white" fontWeight={700}>
                        User Information
                    </Typography>
                    <Typography variant="h6" className="u-text-small" color="white" fontWeight={400}>
                        Here is your data based on your actions
                    </Typography>
                </Grid>

                <Grid item xs={12} xl={4} order={{ xs: 2, xl: 1 }} mt={2}>
                    <Box className="c-smartcard__progress-container" sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress
                            size="80%"
                            color="success"
                            thickness={4}
                            variant="determinate"
                            value={progress}
                            sx={{
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        />

                        <Box className="c-smartcard__progress-context">
                            <Typography variant="h6" className="u-text-tiny" color="gray.light">
                                Action Score
                            </Typography>
                            <Typography variant="h4" className="u-text-massive" color="white">
                                {user.tickets.length + user.requests.length + solvedRequests.length + solvedTickets.length}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid className="c-chat" item container xs={12} xl={8} order={{ xs: 1, xl: 2 }} sx={{ p: 0, mt: { xs: 2 } }}>
                    <ProfileCards user={user} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfileSummaryDetail;
