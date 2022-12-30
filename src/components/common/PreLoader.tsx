import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import loader from "../../assets/img/loader.svg";

interface IPreloaderProps {
    title?: string;
}

const PreLoader = ({ title }: IPreloaderProps) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Avatar sx={{ width: "200px", height: "200px" }} src={loader} alt="Loading..." />

            <Typography variant="h3" color="white">
                {title || " "}
            </Typography>
        </Box>
    );
};

export default PreLoader;
