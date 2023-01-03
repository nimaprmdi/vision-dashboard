import Joi from "joi";
import MapBox from "../common/MapBox";
import { useEffect } from "react";
import { useState } from "react";
import { Box, TextField, Button, Typography, Select, SelectChangeEvent, MenuItem, FormControl, InputLabel } from "@mui/material";
import { IRequest, IAddRequest } from "../../models/request";
import { IAccountLocation } from "../../models/account";
import { validateProperty } from "./validate";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { createRequest } from "../../store/requests/requestsActions";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const AddRequestForm = () => {
    const [errors, setErrors] = useState<IAddRequest>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState<IRequest>({
        itemId: "",
        name: "",
        lastName: "",
        gender: true,
        mobile: "",
        phone: "",
        address: "",
        service: "nurse",
        description: "",
        date: "",
        itemStatus: "pending",
        location: {
            latitude: 50.11003957248653,
            longitude: 8.687357922951406,
        },
    });

    const isHttpCalling = useSelector((state: RootState) => state.entities.isHttpCalling);
    const currentUser = useSelector((state: RootState) => state.accounts.currentAccount);

    const schema = Joi.object({
        itemId: Joi.string().label("itemId"),
        name: Joi.string().min(3).label("Name"),
        lastName: Joi.string().min(4).label("Last name"),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .label("Email"),
        gender: Joi.boolean().required().label("gender"),
        mobile: Joi.string()
            .regex(/^\+[1-9]{1}[0-9]{3,14}$/)
            .message("input is incorrect eg. +981234567890")
            .required(),
        phone: Joi.string()
            .regex(/^\+[1-9]{1}[0-9]{3,14}$/)
            .message("input is incorrect eg. +981234567890")
            .required(),
        address: Joi.string().required().label("Address"),
        service: Joi.string().required().label("Service"),
        description: Joi.string().label("Description"),
        date: Joi.date().iso().label("Date"),
        location: Joi.object({
            a: Joi.number().min(1).max(80).integer(),
            b: Joi.number().min(1).max(80).integer(),
        }).label("Location"),
    });

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const errorMsg = validateProperty(e.target, schema);

        if (errorMsg) {
            setErrors({ ...errors, [e.target.name]: errorMsg });
        } else {
            setErrors(() => {
                const allErrors: any = { ...errors };
                delete allErrors[e.target.name];
                return { ...allErrors };
            });
        }

        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleMapChange = (e: IAccountLocation) => {
        e &&
            setData((prevState) => {
                return { ...prevState, location: e };
            });
    };

    const [selectData, setSelectData] = useState({
        gender: "male",
        service: "nurse",
    });

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectData({ ...selectData, [event.target.name]: event.target.value as string });

        if (event.target.name === "gender") {
            const gender: boolean = event.target.value === "male" ? true : false;
            setData({ ...data, [event.target.name]: gender });
        } else {
            setData({ ...data, [event.target.name]: event.target.value as string });
        }
    };

    const handleSubmit = () => {
        dispatch(createRequest(currentUser.itemId!, data, navigate) as any);

        setData({
            itemId: "",
            name: "",
            lastName: "",
            gender: true,
            mobile: "",
            phone: "",
            address: "",
            service: "nurse",
            description: "",
            date: "",
            itemStatus: "pending",
            location: {
                latitude: 50.11003957248653,
                longitude: 8.687357922951406,
            },
        });
    };

    useEffect(() => {
        const date = new Date();
        setData({ ...data, itemId: "request-" + uuidv4(), date: date.toISOString() });
    }, []);

    return (
        <form>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, px: 2, py: 3 }}>
                <TextField
                    name="name"
                    error={errors?.name ? true : false}
                    helperText={errors?.name || ""}
                    onChange={(e) => handleChangeInput(e)}
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-name"
                    label="Your Name"
                />

                <TextField
                    name="lastName"
                    error={errors?.lastName ? true : false}
                    helperText={errors?.lastName || ""}
                    onChange={(e) => handleChangeInput(e)}
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-last-name"
                    label="Your Last Name"
                />

                <TextField
                    name="mobile"
                    error={errors?.mobile ? true : false}
                    helperText={errors?.mobile || ""}
                    onChange={(e) => handleChangeInput(e)}
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-mobile"
                    label="Mobile"
                />

                <TextField
                    name="phone"
                    error={errors?.phone ? true : false}
                    helperText={errors?.phone || ""}
                    onChange={(e) => handleChangeInput(e)}
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-phone"
                    label="Phone number"
                />

                <FormControl sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}>
                    <InputLabel id="services-input">Services</InputLabel>
                    <Select
                        required
                        name="service"
                        labelId="services-input"
                        id="demo-simple-select"
                        value={selectData.service}
                        label="Service"
                        onChange={handleChange}
                    >
                        <MenuItem value="nurse">Nurse</MenuItem>
                        <MenuItem value="doctor">Doctor</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}>
                    <InputLabel id="gender-input">Gender</InputLabel>
                    <Select
                        required
                        name="gender"
                        labelId="gender-input"
                        id="demo-simple-select"
                        value={selectData.gender}
                        label="Gender"
                        onChange={handleChange}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">other</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    name="address"
                    error={errors?.address ? true : false}
                    helperText={errors?.address || ""}
                    onChange={(e) => handleChangeInput(e)}
                    sx={{ width: { xs: "100%", md: "100%" }, mt: 1 }}
                    required
                    id="form-address"
                    label="Address"
                    multiline
                    rows={4}
                />

                <TextField
                    name="description"
                    error={errors?.description ? true : false}
                    helperText={errors?.description || ""}
                    onChange={(e) => handleChangeInput(e)}
                    sx={{ width: "100%", mt: 1 }}
                    required
                    id="form-description"
                    label="Description"
                    multiline={true}
                    rows={6}
                />

                <Box
                    className="u-box-light-secondary"
                    sx={{
                        width: "100%",
                        height: "max-content",
                        px: 2,
                        pt: 2,
                        pb: 4,
                        flexWrap: "wrap",
                        my: 2,
                        justifyContent: "flex-start",
                    }}
                >
                    <Typography variant="h5" color="white" align="left">
                        Choose Your Location
                    </Typography>

                    <Box sx={{ width: "100%", height: "300px" }}>
                        <MapBox location={data.location} darggable handler={(e) => handleMapChange(e)} />
                    </Box>
                </Box>

                <Button
                    disabled={isHttpCalling || (errors && Object.keys(errors).length ? true : false)}
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%", mt: 1 }}
                    onClick={handleSubmit}
                >
                    Create a request
                </Button>
            </Box>
        </form>
    );
};

export default AddRequestForm;
