import { Box, Typography } from "@mui/material";
import { ICommandButtons } from "../../../models/commandButtons";
import CommandButtons from "./CommandButtons";

const Actions = () => {
    const commandButtons: ICommandButtons[] = [
        { title: "Close Ticket", color: "primary" },
        { title: "Delete Ticket", color: "error" },
        { title: "Mark as Reviewing", color: "warning" },
    ];
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "space-between" },
                px: 4,
                py: { xs: 4, md: 3 },
                flexWrap: "wrap",
                gap: { xs: 4, md: 2 },
            }}
            className="u-box-light"
        >
            <Typography
                width={{ xs: "100%", md: "max-content" }}
                textAlign="center"
                variant="h1"
                color="white"
                fontWeight={700}
            >
                Request Actions
            </Typography>

            <CommandButtons sx={{ justifyContent: { xs: "center", md: "flex-end" } }} buttons={commandButtons} />
        </Box>
    );
};

export default Actions;
