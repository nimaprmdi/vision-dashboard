import WideCard from "../WideCard";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";

interface WideCardDetailsProps {
    title: string;
    boxTopTitle?: string;
    boxTopValue?: string;
    boxBottomTitle?: string;
    boxBottomValue?: string;

    progressTitle?: string;
    progressPercent?: number;
    progressDesc?: string;
}

const WideCardDetails = ({
    title,
    boxTopTitle,
    boxTopValue,
    boxBottomTitle,
    boxBottomValue,
    progressTitle,
    progressPercent,
    progressDesc,
}: WideCardDetailsProps) => {
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
                            {title}
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
                                        {boxTopTitle}
                                    </Typography>

                                    <Typography mt={0.5} width="100%" variant="h5" color="white">
                                        {boxTopValue}
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
                                        {boxBottomTitle}
                                    </Typography>

                                    <Typography mt={0.5} width="100%" variant="h5" color="white">
                                        {boxBottomValue}
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
                                value={progressPercent}
                                sx={{
                                    borderRadius: "10px",
                                }}
                            />

                            <Box className="c-smartcard__progress-context">
                                <Typography variant="h6" className="u-text-tiny" color="gray.light">
                                    {progressTitle}
                                </Typography>
                                <Typography variant="h4" className="u-text-massive" color="white">
                                    {progressPercent?.toString()}
                                </Typography>
                                <Typography
                                    sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none", xl: "block" } }}
                                    variant="h6"
                                    className="u-text-tiny"
                                    color="gray.light"
                                >
                                    {progressDesc}
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
