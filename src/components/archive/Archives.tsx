import { useEffect } from "react";
import Table from "../common/Table";
import TableRowRequests from "../common/build/TableRowRequests";
import TableRowTickets from "../common/build/TableRowTickets";
import TableRowAccounts from "../common/build/TableRowAccounts";
import { Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

const Archives = () => {
    const { type } = useParams<{ type: "requests" | "tickets" | "accounts" }>();
    const navigate = useNavigate();
    const currentAccount = useSelector((state: RootState) => state.accounts.currentAccount);

    const handleArchiveComponent = () => {
        switch (type) {
            case "requests":
                return <TableRowRequests />;
            case "tickets":
                return <TableRowTickets />;
            case "accounts":
                return <TableRowAccounts />;
            default:
                return <TableRowAccounts />;
        }
    };

    useEffect(() => {
        if (type !== "tickets" && type !== "requests" && type !== "accounts") {
            navigate(`${process.env.REACT_APP_GLOBAL_HOME_LOCATION!}404`);
        }
    }, []);

    return (
        <Box className="c-archives" sx={{ px: { sx: 2, md: 0 } }}>
            <Table data={type || "requests"}>{handleArchiveComponent()}</Table>
        </Box>
    );
};

export default Archives;
