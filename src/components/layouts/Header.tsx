import { Box, Typography, Divider, Stack } from "@mui/material";
import Nav from "../common/Nav";

const Header = () => {
    return (
        <Box className="c-header" sx={{ position: "relative" }}>
            <Typography pt={5} letterSpacing={2} variant="h2" className="c-header__title u-weight-medium u-h5">
                VISION DASHBOARD
            </Typography>

            <Box mt={4} px={4}>
                <Box className="u-divider" />
            </Box>

            <Stack spacing={2} px={3} mt={3}>
                <Nav />
            </Stack>
        </Box>
    );
};

export default Header;
