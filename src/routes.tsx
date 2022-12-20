import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GroupIcon from "@mui/icons-material/Group";

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
];

export default routes;
