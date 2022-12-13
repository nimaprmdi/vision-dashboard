import React from "react";
import { Grid, Box, Typography } from "@mui/material";

interface ProfileSummaryProps {
    name: string;
    lastName: string;
    isAdmin: boolean;
}

const ProfileSummary = ({ name, lastName, isAdmin }: ProfileSummaryProps) => {
    return (
        <Box className="u-box-light" width="100%" pt={3} pl={3} pb={0.5}>
            <Typography textTransform="capitalize" variant="h1" color="white" fontWeight={700}>
                {name}
            </Typography>

            <Typography textTransform="capitalize" variant="h1" color="white" fontWeight={700}>
                {lastName}
            </Typography>

            <Typography mt={2} variant="h3" color="gray.light" fontWeight={700}>
                {isAdmin ? "Admin" : "User"}
            </Typography>

            <Box pr={2}>
                <Box mt={4} mb={3} className="u-divider" />
            </Box>
        </Box>
    );
};

export default ProfileSummary;
