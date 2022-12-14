import { Stack, Breadcrumbs, Typography, Link as MUILink } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const BreadCrumb = (): JSX.Element => {
    const location = useLocation();
    const navItems = location.pathname.split("/").filter((item) => item);

    return (
        <Stack mb={2} bgcolor="error" sx={{ px: { xs: 3, md: 0 } }}>
            <Breadcrumbs color="gray.light" separator="/" aria-label="breadcrumb">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <MUILink variant="h5" underline="none" color="gray.light" textTransform="capitalize">
                        Home
                    </MUILink>
                </Link>
                {navItems.length &&
                    navItems.map((nav, index: number) => (
                        <Typography
                            key={`breadcrumb-item-${index}`}
                            variant="h5"
                            color="gray.light"
                            textTransform="capitalize"
                        >
                            {nav}
                        </Typography>
                    ))}
            </Breadcrumbs>

            <Typography mt={1} variant="h6" color="white">
                Requests
            </Typography>
        </Stack>
    );
};

export default BreadCrumb;
