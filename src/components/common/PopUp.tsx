import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
interface PopUpProps {
    title?: string;
    description?: string;
    children?: JSX.Element | JSX.Element[];
    handler: (isOpen: boolean) => void;
}

const PopUp = ({ title, description, children, handler }: PopUpProps) => {
    return (
        <Box className="c-popup" sx={{ px: { xs: 2, md: 0 } }}>
            <Box className="c-popup__container" sx={{ maxHeight: "90vh", overflow: "auto" }}>
                <Typography variant="h3" className="u-text-h5" color="white" align="center">
                    {title}
                </Typography>

                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ maxWidth: "440px" }} mt={2} variant="h3" className="u-text-small" color="gray.light" align="center">
                        {description}
                    </Typography>
                </Box>

                {children}

                <Box my={3} className="u-divider" />

                <Button variant="contained" color="primary" onClick={() => handler(false)}>
                    CLOSE
                </Button>
            </Box>
        </Box>
    );
};

export default PopUp;
