import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { SystemStyleObject } from "@mui/system";
import { Box, Button } from "@mui/material";
import { Theme } from "@mui/material";
import { ICommandButtons } from "../../../models/commandButtons";

interface CommandButtonsProps {
    sx?: SystemStyleObject<Theme>;
    buttons: ICommandButtons[];
}

const CommandButtons = ({ sx, buttons }: CommandButtonsProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                ...sx,
            }}
        >
            {buttons.map((button, index: number) => (
                <Button
                    key={`ticketcommandbutton-${index}`}
                    startIcon={<ViewInArIcon />}
                    variant="contained"
                    color={button.color}
                >
                    {button.title}
                </Button>
            ))}
        </Box>
    );
};

export default CommandButtons;
