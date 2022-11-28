import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";

const Header = () => {
    return (
        <Box className="c-header">
            <Typography variant="h2" className="c-header__title u-weight-medium u-text-small">
                VISION DASHBOARD
            </Typography>
        </Box>
    );
};

export default Header;
