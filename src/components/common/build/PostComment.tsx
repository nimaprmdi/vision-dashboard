import apiServices from "../../../services/VisionDashboardApiServices";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, FormControl } from "@mui/material";
import { ITicketResponse } from "../../../models/tickets";
import { IPostTicketCommentData } from "../../../models/tickets";

interface IPostCommentProps {
    itemId?: string;
    isAdmin: boolean;
    responses: ITicketResponse[];
}

const PostComment = ({ itemId, responses, isAdmin }: IPostCommentProps) => {
    const [data, setData] = useState<IPostTicketCommentData>({ title: "", description: "", isAdmin: false });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value, isAdmin });
    };

    const onSubmit = () => {
        itemId && apiServices.updateResponse(itemId, [...responses, data]);
        setData({ title: "", description: "", isAdmin: false });
    };

    return (
        <Box className="u-box-light" height="auto" mt={3} p={3}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" color="white">
                    Submit An Answer
                </Typography>

                <Button onClick={() => onSubmit()} variant="contained" color="primary">
                    Post Answer
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
