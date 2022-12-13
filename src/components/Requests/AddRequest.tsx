import Details from "../common/build/Details";
import AddRequestForm from "../common/build/AddRequestForm";
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

                        {/* <Button variant="contained" color="primary">
                            Add New Request
                        </Button> */}
                    </Box>

                    <AddRequestForm />
                </Box>
            </Grid>

            <Grid item xs={12} md={4.5}>
                {/* <Details /> */}
            </Grid>
        </Grid>
    );
};

export default AddRequest;
