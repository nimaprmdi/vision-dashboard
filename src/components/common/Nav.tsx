import { Avatar, ListItemAvatar, ListItemText, ListItem, List, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Nav = () => {
    return (
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
    );
};

export default Nav;
