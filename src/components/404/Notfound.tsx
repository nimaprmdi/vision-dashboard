import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

const Notfound = () => {
    const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.accounts.currentAccount);

    const handleNavigate = () => {
        if (Object.keys(currentUser).length) {
            navigate("/");
        } else {
            navigate(`login`);
        }
    };

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

                <Button onClick={() => navigate("/login")} variant="contained" color="primary">
                    Try Again
                </Button>
            </Box>
        </Box>
    );
};

export default Notfound;
