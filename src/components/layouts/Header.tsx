import { Box, Typography, Divider, Stack, Button } from "@mui/material";
import Nav from "../common/Nav";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_MENU } from "../../store/entities/entitiesReducer";
import { RootState } from "../../store/rootReducer";
import CloseIcon from "@mui/icons-material/Close";
const Header = () => {
    const dispatch = useDispatch();
    const entities = useSelector((state: RootState) => state.entities);

    return (
        <Box className="c-header" sx={{ position: "relative" }}>
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
    );
};

export default Header;
