import { Box } from "@mui/material";
import Table from "../common/Table";

const Archives = () => {
    return (
        <Box sx={{ px: 2 }}>
            <Table data="requests" />
        </Box>
    );
};

export default Archives;
