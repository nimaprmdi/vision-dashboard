import { Box, Typography, Stack, Button, Avatar } from "@mui/material";
import Nav from "../common/Nav";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_MENU } from "../../store/entities/entitiesReducer";
import { RootState } from "../../store/rootReducer";
import CloseIcon from "@mui/icons-material/Close";
import header_bg from "../../assets/img/header-bg.jpg";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Link } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const entities = useSelector((state: RootState) => state.entities);

    return (
        <Box
            className="c-header"
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                pb: 3,
            }}
        >
            <Box>
                <Box
                    pt={5}
                    px={6}
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "center", sm: "space-between", md: "center" },
                        alignItems: "center",
                        alignContent: "center",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Typography letterSpacing={2} variant="h2" className="c-header__title u-weight-medium u-h5">
                        VISION DASHBOARD
                    </Typography>

                    <Button
                        onClick={() => dispatch({ type: TOGGLE_MENU.type })}
                        sx={{ display: { md: "none" } }}
                        variant="contained"
                    >
                        {entities.isOpen ? <CloseIcon /> : <MenuIcon />}
                    </Button>
                </Box>

                <Box mt={4} px={4}>
                    <Box className="u-divider" />
                </Box>

                <Stack spacing={2} px={3} mt={3}>
                    <Nav />
                </Stack>
            </Box>

            <Box px={3}>
                <Box className="u-box-light" sx={{ background: `url(${header_bg})`, backgroundSize: "cover", p: 3 }}>
                    <Avatar sx={{ bgcolor: "white", mb: 2 }}>
                        <QuestionMarkIcon sx={{ color: "mainPrimary.main" }} />
                    </Avatar>

                    <Typography textTransform="capitalize" variant="h6" fontWeight={700} color="white">
                        Need Help?
                    </Typography>

                    <Typography
                        textTransform="capitalize"
                        variant="h6"
                        fontWeight={400}
                        color="white"
                        className="u-text-small"
                        mt={1}
                    >
                        Please check our docs
                    </Typography>

                    <Box className="u-box-light" textAlign="center" py={2} mt={3}>
                        <Typography color="white">
                            <Link to="/" className="u-link-primary">
                                Documentation
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
