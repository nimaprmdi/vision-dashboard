import ProfileHeader from "../common/build/ProfileHeader";
import ProfileSummaryDetail from "../common/build/ProfileSummaryDetail";
import ProfileWelcome from "../common/build/ProfileWelcome";
import ProfileSummary from "../common/build/ProfileSummary";
import Details from "../common/build/Details";
import Actions from "../common/build/Actions";
import { Box, Grid } from "@mui/material";

const SingleProfile = () => {
    return (
        <Box px={2}>
            <ProfileHeader />

            <Grid container spacing={2} mt={1}>
                <Grid order={1} item xs={12} sm={6} md={3}>
                    <ProfileWelcome />
                </Grid>

                <Grid item container order={{ xs: 3, md: 2 }} xs={12} md={6}>
                    <ProfileSummaryDetail />
                </Grid>

                <Grid order={{ xs: 2, md: 3 }} item xs={12} sm={6} md={3}>
                    <Details />
                </Grid>

                <Grid item xs={12} order={4} mt={1}>
                    <Actions />
                </Grid>
            </Grid>
        </Box>
    );
};

export default SingleProfile;
