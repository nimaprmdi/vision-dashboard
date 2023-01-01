import { Box, Typography, Button, Link as MUILink } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const BlurHeader = () => {
    return (
        <Box className="c-header-blur" sx={{ flexWrap: "wrap", gap: 2 }}>
            <Typography variant="h2" className="u-text-small" color="white" fontWeight={700} sx={{ letterSpacing: 2 }} order={1}>
                VISION UI
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: { xs: "flex-start", md: "space-between" },
                    alignItems: "center",
                    gap: 3,
                    overflow: "auto",
                    width: { xs: "100%", md: "auto" },
                }}
                order={{ xs: 3, md: 2 }}
            >
                {/* <MUILink underline="hover" sx={{ display: "flex", alignItems: "center", color: "white" }} color="inherit" href="#">
                    <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Core
                </MUILink> */}
            </Box>

            <Button variant="contained" color="primary" sx={{ px: 4, order: { xs: 2, md: 3 } }}>
                <MUILink href="https://github.com/nimaprmdi/vision-dashboard" target="_blank" underline="none" component="a" color="white">
                    Free Download
                </MUILink>
            </Button>
        </Box>
    );
};

export default BlurHeader;
