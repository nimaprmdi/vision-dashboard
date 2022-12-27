import { Grid, Box, Typography, TextField, Stack, Button, Switch, FormGroup, Link as MUILink, FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// models
import { IAccountLogin, IAccountLoginError } from "../../../models/account";
import { validateProperty } from "../../form/validate";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { loadGapiInsideDOM } from "gapi-script";
import { RootState } from "../../../store/rootReducer";
// icons
import GoogleLogin from "../GoogleLogin";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
// actions
import { loginAccount, getCurrentAccount } from "../../../store/account/accountsActions";

//google
import apiServices from "../../../services/VisionDashboardApiServices";
import { getUserData } from "../../../services/githubServices";

// hooks
import useGithub from "../../../hooks/useGithub";

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState<any>();
    const [errors, setErrors] = useState<IAccountLoginError>();
    const [hasRemeber, setHasRemember] = useState<boolean>();

    const [isRender, setIsRender] = useState(false);

    const [data, setData] = useState<IAccountLogin>({
        email: "",
        password: "",
        hasRemember: false,
        userName: "",
    });

    const isHttpCalling = useSelector((state: RootState) => state.entities.isHttpCalling);

    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .label("Email"),
        password: Joi.string()
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password")
            .message("Password Does Not Match pattern")
            .label("Password"),
        hasRemember: Joi.boolean().required().label("Remember"),
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean) => {
        const errorMsg = e.target.name !== "hasRemember" && validateProperty(e.target, schema);

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
    };

    const handleSubmit = () => {
        // @todo : validate function before sending also for other forms
        dispatch(loginAccount(data) as any);
    };

    // Hook
    const rerender = useGithub();

    useEffect(() => {
        setIsRender(rerender);
    }, [rerender]);

    const handleGetUserData = () => {
        console.log("Clicked");

        dispatch(getCurrentAccount() as any);
    };

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
            <Button onClick={() => handleGetUserData()}>asd</Button>
        </Box>
    );
};

export default LoginForm;
