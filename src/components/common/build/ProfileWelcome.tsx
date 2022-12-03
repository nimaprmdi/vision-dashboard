import React from "react";
import { Box, Grid, Typography, CircularProgress, Avatar } from "@mui/material";
import bgIMage from "./../../../assets/img/frankfurt.jpg";

const ProfileWelcome = () => {
    return (
        <Box
            className="u-box-light"
            sx={{
                width: "100%",
                minHeight: { xs: "100%", md: "320px" },
                p: 2,
                background: `url(${bgIMage})`,
                backgroundSize: "cover",
            }}
        >
            <Typography variant="h3" className="u-text-big" color="white" fontWeight={700}>
                Welcome back!
            </Typography>

            <Typography variant="h6" className="u-text-small" color="white" fontWeight={400} mt={0.5}>
                Nice to see you, Mark Johnson!
            </Typography>
        </Box>
    );
};

export default ProfileWelcome;
