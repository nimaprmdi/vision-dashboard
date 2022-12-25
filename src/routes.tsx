import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GroupIcon from "@mui/icons-material/Group";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

interface IRoutes {
    title: string;
    path: string;
    icon: JSX.Element;
}

const routes: IRoutes[] = [
    { title: "home", path: "/", icon: <HomeIcon /> },
    { title: "requests", path: "/archives/requests", icon: <ReceiptLongIcon /> },
    { title: "tickets", path: "/archives/tickets", icon: <ChatIcon /> },
    { title: "users", path: "/archives/accounts", icon: <GroupIcon /> },
    { title: "Add Request", path: "/add-request", icon: <PlaylistAddIcon /> },
];

export default routes;
