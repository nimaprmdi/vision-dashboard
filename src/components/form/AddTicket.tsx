import React from "react";
import { Box, Table } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import PostComment from "../common/build/PostComment";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import CreateTicket from "../common/build/CreateTicket";

const AddTicket = () => {
    const currentAccount = useSelector((state: RootState) => state.accounts.currentAccount);
    const dispatch = useDispatch();

    return (
        <Box className="c-add-ticket" sx={{ px: { sx: 2, md: 0 } }}>
            <Box sx={{ height: "70vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CreateTicket
                    sx={{ width: "650px", mx: 2 }}
                    itemId={uuidv4()}
                    isAdmin={currentAccount.isAdmin !== undefined ? currentAccount.isAdmin : false}
                />
            </Box>
        </Box>
    );
};

export default AddTicket;
