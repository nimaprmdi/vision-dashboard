import { Box, Typography } from "@mui/material";
import { ITicketResponse } from "../../../models/tickets";

interface ChatBoxProps {
    data: ITicketResponse[];
}

const ChatBox = ({ data }: ChatBoxProps) => {
    return (
        <Box
            className="u-box-light"
            p={3}
            pb={0}
            sx={{
                display: "flex",
                alignContent: "space-between",
                flexDirection: "column",
                gap: { xs: 6, md: 10 },
                maxHeight: "550px",
                overflow: "auto",
            }}
        >
            <Typography variant="h5" color="white" fontWeight={700}>
                Ticket Area
            </Typography>

            <Box className="c-chat">
                {Array.isArray(data) &&
                    data.map((item, index: number) => (
                        <Box key={`chat-box-${index}`} sx={{ display: "flex", justifyContent: item.isAdmin ? "flex-start" : "flex-end", mb: 4 }}>
                            <Box className={item.isAdmin ? "u-box-blue" : "u-box-green"} width={{ xs: "100%", sm: "80%" }} maxWidth={{ md: "500px" }} p={2}>
                                <Box>
                                    <Typography variant="h6" color="white">
                                        {item.title || ""}
                                    </Typography>
                                </Box>

                                <Typography variant="h6" color="gray.light" mt={1}>
                                    {item.description || ""}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};

export default ChatBox;
