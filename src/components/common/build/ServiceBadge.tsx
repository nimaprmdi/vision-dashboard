import { Grid, Box, Typography, Avatar, Stack } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";

const ServiceBadge = () => {
    return (
        <Box
            className="u-box-light"
            sx={{ display: "flex", alignContent: "space-between", flexWrap: "wrap" }}
            width="100%"
            py={3}
            px={3}
        >
            <Box className="u-box-medium" width="100%" py={2}>
                <Box>
                    <Typography ml={2} className="u-text-tiny" variant="h6" color="white" fontWeight={700}>
                        Admin
                    </Typography>
                    <Typography ml={2} mt={0.5} variant="h3" color="white" fontWeight={700}>
                        Admin
                    </Typography>
                </Box>

                <LocalHospitalIcon sx={{ fontSize: "35px", color: "white", mr: 2 }} />
            </Box>

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                    mt: 4,
                }}
            >
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Avatar className="u-avatar-tertiary" sx={{ borderRadius: "999px" }} variant="rounded">
                        <HomeIcon color="success" sx={{ fontSize: "18px" }} />
                    </Avatar>

                    <Box>
                        <span title="Tehran Azadi Laleh Street" className="u-text-small" style={{ color: "white" }}>
                            {"Tehran Azadi Laleh Street".slice(0, 20) + "..."}
                        </span>

                        <Typography variant="h6" className="u-text-small" color="gray.light">
                            2022-15-5
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="h6" className="u-text-small" color="white">
                    $154.50
                </Typography>
            </Box>
        </Box>
    );
};

export default ServiceBadge;
