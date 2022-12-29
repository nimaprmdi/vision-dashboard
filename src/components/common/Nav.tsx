import routes from "../../routes";
import { Avatar, ListItemAvatar, ListItemText, ListItem, List, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { NavLink } from "react-router-dom";

const Nav = () => {
    const entities = useSelector((state: RootState) => state.entities);
    const currentUser = useSelector((state: RootState) => state.accounts.currentAccount);

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
                        {currentUser.isAdmin ||
                            (!currentUser.isAdmin &&
                                (route.path === "/add-request" || route.path === "/archives/requests" || route.path === "/archives/tickets") && (
                                    <ListItem sx={{ py: 1.5 }}>
                                        <ListItemAvatar>
                                            <Avatar className="c-nav__avatar">{route.icon}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText sx={{ textTransform: "capitalize" }} primary={route.title} />
                                    </ListItem>
                                ))}
                    </NavLink>
                ))}
            </List>
        </Box>
    );
};

export default Nav;
