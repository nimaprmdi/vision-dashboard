import React, { useState, useRef, memo } from "react";
import Joi from "joi";
import MapBox from "../common/MapBox";
import { IAccountLocation, IEditAccount } from "../../models/account";
import { MuiColorInput, MuiColorInputValue, MuiColorInputColors, MuiColorInputFormat } from "mui-color-input";
import { FormControl, TextField, Box, Button, Typography as Typo } from "@mui/material";
import { validate, validateProperty } from "./validate";

const EditUser = () => {
    const [color, setColor] = useState<MuiColorInputValue>("#ffffff");
    const [editData, setEditData] = useState<IEditAccount>();
    const inputField = useRef() as React.MutableRefObject<HTMLInputElement>;
    const format: MuiColorInputFormat = "hex8";

    const [errors, setErrors] = useState<IEditAccount>();

    const schema = Joi.object({
        name: Joi.string().min(3).label("Name"),
        lastName: Joi.string().min(4).label("Last name"),
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
        bio: Joi.string().min(3).label("Bio"),
        color: Joi.string()
            .regex(/^#[A-Fa-f0-9]{6}/)
            .label("Color"),
        location: Joi.object({
            a: Joi.number().min(1).max(10).integer(),
            b: Joi.number().min(1).max(10).integer(),
        }).label("Location"),
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditData((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });

        const errorMsg = validateProperty(e.target, schema);
        setErrors({ ...errors, [e.target.name]: errorMsg });

        if (e.target.name === "confirmPassword") {
            editData?.password !== e.target.value &&
                setErrors((prevState) => {
                    return { ...prevState, confirmPassword: "Password Does Not Match" };
                });
        } else if (e.target.name === "password") {
            setEditData({ ...editData, password: e.target.value, confirmPassword: "" });
        } else {
            setErrors((prevState) => {
                return { ...prevState, confirmPassword: "" };
            });
        }

        console.log(editData);
    };

    const handleSubmit = () => {
        const errors = editData && validate(editData, schema);
    };

    const handleColorChange = (colorHex: string) => {
        setEditData({ ...editData, color: colorHex });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && setEditData({ ...editData, profileImage: e.target.files[0] });
    };

    const handleMapChange = (e: IAccountLocation) => {
        setEditData((prevState) => {
            return { ...prevState, location: e };
        });
    };

    return (
        <FormControl sx={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap" }}>
            <TextField
                id="comment-name"
                name="name"
                value={editData?.name || ""}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Enter name"
                type="text"
                onChange={(e) => handleInputChange(e)}
                error={errors?.name ? true : false}
                helperText={errors?.name || ""}
            />

            <TextField
                id="comment-lastname"
                name="lastName"
                value={editData?.lastName || ""}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Enter Last Name"
                type="text"
                onChange={(e) => handleInputChange(e)}
                error={errors?.lastName ? true : false}
                helperText={errors?.lastName || ""}
            />

            <TextField
                id="comment-email"
                name="email"
                value={editData?.email || ""}
                sx={{ width: "100%", mt: 2 }}
                label="Enter Email"
                type="text"
                onChange={(e) => handleInputChange(e)}
                error={errors?.email ? true : false}
                helperText={errors?.email || ""}
            />

            <TextField
                id="comment-password"
                name="password"
                value={editData?.password || ""}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Change Password"
                type="text"
                onChange={(e) => handleInputChange(e)}
                error={errors?.password ? true : false}
                helperText={errors?.password || ""}
            />

            <TextField
                id="comment-confirm-password"
                name="confirmPassword"
                value={editData?.confirmPassword || ""}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Confirm Password"
                type="text"
                onChange={(e) => handleInputChange(e)}
                error={errors?.confirmPassword ? true : false}
                helperText={errors?.confirmPassword || ""}
            />

            <TextField
                id="comment-bio"
                name="bio"
                value={editData?.bio || ""}
                sx={{ width: "100%", mt: 2 }}
                label="Bio"
                type="text"
                multiline={true}
                rows={6}
                onChange={(e) => handleInputChange(e)}
                error={errors?.bio ? true : false}
                helperText={errors?.bio || ""}
            />

            <MuiColorInput
                name="color"
                sx={{ mt: 2, width: { xs: "100%", md: "49%" } }}
                value={color}
                onChange={handleColorChange}
                format={format}
                error={errors?.color ? true : false}
                helperText={errors?.color || ""}
            />

            <Box
                className="u-box-light-tertiary"
                sx={{ height: "56px", width: { xs: "100%", md: "49%" }, mt: 2, display: "flex", justifyContent: "space-between", px: 2 }}
            >
                <Typo variant="h6" color="white">
                    Upload File
                </Typo>

                <Button component="label" variant="contained" color="primary">
                    Upload
                    <input
                        name="profileImage"
                        hidden
                        ref={inputField}
                        id="file-upload-2"
                        accept="image/jpeg"
                        type="file"
                        onChange={(e) => handleFileChange(e)}
                    />
                </Button>
            </Box>

            <Box
                className="u-box-light-tertiary"
                sx={{ height: "400px", width: "100%", mt: 2, p: 2, display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}
            >
                <Typo variant="h6" color="white" textAlign="left">
                    Update Location
                </Typo>

                <Box sx={{ height: "300px", width: "100%" }}>
                    <MapBox location={{ longitude: -74.0632, latitude: 40.7346 }} darggable handler={(e) => handleMapChange(e)} />
                </Box>
            </Box>

            <Button variant="contained" color="success" sx={{ width: "100%", mt: 2 }} onClick={handleSubmit}>
                Update Profile
            </Button>
        </FormControl>
    );
};

export default EditUser;
