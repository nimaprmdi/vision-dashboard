import { Typography, Box, Link } from "@mui/material";

const Footer = () => {
    return (
        <Box mt={10} pb={6} px={1}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: { xs: 3, md: 0 },
                    flexWrap: "wrap",
                    gap: 3,
                }}
            >
                <Typography
                    variant="h6"
                    className="u-text-small"
                    color="white"
                    sx={{ fontWeight: 400, letterSpacing: 0.5 }}
                    textTransform="capitalize"
                >
                    {new Date().getFullYear()} - Made by Nima Prmdi featuring with 🐈 (Open-Source GPL-V3)
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Link href="#" underline="none" color="white">
                        Marketplace
                    </Link>
                    <Link href="#" underline="none" color="white">
                        Blogs
                    </Link>
                    <Link href="#" underline="none" color="white">
                        License
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
