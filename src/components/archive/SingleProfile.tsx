import { useState, useEffect } from "react";
import ProfileHeader from "../common/build/ProfileHeader";
import ProfileSummaryDetail from "../common/build/ProfileSummaryDetail";
import ProfileWelcome from "../common/build/ProfileWelcome";
import ProfileSummary from "../common/build/ProfileSummary";
import Details from "../common/build/Details";
import Actions from "../common/build/Actions";
import { Box, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { IAccount } from "../../models/account";
import Skull from "../common/Skull";

const SingleProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const accountsState = useSelector((state: RootState) => state.accounts);
    const [user, setUser] = useState<IAccount>();

    useEffect(() => {
        let currentUser: IAccount | undefined;

        if (!accountsState.isLoading && id) {
            currentUser = accountsState.accounts.find((account) => account.itemId === id);
            currentUser ? setUser(currentUser) : navigate("/404");
        } else if (!accountsState.isLoading && id && currentUser === undefined) {
            navigate("/404");
        } else if (!id) {
            navigate("/404");
        }
    }, [accountsState]);

    useEffect(() => {
        console.log("user", user);
    }, [user]);

    return (
        <Box px={2}>
            {!accountsState.isLoading && user ? <ProfileHeader data={user} /> : <Skull sx={{ height: "112px" }} />}

            <Grid container spacing={2} mt={1}>
                <Grid order={1} item xs={12} sm={6} md={3}>
                    <ProfileWelcome />
                </Grid>

                <Grid item container order={{ xs: 3, md: 2 }} xs={12} md={6}>
                    <ProfileSummaryDetail />
                </Grid>

                <Grid order={{ xs: 2, md: 3 }} item xs={12} sm={6} md={3}>
                    {/* <Details /> */}
                </Grid>

                <Grid item xs={12} order={4} mt={1}>
                    {/* <Actions /> */}
                </Grid>
            </Grid>
        </Box>
    );
};

export default SingleProfile;
