import { Grid, Box, Typography, TextField, Stack, Button, Switch, FormGroup, Link, FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

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
const RegisterForm = () => {
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
                pt: { xs: 26, sm: "23%", md: "25%", xl: "15%" },
                pb: 5,
            }}
        >
            <Typography variant="h2" className="u-text-big" color="white">
                Welcome
            </Typography>

            <Typography sx={{ maxWidth: "300px" }} variant="h6" className="u-text-small" color="gray.light">
                Use these awesome forms to login or create new account in your project for free.
            </Typography>

            <Box
                sx={{
                    minWidth: { xs: "100%", md: "350px" },
                    maxWidth: "100%",
                    background:
                        "linear-gradient(123.64deg, rgba(255, 255, 255, 0) -22.71%, rgba(255, 255, 255, 0.039) 70.04%)",
                    backdropFilter: "blur(60px)",
                    border: "1px solid transparent",
                    borderImage: "linear-gradient(154deg, #ffffff0f 0%,  white 40%, #ffffff0f 100%) 1",
                }}
                mt={4}
                p={4}
            >
                <Typography variant="h5" color="white" align="center" fontWeight={700}>
                    Register with
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }} my={3}>
                    <Link href="#" className="u-box-light-secondary" sx={{ width: "75px", height: "75px" }}>
                        <FacebookIcon sx={{ color: "white", fontSize: "40px" }} />
                    </Link>

                    <Link href="#" className="u-box-light-secondary" sx={{ width: "75px", height: "75px" }}>
                        <GoogleIcon sx={{ color: "white", fontSize: "40px" }} />
                    </Link>
                </Box>

                <Typography variant="h5" className="u-text-small" color="white" align="center" my={2}>
                    or
                </Typography>

                <FormGroup>
                    <Box>
                        <FormLabel className="u-text-small" sx={{ color: "white" }}>
                            Email
                        </FormLabel>
                        <TextField sx={{ width: "100%", mt: 1 }} required id="form-name" label="Your Full Name" />
                    </Box>

                    <Box mt={3}>
                        <FormLabel className="u-text-small" sx={{ color: "white" }}>
                            Email
                        </FormLabel>
                        <TextField sx={{ width: "100%", mt: 1 }} required id="form-email" label="Your Email Address" />
                    </Box>

                    <Box mt={3}>
                        <FormLabel className="u-text-small" sx={{ color: "white" }}>
                            Password
                        </FormLabel>
                        <TextField sx={{ width: "100%", mt: 1 }} required id="form-password" label="Your Password" />
                    </Box>

                    <Stack mt={3} direction="row" spacing={1} alignItems="center">
                        <AntSwitch defaultChecked inputProps={{ "aria-label": "ant design" }} />
                        <Typography color="white">Remember Me</Typography>
                    </Stack>

                    <Button variant="contained" color="primary" sx={{ width: "100%", mt: 3 }}>
                        Sign Up
                    </Button>
                </FormGroup>
            </Box>

            <Typography variant="h6" className="u-text-small" color="white" mt={2}>
                Already have an account?
                <Link href="#" underline="none" color="white" ml={1}>
                    Login
                </Link>
            </Typography>
        </Box>
    );
};

export default RegisterForm;
