import React from "react";
import { Box, Typography } from "@mui/material";

const ChatBox = () => {
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
                <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 4 }}>
                    <Box className="u-box-blue" width={{ xs: "100%", sm: "80%" }} maxWidth={{ md: "500px" }} p={2}>
                        <Box>
                            <Typography variant="h6" color="white">
                                Oliver Liam
                            </Typography>
                        </Box>

                        <Typography variant="h6" color="gray.light" mt={1}>
                            Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer is no. If two equally
                            difficult paths, choose the one more painful in the short term (pain avoidance is creating
                            an illusion of equality).
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
                    <Box className="u-box-green" width={{ xs: "100%", sm: "80%" }} maxWidth={{ md: "500px" }} p={2}>
                        <Typography variant="h6" color="white">
                            Oliver Liam
                        </Typography>

                        <Typography variant="h6" color="gray.light" mt={1}>
                            Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer is no. If two equally
                            difficult paths, choose the one more painful in the short term (pain avoidance is creating
                            an illusion of equality).
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatBox;
