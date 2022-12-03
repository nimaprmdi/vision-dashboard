import { Box, Avatar, Typography, Button, Badge } from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import EditIcon from "@mui/icons-material/Edit";

const ProfileHeader = () => {
    return (
        <Box
            className="u-box-light"
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                p: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                    alignItems: "center",
                }}
            >
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                        <EditIcon
                            sx={{
                                color: "white",
                                background:
                                    "linear-gradient(138.78deg, rgba(6, 11, 40, 0.94) 17.44%, rgb(80 83 101 / 98%) 93.55%, rgba(10, 14, 35, 0.69) 93.55%)",
                                borderRadius: "8px",
                                fontSize: "30px",
                                p: 0.8,
                            }}
                        />
                    }
                >
                    <Avatar variant="rounded" sx={{ width: "80px", height: "80px", borderRadius: "10px" }} />
                </Badge>

                <Box>
                    <Typography variant="h5" color="white">
                        Mark Johnson
                    </Typography>

                    <Typography variant="h5" color="gray.light">
                        mark@simmmple.com
                    </Typography>
                </Box>
            </Box>

            <Button variant="contained" color="primary" startIcon={<ViewInArIcon />} sx={{ px: 6 }}>
                Edit
            </Button>
        </Box>
    );
};

export default ProfileHeader;
