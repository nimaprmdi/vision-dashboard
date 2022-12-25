import React from "react";
import apiServices from "../../services/VisionDashboardApiServices";
import { FormControl, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

interface EditPermissionProps {
    isAdmin: boolean;
    itemId: string;
}

const EditPermissions = ({ itemId, isAdmin }: EditPermissionProps) => {
    // #httpIsCalling
    const isHttpCalling = useSelector((state: RootState) => state.entities.isHttpCalling);

    const [selectedPermission, setSelectedPermission] = React.useState<string>(isAdmin ? "admin" : "user");

    const isRadioChecked = (value: string): boolean => selectedPermission === value;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedPermission(event.currentTarget.value);
    };

    const handleSubmit = () => {
        const permission = selectedPermission === "user" ? false : true;
        permission !== isAdmin ? apiServices.updateAccountPermission(itemId, permission) : toast.error(`Account already is ${selectedPermission}`);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                onChange={(e) => handleChange(e)}
                defaultValue={isAdmin.valueOf.toString()}
                name="radio-buttons-group"
                sx={{ color: "white", display: "flex", flexDirection: "row" }}
            >
                <FormControlLabel checked={isRadioChecked("user")} value={"user"} control={<Radio sx={{ color: "white" }} />} label="User" />
                <FormControlLabel checked={isRadioChecked("admin")} value={"admin"} control={<Radio sx={{ color: "white" }} />} label="Admin" />
            </RadioGroup>

            <Button disabled={isHttpCalling} variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                Submit
            </Button>
        </FormControl>
    );
};

export default EditPermissions;
