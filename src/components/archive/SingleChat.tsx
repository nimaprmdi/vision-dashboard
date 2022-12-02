import React from "react";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";
import ChatBox from "../common/build/ChatBox";
import PostComment from "../common/build/PostComment";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import CommandButtons from "../common/build/CommandButtons";

const SingleChat = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={7} px={{ xs: 2, md: 0 }}>
                <ChatBox />

                <PostComment />
            </Grid>
            <Grid item xs={12} md={5}>
                <Box className="u-box-light" p={3}>
                    <Typography variant="h5" color="white" fontWeight={700}>
                        Ticket Subject
                    </Typography>

                    <Typography variant="h6" className="u-text-small" color="gray.light" fontWeight={700} mt={2}>
                        Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer is no. If two equally difficult
                        paths, choose the one more painful in the short term (pain avoidance is creating an illusion of
                        equality).
                    </Typography>

                    <Box className="u-divider" mt={6} />

                    <CommandButtons />
                </Box>
            </Grid>
        </Grid>
    );
};

export default SingleChat;
