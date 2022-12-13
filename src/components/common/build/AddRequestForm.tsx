import { Box, TextField, Button, Typography } from "@mui/material";
import MapBox from "../MapBox";

const AddRequestForm = () => {
    return (
        <form onSubmit={() => console.log("Submited")}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, px: 2, py: 3 }}>
                <TextField
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-name"
                    label="Your Full Name"
                />

                <TextField
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-last-name"
                    label="Your Last Name"
                />

                <TextField
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-mobile"
                    label="Mobile"
                />

                <TextField
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-phone"
                    label="Phone number"
                />

                <TextField
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-address"
                    label="Address"
                />

                <TextField
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-email"
                    label="Email"
                />

                <TextField
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-request"
                    label="Request Service"
                />

                <TextField
                    sx={{ width: { xs: "100%", md: "calc(50% - 8px)" }, mt: 1 }}
                    required
                    id="form-gender"
                    label="Gender"
                />

                <TextField
                    sx={{ width: "100%", mt: 1 }}
                    required
                    id="form-description"
                    label="Description"
                    multiline={true}
                    rows={6}
                />

                <Box
                    className="u-box-light-secondary"
                    sx={{
                        width: "100%",
                        height: "max-content",
                        px: 2,
                        pt: 2,
                        pb: 4,
                        flexWrap: "wrap",
                        my: 2,
                        justifyContent: "flex-start",
                    }}
                >
                    <Typography variant="h5" color="white" align="left">
                        Choose Your Location
                    </Typography>

                    <Box sx={{ width: "100%", height: "300px" }}>{/* <MapBox /> */}</Box>
                </Box>

                <Button variant="contained" color="primary" sx={{ width: "max-content", mt: 3 }}>
                    Sign Up
                </Button>
            </Box>
        </form>
    );
};

export default AddRequestForm;
