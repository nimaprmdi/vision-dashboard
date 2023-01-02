import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, FormControl, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { ITicket, ITicketResponse } from "../../../models/tickets";
import { IPostTicketCommentData } from "../../../models/tickets";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTicket } from "../../../store/tickets/ticketsActions";
import { v4 as uuidv4 } from "uuid";
import { ADD_ACCOUNT_TICKET } from "../../../store/account/accountsReducer";

interface CreateTicketProps {
    itemId?: string;
    isAdmin: boolean;
    sx?: SystemStyleObject<Theme>;
}

const CreateTicket = ({ itemId, isAdmin, sx }: CreateTicketProps) => {
    const dispatch = useDispatch();
    const navigateRoute = useNavigate();
    const currentAccount = useSelector((state: RootState) => state.accounts.currentAccount);
    const accounts = useSelector((state: RootState) => state.accounts.accounts);

    const [response, setResponse] = useState<IPostTicketCommentData>({
        title: "",
        description: "",
        isAdmin,
    });

    const [data, setData] = useState<ITicket>({
        itemId: `ticket-${uuidv4()}`,
        date: new Date().toISOString(),
        description: "",
        hasReply: false,
        isClose: false,
        isPending: true,
        subject: "",
        responses: [{ title: "", description: "", isAdmin: false }],
    });

    const handleChangeResponse = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setResponse({ ...response, [e.target.name]: e.target.value });
        setData({ ...data, responses: [response] });
    };

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });
    };

    const onSubmit = () => {
        if (itemId && currentAccount.itemId) {
            dispatch(addTicket(currentAccount.itemId, data, navigateRoute) as any);

            setData({
                itemId: "",
                date: "",
                description: "",
                hasReply: false,
                isClose: false,
                isPending: true,
                subject: "",
                responses: [{ title: "", description: "", isAdmin: false }],
            });
        }

        // @todo navigate here
    };

    useEffect(() => {
        const currentUserFromStore = accounts.find((account) => account.itemId === currentAccount.itemId!);
        currentUserFromStore && setData({ ...data, accounts: currentUserFromStore });
    }, [currentAccount]);

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
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <TextField
                            id="comment-ticket-title"
                            name="subject"
                            value={data.subject}
                            sx={{ width: "100%" }}
                            label="Enter Ticket Subject"
                            type="text"
                            onChange={(e) => handleChangeData(e)}
                            required
                        />

                        <TextField
                            id="comment-ticket-description"
                            name="description"
                            value={data.description}
                            sx={{ width: "100%" }}
                            label="Enter Ticket Description"
                            type="text"
                            onChange={(e) => handleChangeData(e)}
                            required
                        />
                    </Box>

                    <TextField
                        id="comment-title"
                        name="title"
                        value={response.title}
                        sx={{ width: "100%" }}
                        label="Enter Title"
                        type="text"
                        onChange={(e) => handleChangeResponse(e)}
                        required
                    />

                    <TextField
                        id="comment-description"
                        name="description"
                        value={response.description}
                        sx={{ width: "100%", mt: 2 }}
                        label="Enter Description"
                        size="small"
                        multiline={true}
                        rows={6}
                        onChange={(e) => handleChangeResponse(e)}
                        required
                    />
                </FormControl>
            </Box>
        </Box>
    );
};

export default CreateTicket;
