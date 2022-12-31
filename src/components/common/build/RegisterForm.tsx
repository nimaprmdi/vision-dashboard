import { Grid, Box, Typography, TextField, Stack, Button, Switch, FormGroup, Link as MUILink, FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IAddAccount, IAddAccountError } from "../../../models/account";
import { validateProperty } from "../../form/validate";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { createAccount } from "../../../store/account/accountsActions";
import { loginWithGithub } from "../../../services/githubServices";
import GitHubIcon from "@mui/icons-material/GitHub";

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isHttpCalling = useSelector((state: RootState) => state.entities.isHttpCalling);
    const [errors, setErrors] = useState<IAddAccountError>();
    const [data, setData] = useState<IAddAccount>({
        itemId: "",
        name: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        hasRemember: false,
        isAdmin: false,
    });

    const schema = Joi.object({
        name: Joi.string().min(3).label("Name").messages({
            "string.base": `"Name" should text`,
            "string.empty": `"Name" cannot be empty`,
            "string.min": `"Name" minimum should be {#limit} chars`,
            "any.required": `"Name" is a required field`,
        }),
        lastName: Joi.string().min(4).label("Last name").messages({
            "string.base": `"Last name" should text`,
            "string.empty": `"Last name" cannot be empty`,
            "string.min": `"Last name" minimum should be {#limit}`,
            "any.required": `"Last name" is a required field`,
        }),
        userName: Joi.string()
            .regex(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
            .label("User name"),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .label("Email"),
        password: Joi.string()
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password")
            .message("Password Does Not Match pattern")
            .label("Password"),
        confirmPassword: Joi.string()
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password")
            .message("Password Does Not Match pattern")
            .label("Password"),
        hasRemember: Joi.boolean().required().label("Remember"),
        isAdmin: Joi.boolean().label("Admin"),
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean) => {
        const errorMsg = validateProperty(e.target, schema);

        setErrors({ ...errors, [e.target.name]: errorMsg });

        if (e.target.name === "hasRemember") {
            setData((prevState) => {
                return { ...prevState, [e.target.name]: checked };
            });
        } else {
            setData((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }

        if (errorMsg) {
            setErrors({ ...errors, [e.target.name]: errorMsg });
        } else {
            setErrors(() => {
                const allErrors: any = { ...errors };
                delete allErrors[e.target.name];
                return { ...allErrors };
            });
        }

        if (e.target.name === "confirmPassword") {
            data?.password !== e.target.value &&
                setErrors((prevState) => {
                    return { ...prevState, confirmPassword: "Password Does Not Match" };
                });
        } else if (e.target.name === "password") {
            setData({ ...data, password: e.target.value, confirmPassword: null });
        } else if (e.target.name === "email") {
            setData({ ...data, email: e.target.value, userName: `${e.target.value}-${uuidv4()}` });
        } else {
            setErrors((prevState) => {
                const allErrors = { ...prevState };
                delete allErrors["confirmPassword"];

                return { ...allErrors };
            });
        }
    };

    const handleSubmit = () => {
        // @todo : validate function before sending also for other forms
        console.log(data);
        dispatch(createAccount(data, navigate) as any);
    };

    const handleGithubLogin = () => {
        loginWithGithub();
    };

    useEffect(() => {
        setData({ ...data, itemId: uuidv4() });
    }, []);

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
                Use these awesome forms to login or create new account in your for free.
            </Typography>

            <Box
                className="u-opacity-0 u-fadein"
                sx={{
                    width: "100%",
                    maxWidth: { xs: "100%", md: "500px" },
                    background: "linear-gradient(123.64deg, rgba(255, 255, 255, 0) -22.71%, rgba(255, 255, 255, 0.039) 70.04%)",
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
                    <MUILink onClick={() => handleGithubLogin()} className="u-box-light-secondary" sx={{ width: "75px", height: "75px" }}>
                        <GitHubIcon sx={{ color: "white", fontSize: "40px" }} />
                    </MUILink>
                </Box>

                <Typography variant="h5" className="u-text-small" color="white" align="center" my={2}>
                    or
                </Typography>

                <FormGroup sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <Box sx={{ width: { md: "48%" } }}>
                        <FormLabel className="u-text-small" sx={{ color: "white" }}>
                            Name
                        </FormLabel>
                        <TextField
                            error={errors?.name ? true : false}
                            helperText={errors?.name || ""}
                            onChange={(e) => handleInputChange(e)}
                            name="name"
                            sx={{ width: "100%", mt: 1 }}
                            required
                            id="form-name"
                            label="Your Name"
                        />
                    </Box>

                    <Box sx={{ width: { md: "48%" } }}>
                        <FormLabel className="u-text-small" sx={{ color: "white" }}>
                            Last name
                        </FormLabel>
                        <TextField
                            error={errors?.lastName ? true : false}
                            helperText={errors?.lastName || ""}
                            onChange={(e) => handleInputChange(e)}
                            name="lastName"
                            sx={{ width: "100%", mt: 1 }}
                            required
                            id="form-last-name"
                            label="Your Last Name"
                        />
                    </Box>

                    <Box sx={{ width: "100%" }} mt={3}>
                        <FormLabel className="u-text-small" sx={{ color: "white" }}>
                            Email
                        </FormLabel>
                        <TextField
                            error={errors?.email ? true : false}
                            helperText={errors?.email || ""}
                            onChange={(e) => handleInputChange(e)}
                            name="email"
                            sx={{ width: "100%", mt: 1 }}
                            required
                            id="form-email"
                            label="Your Email Address"
                        />
                    </Box>

                    <Box sx={{ width: { md: "48%" } }} mt={3}>
                        <FormLabel className="u-text-small" sx={{ color: "white" }}>
                            Password
                        </FormLabel>
                        <TextField
                            error={errors?.password ? true : false}
                            helperText={errors?.password || ""}
                            onChange={(e) => handleInputChange(e)}
                            name="password"
                            sx={{ width: "100%", mt: 1 }}
                            required
                            id="form-password"
                            label="Your Password"
                            type="password"
                        />
                    </Box>

                    <Box sx={{ width: { md: "48%" } }} mt={3}>
                        <FormLabel className="u-text-small" sx={{ color: "white" }}>
                            Confirm Password
                        </FormLabel>
                        <TextField
                            error={errors?.confirmPassword ? true : false}
                            helperText={errors?.confirmPassword || ""}
                            onChange={(e) => handleInputChange(e)}
                            name="confirmPassword"
                            sx={{ width: "100%", mt: 1 }}
                            required
                            id="form-confirm-password"
                            label="Your Password"
                            type="password"
                        />
                    </Box>

                    <Stack mt={3} direction="row" spacing={1} alignItems="center">
                        <AntSwitch
                            checked={data.hasRemember}
                            onChange={(e, c) => handleInputChange(e, c)}
                            name="hasRemember"
                            inputProps={{ "aria-label": "hasRemember" }}
                        />

                        <Typography color="white">Remember Me</Typography>
                    </Stack>

                    <Button
                        onClick={handleSubmit}
                        disabled={isHttpCalling || (errors && Object.keys(errors).length ? true : false)}
                        variant="contained"
                        color="primary"
                        sx={{ width: "100%", mt: 3 }}
                    >
                        Sign Up
                    </Button>
                </FormGroup>
            </Box>

            <Typography variant="h6" className="u-text-small" color="white" mt={2} display="flex">
                Already have an account?
                <Link className="u-link-primary" to="/login">
                    <MUILink className="u-link-primary" component="div" underline="none" color="white" ml={1}>
                        Login
                    </MUILink>
                </Link>
            </Typography>
        </Box>
    );
};

export default RegisterForm;
