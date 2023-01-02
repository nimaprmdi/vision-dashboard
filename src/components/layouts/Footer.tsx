import routes from "../../routes";
import { Typography, Box, Link as MUILink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { removeCurrentUser } from "../../store/account/accountsActions";

const Footer = () => {
    const currentUser = useSelector((state: RootState) => state.accounts.currentAccount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loginService");

        // dispatch(removeAccountHistory() as any);
        dispatch(removeCurrentUser() as any);
        navigate(`/login`);
    };

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
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: 2 }}>
                        {currentUser && Object.keys(currentUser).length > 0 ? (
                            <MUILink
                                textTransform="capitalize"
                                className="u-link-primary"
                                component="a"
                                underline="none"
                                color="white"
                                onClick={() => handleLogout()}
                                sx={{ cursor: "pointer" }}
                            >
                                Logout
                            </MUILink>
                        ) : (
                            <>
                                <MUILink
                                    onClick={() => handleLogout()}
                                    textTransform="capitalize"
                                    className="u-link-primary"
                                    component="div"
                                    underline="none"
                                    color="white"
                                >
                                    Login
                                </MUILink>

                                <MUILink
                                    onClick={() => handleLogout()}
                                    textTransform="capitalize"
                                    className="u-link-primary"
                                    component="div"
                                    underline="none"
                                    color="white"
                                >
                                    Register
                                </MUILink>
                            </>
                        )}

                        {routes.map((route, index: number) => {
                            return Object.keys(currentUser).length ? (
                                <Link className="u-link-primary" key={`footer-route-${index}`} to={`${route.path}`}>
                                    <MUILink textTransform="capitalize" className="u-link-primary" component="div" href="#" underline="none" color="white">
                                        {route.title}
                                    </MUILink>
                                </Link>
                            ) : null;
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
