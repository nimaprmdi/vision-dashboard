import { SystemStyleObject } from "@mui/system";
import { Box, Button } from "@mui/material";
import { Theme } from "@mui/material";
import { ICommandButtons } from "../../../models/commandButtons";

interface CommandButtonsProps {
    sx?: SystemStyleObject<Theme>;
}

const CommandButtons = ({ sx }: CommandButtonsProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                ...sx,
            }}
        ></Box>
    );
};

export default CommandButtons;
