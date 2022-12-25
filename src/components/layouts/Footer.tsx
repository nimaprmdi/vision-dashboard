import { Typography, Box, Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";
import routes from "../../routes";

const Footer = () => {
    return (
        <Box mt={10} pb={6} px={1}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: { xs: 3, md: 0 },
                    flexWrap: "wrap",
                    gap: 3,
                }}
            >
                <Typography variant="h6" className="u-text-small" color="white" sx={{ fontWeight: 400, letterSpacing: 0.5 }} textTransform="capitalize">
                    {new Date().getFullYear()} - Made by Nima Prmdi featuring with 🐈 (Open-Source GPL-V3)
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <>
                        <Link className="u-link-primary" to="/login">
                            <MUILink textTransform="capitalize" className="u-link-primary" component="div" href="#" underline="none" color="white">
                                Login
                            </MUILink>
                        </Link>

                        {routes.map((route, index: number) => {
                            return (
                                <Link className="u-link-primary" key={`footer-route-${index}`} to={`${route.path}`}>
                                    <MUILink textTransform="capitalize" className="u-link-primary" component="div" href="#" underline="none" color="white">
                                        {route.title}
                                    </MUILink>
                                </Link>
                            );
                        })}
                    </>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
