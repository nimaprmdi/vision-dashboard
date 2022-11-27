import React from "react";
import Grid from "@mui/material/Grid";
import { AppBar, Box } from "@mui/material";

const Header = () => {
    return (
        <Grid item xs={12} md={3} m={2}>
            <Box className="c-header">Hello</Box>
        </Grid>
    );
};

export default Header;
