import React from "react";
import { Grid, Box, Typography, Stack, Button } from "@mui/material";

const Details = () => {
    return (
        <Box className="u-box-light" py={3.5} px={3}>
            <Typography variant="h5" color="white">
                Profile Informations
            </Typography>

            <Typography mt={2} variant="h6" className="u-text-small" color="gray.light">
                Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths,
                choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
            </Typography>

            <Box mt={5} className="u-divider" />

            <Stack mt={3.5}>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography variant="h6" className="u-text-small" color="gray.light">
                        Address:
                    </Typography>

                    <Typography variant="h6" className="u-text-small" color="white">
                        Tehran Azadi Street
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
};

export default Details;
