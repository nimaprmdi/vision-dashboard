import Skull from "../common/Skull";
import ChatBox from "../common/build/ChatBox";
import PostComment from "../common/build/PostComment";
import CommandButtons from "../common/build/CommandButtons";
import { useEffect, useState } from "react";
import { ICommandButtons } from "../../models/commandButtons";
import { Grid, Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { ITicket } from "../../models/tickets";
import Actions from "../common/build/Actions";

const SingleChat = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const ticketsState = useSelector((state: RootState) => state.tickets);

    const [ticket, setTicket] = useState<ITicket>();

    const commandButtons: ICommandButtons[] = [
        { title: "Mark as solved", color: "primary", handler: () => console.log("s") },
        { title: "Mark as pending", color: "error", handler: () => console.log("s") },
        { title: "Mark as reviewing", color: "warning", handler: () => console.log("s") },
    ];

    useEffect(() => {
        let currentTicket: ITicket | undefined;

        if (!ticketsState.isLoading && id) {
            currentTicket = ticketsState.tickets.find((ticket) => ticket.itemId === id);
            currentTicket ? setTicket(currentTicket) : navigate("/404");
        } else if (!ticketsState.isLoading && id && currentTicket === undefined) {
            navigate("/404");
        } else {
            if (!id) {
                navigate("/404");
            }
        }
    }, [ticketsState]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={7} px={{ xs: 2, md: 0 }}>
                <ChatBox data={ticket ? ticket.responses : [{ title: "", description: "", isAdmin: false }]} />

                {ticketsState.isLoading && ticket ? (
                    <Skull sx={{ height: "150px" }} />
                ) : ticket ? (
                    <PostComment
                        itemId={ticket ? ticket.itemId : ""}
                        isAdmin={ticket && ticket.accounts.isAdmin}
                        responses={ticket ? ticket.responses : [{ title: "", description: "", isAdmin: false }]}
                    />
                ) : (
                    <Skull />
                )}
            </Grid>
            <Grid item xs={12} md={5}>
                <Box className="u-box-light" p={3}>
                    <Typography variant="h5" color="white" fontWeight={700}>
                        Ticket Area
                    </Typography>

                    <Typography variant="h6" className="u-text-small" color="gray.light" fontWeight={700} mt={2}>
                        here you can submit your reply and it will be send to the server so Admin or User can see your
                        respons
                    </Typography>

                    <Box className="u-divider" mt={6} />

                    {/* <CommandButtons sx={{ justifyContent: "center", mt: 2 }} buttons={commandButtons} /> */}

                    <Actions buttons={commandButtons} />
                </Box>
            </Grid>
        </Grid>
    );
};

export default SingleChat;
