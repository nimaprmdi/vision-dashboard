import React, { useState } from "react";
import WideCard from "../WideCard";
import EastIcon from "@mui/icons-material/East";
import { Box, Typography, Link, Paper, Grid, CircularProgress } from "@mui/material";

const WideCardDetails = () => {
    const [progress, setProgress] = useState(95);

    return (
        <WideCard
            hasBackground={false}
            className="c-smartcard"
            sx={{ minHeight: "auto", width: "100%", px: 4, py: 5, gap: { xs: 10, md: 19 } }}
        >
            <Box className="c-smartcard__container">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} xl={6}>
                        <Typography variant="h5" color="white">
                            Answered Tickets
                        </Typography>

                        <Grid container spacing={2} pr={{ xs: 0, md: 4 }}>
                            <Grid item xs={6} md={12}>
                                <Box
                                    className="c-smartcard__info-card"
                                    sx={{
                                        mt: { xs: 4, md: 6 },
                                        width: { xs: "100%", md: "auto" },
                                    }}
                                >
                                    <Typography width="100%" variant="h6" className="u-text-small" color="gray.light">
                                        Answered
                                    </Typography>

                                    <Typography mt={0.5} width="100%" variant="h5" color="white">
                                        145 Tickets
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={6} md={12}>
                                <Box
                                    className="c-smartcard__info-card"
                                    sx={{
                                        mt: { xs: 4, md: 1 },
                                        width: { xs: "100%", md: "auto" },
                                    }}
                                >
                                    <Typography width="100%" variant="h6" className="u-text-small" color="gray.light">
                                        Answered
                                    </Typography>

                                    <Typography mt={0.5} width="100%" variant="h5" color="white">
                                        145 Tickets
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        sx={{
                            pr: { xl: 0 },
                            display: { xs: "block", sm: "block", md: "none", lg: "none", xl: "block" },
                        }}
                        mt={8}
                    >
                        <Box className="c-smartcard__progress-container">
                            <CircularProgress
                                size="150px"
                                color="success"
                                thickness={4}
                                variant="determinate"
                                value={progress}
                                sx={{
                                    borderRadius: "10px",
                                }}
                            />

                            <Box className="c-smartcard__progress-context">
                                <Typography variant="h6" className="u-text-tiny" color="gray.light">
                                    Safety
                                </Typography>
                                <Typography variant="h4" className="u-text-massive" color="white">
                                    9.6
                                </Typography>
                                <Typography
                                    sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none", xl: "block" } }}
                                    variant="h6"
                                    className="u-text-tiny"
                                    color="gray.light"
                                >
                                    Total Scores
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </WideCard>
    );
};

export default WideCardDetails;
