import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface PopUpProps {
    title: string;
    description?: string;
    link?: string;
}

const PopUp = ({ title, description, link = "/" }: PopUpProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        setIsOpen(false);
        navigate(link);
    };

    return isOpen ? (
        <Box className="c-popup" sx={{ px: { xs: 2, md: 0 } }}>
            <Box className="c-popup__container">
                <Typography variant="h3" className="u-text-h5" color="white" align="center">
                    {title}
                </Typography>

                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Typography
                        sx={{ maxWidth: "440px" }}
                        mt={2}
                        variant="h3"
                        className="u-text-small"
                        color="gray.light"
                        align="center"
                    >
                        {description}
                    </Typography>
                </Box>

                <Box my={3} className="u-divider" />

                <Button variant="contained" color="primary" onClick={() => handleClose()}>
                    CLOSE
                </Button>
            </Box>
        </Box>
    ) : (
        <></>
    );
};

export default PopUp;
