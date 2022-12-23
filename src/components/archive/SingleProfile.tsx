import { useState, useEffect } from "react";
import ProfileHeader from "../common/build/ProfileHeader";
import ProfileSummaryDetail from "../common/build/ProfileSummaryDetail";
import ProfileWelcome from "../common/build/ProfileWelcome";
import ProfileSummary from "../common/build/ProfileSummary";
import Details from "../common/build/Details";
import Actions from "../common/build/Actions";
import Skull from "../common/Skull";
import { Box, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { IAccount } from "../../models/account";
import { ICommandButtons } from "../../models/commandButtons";
import PopUp from "../common/PopUp";
import EditPermissions from "../form/EditPermissions";

interface IUserData {
    name: string;
    lastName: string;
    bio: string;
    mobile: string;
    email: string;
    location: string;
    password: string;
    color: string;
}

const SingleProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState<IAccount>();
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const accountsState = useSelector((state: RootState) => state.accounts);

    const commandButtons: ICommandButtons[] = [
        { title: "Permission", color: "primary", handler: () => console.log("hello") },
        { title: "Edit", color: "primary", handler: () => console.log("hello") },
        { title: "Delete Account", color: "error", handler: () => console.log("hello") },
    ];

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

    return (
        <Box px={{ xs: 2, md: 0 }}>
            <PopUp handler={() => setIsPopupOpen(false)}>
                <EditPermissions isAdmin={false} />
            </PopUp>

            {!accountsState.isLoading && user ? <ProfileHeader data={user} /> : <Skull sx={{ height: "112px" }} />}

            <Grid container spacing={2} mt={1}>
                <Grid order={1} item xs={12} sm={6} md={3}>
                    {!accountsState.isLoading && user ? <ProfileWelcome name={`${user.name} ${user.lastName}`} /> : <Skull sx={{ height: "336px" }} />}
                </Grid>

                <Grid item container order={{ xs: 3, md: 2 }} xs={12} md={6}>
                    {!accountsState.isLoading && user ? <ProfileSummaryDetail user={user} /> : <Skull sx={{ height: "336px" }} />}
                </Grid>

                <Grid order={{ xs: 2, md: 3 }} item xs={12} sm={6} md={3}>
                    {!accountsState.isLoading && user && user.bio && <Details description={user.bio} />}
                </Grid>

                <Grid item xs={12} order={4} mt={1}>
                    <Actions
                        buttons={commandButtons}
                        title="User Actions"
                        parentProps={{
                            className: "u-box-light",
                        }}
                        parentSx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                            justifyContent: { xs: "center", md: "space-between" },
                            py: 4,
                            px: 3,
                        }}
                        childSx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                            justifyContent: { xs: "center", md: "center" },
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default SingleProfile;
