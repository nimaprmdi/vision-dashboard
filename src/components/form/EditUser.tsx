import React, { useState, useRef, memo } from "react";
import { IEditAccount } from "../../models/account";
import { MuiColorInput, MuiColorInputValue, MuiColorInputColors, MuiColorInputFormat } from "mui-color-input";
import { FormControl, TextField, Box, Button, Typography as Typo } from "@mui/material";
import MapBox from "../common/MapBox";

interface EditUserProps {
    editData: IEditAccount | undefined;
}

const EditUser = memo(({ editData }: EditUserProps) => {
    const [color, setColor] = useState<MuiColorInputValue>("#ffffff");
    const inputField = useRef() as React.MutableRefObject<HTMLInputElement>;
    const format: MuiColorInputFormat = "hex8";

    const handleChange = (newValue: string, colors: MuiColorInputColors) => {
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
                value={editData?.name}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Enter name"
                type="text"
                onChange={(e) => console.log("s")}
            />

            <TextField
                id="comment-lastname"
                name="lastName"
                value={editData?.lastName}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Enter Last Name"
                type="text"
                onChange={(e) => console.log("s")}
            />

            <TextField
                id="comment-email"
                name="email"
                value={editData?.email}
                sx={{ width: "100%", mt: 2 }}
                label="Enter Email"
                type="text"
                onChange={(e) => console.log("s")}
            />

            <TextField
                id="comment-password"
                name="password"
                value={editData?.password}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Change Password"
                type="text"
                onChange={(e) => console.log("s")}
            />

            <TextField
                id="comment-confirm-password"
                name="confirm-password"
                value={editData?.confirmPassword}
                sx={{ width: { xs: "100%", md: "49%" }, mt: 2 }}
                label="Confirm Password"
                type="text"
                onChange={(e) => console.log("s")}
            />

            <TextField
                id="comment-bio"
                name="bio"
                value={editData?.bio}
                sx={{ width: "100%", mt: 2 }}
                label="Bio"
                type="text"
                multiline={true}
                rows={6}
                onChange={(e) => console.log("s")}
            />

            <MuiColorInput sx={{ mt: 2, width: { xs: "100%", md: "49%" } }} value={color} onChange={handleChange} format={format} />

            <Box
                className="u-box-light-tertiary"
                sx={{ height: "56px", width: { xs: "100%", md: "49%" }, mt: 2, display: "flex", justifyContent: "space-between", px: 2 }}
            >
                <Typo variant="h6" color="white">
                    Upload File
                </Typo>

                <Button component="label" variant="contained" color="primary">
                    Upload
                    <input hidden ref={inputField} id="file-upload-2" accept="image/jpeg" type="file" onChange={(e) => handleFileChange(e)} />
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
        </FormControl>
    );
});

export default EditUser;
