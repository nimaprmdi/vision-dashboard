import { Box, Button } from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { SystemStyleObject } from "@mui/system";
import { Theme } from "@mui/material";

interface CommandButtonsProps {
    sx?: SystemStyleObject<Theme>;
}

const CommandButtons = ({ sx }: CommandButtonsProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                ...sx,
            }}
        >
            <Button startIcon={<ViewInArIcon />} variant="contained" color="primary">
                Mark As Done
            </Button>
            <Button startIcon={<ViewInArIcon />} variant="contained" color="error">
                Reject Request
            </Button>
            <Button startIcon={<ViewInArIcon />} variant="contained" color="warning">
                Mark As Pending
            </Button>
        </Box>
    );
};

export default CommandButtons;
