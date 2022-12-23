import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { validateProperty, validate } from "./validate";
import Joi from "joi";

interface EditPermissionProps {
    isAdmin: boolean;
}

const EditPermissions = ({ isAdmin }: EditPermissionProps) => {
    const [isEditAdmin, setIsEditAdmin] = useState<boolean>(isAdmin);

    const handleChange = (event: any) => {
        setIsEditAdmin(event.target.value);
    };

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const errorMsg = validateProperty(e.target, schema);
    };

    const handleSubmit = () => {
        // const errors = editData && validate(editData, schema);
        // apiServices.updateAccount(data.itemId, editData!);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Permission</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={isAdmin}
                label="Permission"
                onChange={(e) => handleChange(e)}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={0}>Admin</MenuItem>
                <MenuItem value={1}>User</MenuItem>
            </Select>
        </FormControl>
    );
};

export default EditPermissions;
