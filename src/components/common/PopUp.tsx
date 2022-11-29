import { Box, Typography, Button } from "@mui/material";

const PopUp = () => {
    return (
        <Box className="c-popup" sx={{ px: { xs: 2, md: 0 } }}>
            <Box className="c-popup__container">
                <Typography variant="h3" className="u-text-h5" color="white" align="center">
                    Pop Up
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
                        Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer is no. If two equally difficult
                        paths, choose the one more painful in the short term (pain avoidance is creating an illusion of
                        equality).
                    </Typography>
                </Box>

                <Box my={3} className="u-divider" />

                <Button variant="contained" color="primary">
                    CLOSE
                </Button>
            </Box>
        </Box>
    );
};

export default PopUp;
