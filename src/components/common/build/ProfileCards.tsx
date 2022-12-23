import { Grid, Box, Typography, Avatar } from "@mui/material";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import { IAccount } from "../../../models/account";

interface ProfileCardsProps {
    user: IAccount;
}

const ProfileCards = ({ user }: ProfileCardsProps) => {
    const solvedRequests = user.requests.filter((request) => request.itemStatus === "solved");
    const solvedTickets = user.tickets.filter((ticket) => ticket.isClose === true);
    console.log("solvedTickets", user.tickets);

    return (
        <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12} sm={6}>
                <Box
                    className="u-box-light"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1.5,
                        borderRadius: "10px",
                    }}
                >
                    <Box>
                        <Typography color="white" variant="h6" className="u-text-tiny">
                            Requests
                        </Typography>

                        <Typography color="white" variant="h6" className="u-text-h4">
                            {user.requests.length}
                        </Typography>
                    </Box>

                    <Avatar sx={{ bgcolor: "primary.main" }} variant="rounded">
                        <ElectricCarIcon />
                    </Avatar>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Box
                    className="u-box-light"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1.5,
                        borderRadius: "10px",
                    }}
                >
                    <Box>
                        <Typography color="white" variant="h6" className="u-text-tiny">
                            Solved Requests
                        </Typography>

                        <Typography color="white" variant="h6" className="u-text-h4">
                            {solvedRequests.length}
                        </Typography>
                    </Box>

                    <Avatar sx={{ bgcolor: "primary.main" }} variant="rounded">
                        <ElectricCarIcon />
                    </Avatar>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Box
                    className="u-box-light"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1.5,
                        borderRadius: "10px",
                    }}
                >
                    <Box>
                        <Typography color="white" variant="h6" className="u-text-tiny">
                            Tickets
                        </Typography>

                        <Typography color="white" variant="h6" className="u-text-h4">
                            {user.tickets.length}
                        </Typography>
                    </Box>

                    <Avatar sx={{ bgcolor: "primary.main" }} variant="rounded">
                        <ElectricCarIcon />
                    </Avatar>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Box
                    className="u-box-light"
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1.5,
                        borderRadius: "10px",
                    }}
                >
                    <Box>
                        <Typography color="white" variant="h6" className="u-text-tiny">
                            Solved Tickets
                        </Typography>

                        <Typography color="white" variant="h6" className="u-text-h4">
                            {solvedTickets.length}
                        </Typography>
                    </Box>

                    <Avatar sx={{ bgcolor: "primary.main" }} variant="rounded">
                        <ElectricCarIcon />
                    </Avatar>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProfileCards;
