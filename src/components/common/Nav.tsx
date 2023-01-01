import { useSelector } from "react-redux";
import routes from "../../routes";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store/rootReducer";
import { Avatar, ListItemAvatar, ListItemText, ListItem, List, Box } from "@mui/material";

const Nav = () => {
    const entities = useSelector((state: RootState) => state.entities);
    const accountsState = useSelector((state: RootState) => state.accounts);
    const currentAccount = useSelector((state: RootState) => state.accounts.currentAccount);

    return Object.keys(currentAccount).length ? (
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
                        {Object.keys(accountsState.currentAccount).length ? (
                            <ListItem sx={{ py: 1.5 }}>
                                <ListItemAvatar>
                                    <Avatar className="c-nav__avatar">{route.icon}</Avatar>
                                </ListItemAvatar>
                                <ListItemText sx={{ textTransform: "capitalize" }} primary={route.title} />
                            </ListItem>
                        ) : null}
                    </NavLink>
                ))}
            </List>
        </Box>
    ) : null;
};

export default Nav;
