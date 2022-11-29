import HomeIcon from "@mui/icons-material/Home";
import { Avatar, ListItemAvatar, ListItemText, ListItem, List, Link, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

const Nav = () => {
    const entities = useSelector((state: RootState) => state.entities);

    return (
        <Box
            sx={{
                maxHeight: { xs: entities.isOpen ? "auto" : 0, md: "max-content" },
                overflow: "hidden",
            }}
        >
            <List sx={{ width: "100%", maxWidth: 360 }}>
                <Link href="#" underline="none">
                    <ListItem sx={{ py: 1.5 }} className="c-nav__item" selected={true}>
                        <ListItemAvatar>
                            <Avatar className="c-nav__avatar">
                                <HomeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>

                <Link href="#" underline="none">
                    <ListItem sx={{ py: 1.5 }} className="c-nav__item">
                        <ListItemAvatar>
                            <Avatar className="c-nav__avatar">
                                <HomeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>

                <Link href="#" underline="none">
                    <ListItem sx={{ py: 1.5 }} className="c-nav__item">
                        <ListItemAvatar>
                            <Avatar className="c-nav__avatar">
                                <HomeIcon sx={{ fontSize: "18px" }} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
            </List>
        </Box>
    );
};

export default Nav;
