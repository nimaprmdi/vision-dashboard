import React from "react";
import { Stack, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BreadCrumb = (): JSX.Element => {
    return (
        <Stack mb={2} bgcolor="error" sx={{ px: { xs: 2, md: 0 } }}>
            <Breadcrumbs color="gray.light" separator="/" aria-label="breadcrumb">
                <Link color="gray.light" underline="hover" key="1" href="/">
                    MUI
                </Link>

                <Link
                    underline="hover"
                    key="2"
                    href="/material-ui/getting-started/installation/"
                    color="gray.light"
                    // onClick={handleClick}
                >
                    Core
                </Link>

                <Typography key="3" color="white">
                    Breadcrumb
                </Typography>
            </Breadcrumbs>

            <Typography mt={1} variant="h6" color="white">
                Requests
            </Typography>
        </Stack>
    );
};

export default BreadCrumb;
