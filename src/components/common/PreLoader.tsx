import React from "react";
import { Box, Avatar } from "@mui/material";
import loader from "../../assets/img/loader.svg";

const PreLoader = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Avatar sx={{ width: "200px", height: "200px" }} src={loader} alt="Loading..." />
        </Box>
    );
};

export default PreLoader;
