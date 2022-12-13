import { Box, Typography, Button } from "@mui/material";
import { ICommandButtons } from "../../../models/commandButtons";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

interface ActionProps {
    buttons: ICommandButtons[];
}

const Actions = ({ buttons }: ActionProps) => {
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

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", md: "flex-end" },
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
        </Box>
    );
};

export default Actions;
