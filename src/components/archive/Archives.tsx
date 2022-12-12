import Table from "../common/Table";
import TableRowRequests from "../common/build/TableRowRequests";
import TableRowTickets from "../common/build/TableRowTickets";
import TableRowAccounts from "../common/build/TableRowAccounts";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const Archives = () => {
    const { type } = useParams<{ type: "requests" | "tickets" | "accounts" }>();

    const handleArchiveComponent = () => {
        switch (type) {
            case "requests":
                return <TableRowRequests />;
            case "tickets":
                return <TableRowTickets />;
            case "accounts":
                return <TableRowAccounts />;
            default:
                return <></>;
        }
    };

    return (
        <Box className="c-archives" sx={{ px: { sx: 2, md: 0 } }}>
            <Table data={type || "requests"}>{handleArchiveComponent()}</Table>
        </Box>
    );
};

export default Archives;
