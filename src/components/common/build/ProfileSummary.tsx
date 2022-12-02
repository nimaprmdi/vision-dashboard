import React from "react";
import { Grid, Box, Typography } from "@mui/material";

const ProfileSummary = () => {
    return (
        <Box className="u-box-light" width="100%" pt={3} pl={3} pb={0.5}>
            <Typography variant="h1" color="white" fontWeight={700}>
                Nima
            </Typography>

            <Typography variant="h1" color="white" fontWeight={700}>
                Pour Mohammadi
            </Typography>

            <Typography mt={2} variant="h3" color="gray.light" fontWeight={700}>
                Admin
            </Typography>

            <Box pr={2}>
                <Box mt={4} mb={3} className="u-divider" />
            </Box>
        </Box>
    );
};

export default ProfileSummary;
