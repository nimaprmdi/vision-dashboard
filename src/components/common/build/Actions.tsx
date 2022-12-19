import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { Box, Typography, Button, Theme } from "@mui/material";
import { ICommandButtons } from "../../../models/commandButtons";
import { useDispatch } from "react-redux";
import { SystemStyleObject } from "@mui/system";

interface ActionProps {
    title?: string;
    buttons: ICommandButtons[];
    parentProps?: React.AnchorHTMLAttributes<HTMLDivElement>;
    childProps?: React.AnchorHTMLAttributes<HTMLDivElement>;
    parentSx?: SystemStyleObject<Theme>;
    childSx?: SystemStyleObject<Theme>;
}

const Actions = ({ title, buttons, parentProps, childProps, parentSx, childSx }: ActionProps) => {
    const dispatch = useDispatch();

    return (
        <Box {...parentProps} sx={{ ...parentSx }}>
            <Typography
                width={{ xs: "100%", md: "max-content" }}
                textAlign="center"
                variant="h1"
                color="white"
                fontWeight={700}
            >
                {title || "Actions"}
            </Typography>

            <Box {...childProps} sx={{ ...childSx }}>
                {buttons.map((button, index: number) => (
                    <Button
                        key={`ticket-commandbutton-${index}`}
                        variant="contained"
                        color={button.color}
                        startIcon={<ViewInArIcon />}
                        onClick={() => dispatch(button.handler as any)}
                    >
                        {button.title}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default Actions;
