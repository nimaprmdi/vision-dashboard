import { Grid, Box, Typography } from "@mui/material";
import login_background from "../../assets/img/login-bg.jpg";
import LoginForm from "../form/LoginForm";
import { useEffect } from "react";

const Login = () => {
    useEffect(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loginService");
    }, []);

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 1,
                        background: `url(${login_background})`,
                        backgroundSize: "cover",
                    }}
                >
                    <Typography variant="h4" color="white">
                        INSPIRED BY THE FUTURE:
                    </Typography>

                    <Typography variant="h1" color="white" fontWeight={700}>
                        THE VISION UI DASHBOARD
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <LoginForm />
            </Grid>
        </Grid>
    );
};

export default Login;
