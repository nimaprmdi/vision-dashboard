import Joi from "joi";
import MapBox from "../common/MapBox";
import React, { useState, useRef, useEffect } from "react";
import apiServices from "../../services/VisionDashboardApiServices";
import { IAccountLocation, IEditAccount, IAccount } from "../../models/account";
import { MuiColorInput, MuiColorInputValue, MuiColorInputFormat } from "mui-color-input";
import { FormControl, TextField, Box, Button, Typography as Typo } from "@mui/material";
import { validate, validateProperty } from "./validate";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

interface IEditUserProps {
    data: IAccount;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const EditUser = ({ data, handleImageChange }: IEditUserProps) => {
    // State
    const [color, setColor] = useState<MuiColorInputValue>("#ffffff");
    const [editData, setEditData] = useState<IEditAccount>({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
        bio: "",
        color: "",
        location: {
            latitude: data.location ? data.location.latitude : 50.05,
            longitude: data.location ? data.location.longitude : 10.8,
        },
    });
    const [errors, setErrors] = useState<IEditAccount>();

    // #httpIsCalling
    const isHttpCalling = useSelector((state: RootState) => state.entities.isHttpCalling);

    // Utils
    const inputField = useRef() as React.MutableRefObject<HTMLInputElement>;
    const format: MuiColorInputFormat = "hex";

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
        bio: Joi.string().label("Bio"),
        color: Joi.string()
            .regex(/^#[A-Fa-f0-9]{6}/)
            .label("Color"),
        location: Joi.object({
            a: Joi.number().min(1).max(10).integer(),
            b: Joi.number().min(1).max(10).integer(),
        }).label("Location"),
    });

    // Functions
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditData((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });

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

        if (e.target.name === "confirmPassword") {
            editData?.password !== e.target.value &&
                setErrors((prevState) => {
                    return { ...prevState, confirmPassword: "Password Does Not Match" };
                });
        } else if (e.target.name === "password") {
            setEditData({ ...editData, password: e.target.value, confirmPassword: null });
        } else {
            setErrors((prevState) => {
                const allErrors = { ...prevState };
                delete allErrors["confirmPassword"];

                return { ...allErrors };
            });
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e && setEditData({ ...editData, profileImage: e });
    };

    const handleImageUpload = () => {
        editData.profileImage && handleImageChange(editData.profileImage);

        if (editData.profileImage && editData.profileImage.target.files && editData.profileImage?.target.files[0]) {
            console.log(editData.profileImage?.target.files);
        } else {
            toast.info("No Image Selected");
        }
    };

    const handleColorChange = (colorHex: string) => {
        setColor(colorHex);
        setEditData({ ...editData, color: colorHex });
    };

    const handleSubmit = async () => {
        if (editData.password !== editData.confirmPassword) {
            setErrors({ confirmPassword: "Password is not matched" });
        } else {
            apiServices.updateAccount(data.itemId, editData!);
        }
    };

    const handleMapChange = (e: IAccountLocation) => {
        console.log(e);

        setEditData((prevState) => {
            return { ...prevState, location: e };
        });
    };

    useEffect(() => {
        setEditData({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            isAdmin: data.isAdmin,
            bio: data.bio,
            color: data.color && data.color.hex,
            password: data.password,
            confirmPassword: data.password,
            location: {
                longitude: data.location ? data.location.longitude : 70,
                latitude: data.location ? data.location.latitude : 40,
            },
        });

        data.color && setColor(data.color.hex);

        console.log("data Location", data.location);
    }, [data]);

    const x = editData.location;

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
                type="password"
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
                type="password"
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
                sx={{ mt: 2, width: { xs: "100%", md: "30%" } }}
                value={color}
                onChange={handleColorChange}
                format={format}
                error={errors?.color ? true : false}
                helperText={errors?.color || ""}
            />

            <Box
                className="u-box-light-tertiary"
                sx={{ height: "56px", width: { xs: "100%", md: "68%" }, mt: 2, display: "flex", justifyContent: "space-between", px: 2 }}
            >
                <Typo variant="h6" color="white">
                    {editData.profileImage ? (
                        <span>{`${editData.profileImage.target.files && editData.profileImage.target.files[0].name.slice(0, 25)}...`}</span>
                    ) : (
                        "Upload File"
                    )}
                </Typo>

                <Box display="flex" gap={2}>
                    <Button component="label" variant="contained" color="primary">
                        Select File
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

                    <Button component="label" variant="contained" color="primary" onClick={() => handleImageUpload()}>
                        Upload
                    </Button>
                </Box>
            </Box>

            <Box
                className="u-box-light-tertiary"
                sx={{ height: "400px", width: "100%", mt: 2, p: 2, display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}
            >
                <Typo variant="h6" color="white" textAlign="left">
                    Update Location
                </Typo>

                <Box sx={{ height: "300px", width: "100%" }}>
                    <MapBox location={editData.location || { latitude: 50.05, longitude: 10.8 }} handler={(e) => handleMapChange(e)} darggable />
                </Box>
            </Box>

            <Button
                disabled={isHttpCalling || (errors && Object.keys(errors).length ? true : false)}
                variant="contained"
                color="primary"
                sx={{ width: "100%", mt: 2 }}
                onClick={handleSubmit}
            >
                Update Profile
            </Button>
        </FormControl>
    );
};

export default EditUser;
