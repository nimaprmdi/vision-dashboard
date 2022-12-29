import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Permissions = () => {
    const navigate = useNavigate();

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
                <Typography variant="h2" color="white" align="center" fontWeight={700} textTransform="capitalize" px={3}>
                    Wow! You've got an Error here.
                </Typography>

                <Typography variant="h5" color="white" align="center" textTransform="capitalize" px={2}>
                    Please go back home and try again
                </Typography>

                <Button onClick={() => navigate("/")} variant="contained" color="primary">
                    Go Home
                </Button>
            </Box>
        </Box>
    );
};

export default Permissions;