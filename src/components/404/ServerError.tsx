import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ServerError = () => {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
            }}
        >
            <Box
                className="u-box-light"
                sx={{
                    width: "700px",
                    height: "350px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography
                    variant="h2"
                    color="white"
                    align="center"
                    fontWeight={700}
                    textTransform="capitalize"
                    px={2}
                >
                    We have got a server error!
                </Typography>

                <Typography variant="h5" color="white" align="center" textTransform="capitalize" px={2}>
                    This app logged the error to the logger service and we will fix the problem. Thank you!
                </Typography>

                <Button onClick={() => (window.location.href = "/")} variant="contained" color="primary">
                    Go Home
                </Button>
            </Box>
        </Box>
    );
};

export default ServerError;
