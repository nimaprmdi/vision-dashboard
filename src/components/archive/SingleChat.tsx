import ChatBox from "../common/build/ChatBox";
import PostComment from "../common/build/PostComment";
import CommandButtons from "../common/build/CommandButtons";
import { ICommandButtons } from "../../models/commandButtons";
import { Grid, Box, Typography } from "@mui/material";

const SingleChat = () => {
    const commandButtons: ICommandButtons[] = [
        { title: "Close Ticket", color: "primary" },
        { title: "Delete Ticket", color: "error" },
        { title: "Mark as Reviewing", color: "warning" },
    ];

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

                    <CommandButtons sx={{ justifyContent: "center", mt: 2 }} buttons={commandButtons} />
                </Box>
            </Grid>
        </Grid>
    );
};

export default SingleChat;
