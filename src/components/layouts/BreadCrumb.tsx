import { Stack, Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const BreadCrumb = (): JSX.Element => {
    const location = useLocation();
    const navItems = location.pathname.split("/").filter((item) => item);

    return (
        <Stack mb={2} bgcolor="error" sx={{ px: { xs: 3, md: 0 } }}>
            <Breadcrumbs color="gray.light" separator="/" aria-label="breadcrumb">
                {!navItems.length ? (
                    <Typography key="3" color="white">
                        Home
                    </Typography>
                ) : (
                    navItems.map((nav, index: number) => (
                        <Typography
                            key={`breadcrumb-item-${index}`}
                            variant="h5"
                            color="gray.light"
                            textTransform="capitalize"
                        >
                            {nav}
                        </Typography>
                    ))
                )}
            </Breadcrumbs>

            <Typography mt={1} variant="h6" color="white">
                Requests
            </Typography>
        </Stack>
    );
};

export default BreadCrumb;
