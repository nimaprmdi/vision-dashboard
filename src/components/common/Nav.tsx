import HomeIcon from "@mui/icons-material/Home";
import { Avatar, ListItemAvatar, ListItemText, ListItem, List, Link as MUILink, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { NavLink, useLocation } from "react-router-dom";
import routes from "../../routes";

const Nav = () => {
    const { pathname } = useLocation();
    console.log(pathname);
    const entities = useSelector((state: RootState) => state.entities);

    return (
        <Box
            className="c-nav"
            sx={{
                maxHeight: { xs: entities.isOpen ? "auto" : 0, md: "max-content" },
                overflow: "hidden",
            }}
        >
            <List sx={{ width: "100%", maxWidth: 360 }}>
                {routes.map((route, index: number) => (
                    <NavLink
                        className={({ isActive }) => (isActive ? "c-nav__item c-nav__item--active" : "c-nav__item")}
                        key={`route-${route.title}-${index}`}
                        to={route.path}
                        style={{ textDecoration: "none" }}
                    >
                        <ListItem sx={{ py: 1.5 }}>
                            <ListItemAvatar>
                                <Avatar className="c-nav__avatar">{route.icon}</Avatar>
                            </ListItemAvatar>
                            <ListItemText sx={{ textTransform: "capitalize" }} primary={route.title} />
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </Box>
    );
};

export default Nav;
