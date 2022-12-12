import Table from "../common/Table";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import TableRowRequests from "../common/build/TableRowRequests";
import TableRowTickets from "../common/build/TableRowTickets";

const Archives = () => {
    const { type } = useParams<{ type: "requests" | "tickets" | "accounts" }>();
    const archiveType: "requests" | "tickets" | "accounts" = type || "requests";

    const handleArchiveComponent = () => {
        switch (type) {
            case "requests":
                return <TableRowRequests />;
            case "tickets":
                return <TableRowTickets />;
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
