import { Grid, Box, Typography, Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const BreadCrumbItem = () => {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Box className="c-breadcrumb" sx={{ borderRadius: "20px" }}>
                <Box>
                    <Typography color="gray.light" variant="h6" className="u-text-tiny">
                        Reuests
                    </Typography>

                    <Typography color="white" variant="h5">
                        $53,000
                    </Typography>
                </Box>

                <Avatar className="u-avatar-secondary" variant="rounded">
                    <HomeIcon sx={{ fontSize: "18px" }} />
                </Avatar>
            </Box>
        </Grid>
    );
};

export default BreadCrumbItem;
