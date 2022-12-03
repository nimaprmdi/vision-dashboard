import { Grid, Box, Typography, TextField, Stack, Button, Switch, FormGroup, Link, FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
        "& .MuiSwitch-thumb": {
            width: 15,
        },
        "& .MuiSwitch-switchBase.Mui-checked": {
            transform: "translateX(9px)",
        },
    },
    "& .MuiSwitch-switchBase": {
        padding: 2,
        "&.Mui-checked": {
            transform: "translateX(12px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(["width"], {
            duration: 200,
        }),
    },
    "& .MuiSwitch-track": {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
        boxSizing: "border-box",
    },
}));

const LoginForm = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexWrap: "wrap",
                alignContent: { xs: "center", md: "flex-start" },
                flexDirection: "column",
                background: "linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)",
                px: { xs: 2, md: 0 },
                pl: { md: 12 },
            }}
        >
            <Typography variant="h2" className="u-text-big" color="white">
                Nice to see you!
            </Typography>

            <Typography variant="h6" className="u-text-small" color="gray.light">
                Enter your h and password to sign in
            </Typography>

            <Box sx={{ minWidth: { xs: "100%", md: "350px" }, maxWidth: "100%" }} mt={4}>
                <FormGroup>
                    <Box>
                        <FormLabel className="u-text-small" sx={{ color: "white" }}>
                            Email
                        </FormLabel>
                        <TextField
                            sx={{ width: "100%", mt: 1 }}
                            required
                            id="outlined-required"
                            label="Your Email Address"
                        />
                    </Box>

                    <Box mt={3}>
                        <FormLabel className="u-text-small" sx={{ color: "white" }}>
                            Password
                        </FormLabel>
                        <TextField
                            sx={{ width: "100%", mt: 1 }}
                            required
                            id="outlined-required"
                            label="Your Password"
                        />
                    </Box>

                    <Stack mt={3} direction="row" spacing={1} alignItems="center">
                        <AntSwitch defaultChecked inputProps={{ "aria-label": "ant design" }} />
                        <Typography color="white">Remember Me</Typography>
                    </Stack>

                    <Button variant="contained" color="primary" sx={{ width: "100%", mt: 3 }}>
                        Login
                    </Button>
                </FormGroup>
            </Box>

            <Typography variant="h6" className="u-text-small" color="white" mt={2}>
                Don't have an account?
                <Link href="#" underline="none" color="white" ml={1}>
                    Sign up
                </Link>
            </Typography>
        </Box>
    );
};

export default LoginForm;
