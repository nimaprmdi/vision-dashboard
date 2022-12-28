import React, { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import Joi from "joi";
import { IAddAccount } from "../../models/account";

interface AddEmailProps {
    onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    data: IAddAccount;
    // error :
}

const AddEmail = ({ onHandleChange, data }: AddEmailProps) => {
    return (
        <FormControl sx={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap" }}>
            {/* <TextField
                id="comment-name"
                name="name"
                value={data?.name || ""}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Enter name"
                type="text"
                onChange={(e) => onHandleChange(e)}
                error={errors?.name ? true : false}
                helperText={errors?.name || ""}
            /> */}
        </FormControl>
    );
};

export default AddEmail;
