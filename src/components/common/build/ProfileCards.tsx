import React from "react";
import { Grid, Box, Typography, Avatar } from "@mui/material";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";

const ProfileCards = () => {
    return (
        <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12} sm={6}>
                <Box
                    className="u-box-light"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1.5,
                        borderRadius: "10px",
                    }}
                >
                    <Box>
                        <Typography color="white" variant="h6" className="u-text-tiny">
                            Requests
                        </Typography>

                        <Typography color="white" variant="h6" className="u-text-h4">
                            16
                        </Typography>
                    </Box>

                    <Avatar sx={{ bgcolor: "primary.main" }} variant="rounded">
                        <ElectricCarIcon />
                    </Avatar>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Box
                    className="u-box-light"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1.5,
                        borderRadius: "10px",
                    }}
                >
                    <Box>
                        <Typography color="white" variant="h6" className="u-text-tiny">
                            Requests
                        </Typography>

                        <Typography color="white" variant="h6" className="u-text-h4">
                            16
                        </Typography>
                    </Box>

                    <Avatar sx={{ bgcolor: "primary.main" }} variant="rounded">
                        <ElectricCarIcon />
                    </Avatar>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Box
                    className="u-box-light"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1.5,
                        borderRadius: "10px",
                    }}
                >
                    <Box>
                        <Typography color="white" variant="h6" className="u-text-tiny">
                            Requests
                        </Typography>

                        <Typography color="white" variant="h6" className="u-text-h4">
                            16
                        </Typography>
                    </Box>

                    <Avatar sx={{ bgcolor: "primary.main" }} variant="rounded">
                        <ElectricCarIcon />
                    </Avatar>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Box
                    className="u-box-light"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1.5,
                        borderRadius: "10px",
                    }}
                >
                    <Box>
                        <Typography color="white" variant="h6" className="u-text-tiny">
                            Requests
                        </Typography>

                        <Typography color="white" variant="h6" className="u-text-h4">
                            16
                        </Typography>
                    </Box>

                    <Avatar sx={{ bgcolor: "primary.main" }} variant="rounded">
                        <ElectricCarIcon />
                    </Avatar>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProfileCards;
