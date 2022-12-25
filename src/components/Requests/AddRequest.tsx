import Details from "../common/build/Details";
import AddRequestForm from "../form/AddRequestForm";
import { Box, Grid, Typography } from "@mui/material";

const AddRequest = () => {
    return (
        <Grid container sx={{ width: "100%" }} px={{ xs: 2, md: 0 }} spacing={{ md: 2 }}>
            <Grid item xs={12} md={7.5} mb={2}>
                <Box className="u-box-light" sx={{ width: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "center", md: "space-between" },
                            alignItems: "center",
                            flexWrap: "wrap",
                            columnGap: 4,
                            rowGap: 2,
                        }}
                        p={2}
                    >
                        <Typography mt={{ xs: 4, md: 2 }} variant="h5" color="white" fontWeight={700}>
                            Add Request
                        </Typography>
                    </Box>

                    <AddRequestForm />
                </Box>
            </Grid>

            <Grid item xs={12} md={4.5}>
                <Details description="Here you can create a new request and try our oprators will respond you as soon as possible. You have to Submit all required inputs that have marked with star icon" />
            </Grid>
        </Grid>
    );
};

export default AddRequest;
