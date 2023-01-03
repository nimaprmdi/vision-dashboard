import React, { useState, useEffect } from "react";
import Joi from "joi";
import { Box, Typography, Button, TextField, FormControl, Theme, InputLabel, MenuItem, Select } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { ITicket, ICreateTicketResponseError, ICreateTicketError, IPostTicketCommentData } from "../../../models/tickets";
import { IRequest } from "../../../models/request";
import { RootState } from "../../../store/rootReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTicket } from "../../../store/tickets/ticketsActions";
import { v4 as uuidv4 } from "uuid";
import { validateProperty } from "../../form/validate";
import { SelectChangeEvent } from "@mui/material/Select";

interface CreateTicketProps {
    itemId?: string;
    isAdmin: boolean;
    sx?: SystemStyleObject<Theme>;
}

const CreateTicket = ({ itemId, isAdmin, sx }: CreateTicketProps) => {
    const dispatch = useDispatch();
    const navigateRoute = useNavigate();
    const currentAccount = useSelector((state: RootState) => state.accounts.currentAccount);
    console.log(currentAccount.requests!);
    const accounts = useSelector((state: RootState) => state.accounts.accounts);
    const requestsState = useSelector((state: RootState) => state.requests);
    const isHttpCalling = useSelector((state: RootState) => state.entities.isHttpCalling);
    const [responseErrors, setResponseErrors] = useState<ICreateTicketResponseError>();
    const [errors, setErrors] = useState<ICreateTicketError>();
    const [requests, setRequests] = useState<IRequest[]>();
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

    useEffect(() => {
        if (currentAccount.isAdmin) {
            setRequests(requestsState.requests);
        } else {
            const userRequests = requestsState.requests.filter((request) => request.account?.userName === currentAccount.userName);
            setRequests(userRequests);
        }
    }, [currentAccount]);

    const responseSchema = Joi.object({
        title: Joi.string().required().label("title"),
        description: Joi.string().required().label("response description"),
    });

    const dataSchema = Joi.object({
        subject: Joi.string().required().label("ticket subject"),
        description: Joi.string().required().label("ticket description"),
    });

    const handleChangeResponse = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const errorMessage = validateProperty(e.target, responseSchema);

        if (errorMessage) {
            setResponseErrors({ ...responseErrors, [e.target.name]: errorMessage });
        } else {
            setResponseErrors(() => {
                const allErrors: any = { ...responseErrors };
                delete allErrors[e.target.name];
                return { ...allErrors };
            });
        }

        console.log("setResponseErrors", responseErrors);

        setResponse({ ...response, [e.target.name]: e.target.value });
        setData({ ...data, responses: [response] });
    };

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const errorMessage = validateProperty(e.target, dataSchema);

        if (errorMessage) {
            setErrors({ ...errors, [e.target.name]: errorMessage });
        } else {
            setErrors(() => {
                const allErrors: any = { ...errors };
                delete allErrors[e.target.name];
                return { ...allErrors };
            });
        }

        console.log("errors", errors);

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

    const [selectData, setSelectData] = useState({
        request: "select-request",
    });

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSelectData({ ...selectData, [event.target.name]: event.target.value as string });

        if (event.target.value !== "select-request") {
            setData({ ...data, [event.target.name]: event.target.value as string });
        }
    };

    useEffect(() => {
        const currentUserFromStore = accounts.find((account) => account.itemId === currentAccount.itemId!);
        currentUserFromStore && setData({ ...data, accounts: currentUserFromStore });
    }, [currentAccount]);

    return (
        <Box className="u-box-light" height="auto" mt={3} p={3} sx={{ ...sx }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 3 }}>
                <Typography variant="h5" color="white">
                    Submit A Ticket
                </Typography>

                <Button
                    sx={{ mb: 2 }}
                    onClick={() => onSubmit()}
                    variant="contained"
                    color="primary"
                    disabled={isHttpCalling || (errors && Object.keys(errors).length) || (responseErrors && Object.keys(responseErrors).length) ? true : false}
                >
                    Post Ticket
                </Button>
            </Box>

            <Box mt={2}>
                <FormControl sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", gap: 2, mb: 1, flexWrap: "wrap" }}>
                        <TextField
                            id="comment-ticket-title"
                            name="subject"
                            value={data.subject}
                            sx={{ width: { xs: "100%", md: "48%" } }}
                            label="Enter Ticket Subject"
                            type="text"
                            onChange={(e) => handleChangeData(e)}
                            required
                            error={errors?.subject ? true : false}
                            helperText={errors?.subject || ""}
                        />

                        <TextField
                            id="comment-ticket-description"
                            name="description"
                            value={data.description}
                            sx={{ width: { xs: "100%", md: "48%" } }}
                            label="Enter Ticket Description"
                            type="text"
                            onChange={(e) => handleChangeData(e)}
                            required
                            error={errors?.description ? true : false}
                            helperText={errors?.description || ""}
                        />
                    </Box>

                    <FormControl sx={{ width: { xs: "100%", md: "100%" }, my: 2 }}>
                        <InputLabel id="gender-input">Request</InputLabel>
                        <Select
                            required
                            name="request"
                            labelId="request-input"
                            id="demo-simple-select-request"
                            value={selectData.request}
                            label="Request"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="select-request">Select Request</MenuItem>
                            {requests?.map((request) => (
                                <MenuItem key={`request-${request.itemId}`} value={request.itemId}>
                                    {`${request.name} ${request.lastName} (${request.service})`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        id="comment-title"
                        name="title"
                        value={response.title}
                        sx={{ width: "100%" }}
                        label="Enter Title"
                        type="text"
                        onChange={(e) => handleChangeResponse(e)}
                        required
                        error={responseErrors?.title ? true : false}
                        helperText={responseErrors?.title || ""}
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
                        error={responseErrors?.description ? true : false}
                        helperText={responseErrors?.description || ""}
                    />
                </FormControl>
            </Box>
        </Box>
    );
};

export default CreateTicket;
