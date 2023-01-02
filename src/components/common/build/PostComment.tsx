import apiServices from "../../../services/VisionDashboardApiServices";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, FormControl, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { ITicket, ITicketResponse } from "../../../models/tickets";
import { IPostTicketCommentData } from "../../../models/tickets";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTicket } from "../../../store/tickets/ticketsActions";
import { v4 as uuidv4 } from "uuid";
import { ADD_ACCOUNT_TICKET } from "../../../store/account/accountsReducer";

interface IPostCommentProps {
    itemId?: string;
    isAdmin: boolean;
    responses: ITicketResponse[];
    sx?: SystemStyleObject<Theme>;
    navigate?: string;
    isNewTicket?: boolean;
}

const PostComment = ({ itemId, responses, isAdmin, sx, navigate, isNewTicket = false }: IPostCommentProps) => {
    const navigateRoute = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState<IPostTicketCommentData>({ title: "", description: "", isAdmin: false });
    const currentUser = useSelector((state: RootState) => state.accounts.currentAccount);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value, isAdmin });
    };

    const onSubmit = () => {
        const oldResponse = responses ? [...responses] : [];

        // @todo dispatch here
        itemId && apiServices.updateTicketResponse(itemId, [...oldResponse, data]);
        setData({ title: "", description: "", isAdmin: currentUser.isAdmin! });

        // @todo navigate
    };

    return (
        <Box className="u-box-light" height="auto" mt={3} p={3} sx={{ ...sx }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" color="white">
                    Submit A Ticket
                </Typography>

                <Button onClick={() => onSubmit()} variant="contained" color="primary">
                    Post Ticket
                </Button>
            </Box>

            <Box mt={2}>
                <FormControl sx={{ width: "100%" }}>
                    <TextField
                        id="comment-title"
                        name="title"
                        value={data.title}
                        sx={{ width: "100%" }}
                        required
                        label="Enter Title"
                        type="text"
                        onChange={(e) => inputChangeHandler(e)}
                    />

                    <TextField
                        id="comment-description"
                        name="description"
                        value={data.description}
                        sx={{ width: "100%", mt: 2 }}
                        required
                        label="Enter Description"
                        size="small"
                        multiline={true}
                        rows={6}
                        onChange={(e) => inputChangeHandler(e)}
                    />
                </FormControl>
            </Box>
        </Box>
    );
};

export default PostComment;
