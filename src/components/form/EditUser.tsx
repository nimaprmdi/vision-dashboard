import React, { useState, useRef, memo } from "react";
import Joi from "joi";
import MapBox from "../common/MapBox";
import { IEditAccount } from "../../models/account";
import { MuiColorInput, MuiColorInputValue, MuiColorInputColors, MuiColorInputFormat } from "mui-color-input";
import { FormControl, TextField, Box, Button, Typography as Typo } from "@mui/material";
import { validate, validateProperty } from "./validate";

interface IEditUserErrors {
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confrimPassword?: string;
    bio?: string;
    color?: string;
    profileImage?: string;
    location?: string;
}

const EditUser = memo(() => {
    const [color, setColor] = useState<MuiColorInputValue>("#ffffff");
    const [editData, setEditData] = useState<IEditAccount>();
    const inputField = useRef() as React.MutableRefObject<HTMLInputElement>;
    const format: MuiColorInputFormat = "hex8";

    const [errors, setErrors] = useState<IEditUserErrors>();

    const schema = Joi.object({
        name: Joi.string().min(3).label("Name"),
        lastName: Joi.string().min(4).label("Last name"),
        email: Joi.string()
            .email({ tlds: { allow: false } })

            .label("Email"),
        password: Joi.string().min(4).label("Password"),
        confirmPassword: Joi.string().min(4).label("Confirm Password"),
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
        setEditData({ ...editData, [e.currentTarget.name]: e.currentTarget.value });

        const input = e.currentTarget;
        const errorMsg = validateProperty(input, schema);

        setErrors({ ...errors, [e.currentTarget.name]: errorMsg });
        console.log(errors);
    };

    const handleSubmit = () => {
        const errors = editData && validate(editData, schema);

        console.log(errors);
    };

    // @defaults
    const handleColorChange = (newValue: string, colors: MuiColorInputColors) => {
        setColor(newValue);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
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
            />

            <TextField
                id="comment-email"
                name="email"
                value={editData?.email || ""}
                sx={{ width: "100%", mt: 2 }}
                label="Enter Email"
                type="text"
                onChange={(e) => handleInputChange(e)}
            />

            <TextField
                id="comment-password"
                name="password"
                value={editData?.password || ""}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Change Password"
                type="text"
                onChange={(e) => handleInputChange(e)}
            />

            <TextField
                id="comment-confirm-password"
                name="confirm-password"
                value={editData?.confirmPassword || ""}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Confirm Password"
                type="text"
                onChange={(e) => handleInputChange(e)}
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
            />

            <MuiColorInput name="color" sx={{ mt: 2, width: { xs: "100%", md: "49%" } }} value={color} onChange={handleColorChange} format={format} />

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
                    <MapBox location={{ longitude: -74.0632, latitude: 40.7346 }} darggable />
                </Box>
            </Box>

            <Button variant="contained" color="success" sx={{ width: "100%", mt: 2 }} onClick={handleSubmit}>
                Update Profile
            </Button>
        </FormControl>
    );
});

export default EditUser;
