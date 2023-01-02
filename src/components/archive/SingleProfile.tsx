import { useState, useEffect } from "react";
import ProfileHeader from "../common/build/ProfileHeader";
import ProfileSummaryDetail from "../common/build/ProfileSummaryDetail";
import ProfileWelcome from "../common/build/ProfileWelcome";
import ProfileSummary from "../common/build/ProfileSummary";
import Details from "../common/build/Details";
import Actions from "../common/build/Actions";
import Skull from "../common/Skull";
import PopUp from "../common/PopUp";
import EditPermissions from "../form/EditPermissions";
import apiServices from "../../services/VisionDashboardApiServices";
import EditUser from "../form/EditUser";
import { Box, Grid, Button, Typography as Typo } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { IAccount } from "../../models/account";
import { ICommandButtons } from "../../models/commandButtons";
import { deleteAccount } from "../../store/account/accountsActions";

const SingleProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [user, setUser] = useState<IAccount>();
    const [imageUploading, setImageUploading] = useState<boolean>(false);
    // Popup Openers
    const [isEditPermissionPopOpen, setIsEditPermissionPopOpen] = useState<boolean>(false);
    const [isEditAccountPopupOpen, setIsEditAccountPopupOpen] = useState<boolean>(false);
    const [isDeletePopOpen, setIsDeletePopOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const accountsState = useSelector((state: RootState) => state.accounts);

    const commandButtons: ICommandButtons[] = [
        { title: "Edit", color: "primary", handler: () => setIsEditAccountPopupOpen(true) },
        { title: "Delete Account", color: "error", handler: () => setIsDeletePopOpen(true) },
    ];
    accountsState.currentAccount.isAdmin && commandButtons.push({ title: "Permission", color: "primary", handler: () => setIsEditPermissionPopOpen(true) });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // Upload File
        if (e.target && e.target.files) {
            const formData = new FormData();
            setImageUploading(true);

            formData.append("fileUpload", e.target.files[0]);
            await apiServices.updateProfileImage(user!.itemId, formData, setImageUploading);
        }
    };

    useEffect(() => {
        let currentUser: IAccount | undefined;

        if (!accountsState.isLoading && id) {
            currentUser = accountsState.accounts.find((account) => account.itemId === id);
            currentUser ? setUser(currentUser) : navigate(`/404`);
        } else if (!accountsState.isLoading && id && currentUser === undefined) {
            navigate(`/404`);
        } else if (!id) {
            navigate(`/404`);
        }
    }, [accountsState]);

    return (
        <Box px={{ xs: 2, md: 0 }}>
            {user && isEditPermissionPopOpen && (
                <PopUp handleClose={() => setIsEditPermissionPopOpen(false)}>
                    <EditPermissions isAdmin={user.isAdmin} itemId={user.itemId} />
                </PopUp>
            )}

            {user && isEditAccountPopupOpen && (
                <PopUp handleClose={() => setIsEditAccountPopupOpen(false)} title="Edit Profile">
                    <EditUser data={user} handleImageChange={handleImageChange} />
                </PopUp>
            )}

            {user && isDeletePopOpen && (
                <PopUp handleClose={() => setIsDeletePopOpen(false)}>
                    <Typo variant="h4" color="white">
                        Are You Sure?
                    </Typo>
                    <Typo mt={2} variant="h6" color="white">
                        This action is permanent
                    </Typo>
                    <Button sx={{ mt: 2 }} color="error" variant="contained" onClick={() => dispatch(deleteAccount(user.itemId) as any)}>
                        Delete User Account
                    </Button>
                </PopUp>
            )}

            {!accountsState.isLoading && user ? (
                <ProfileHeader
                    data={user}
                    imageUploading={imageUploading}
                    handleChangeImage={handleImageChange}
                    setIsEditAccountPopupOpen={setIsEditAccountPopupOpen}
                />
            ) : (
                <Skull sx={{ height: "112px" }} />
            )}

            <Grid container spacing={2} mt={1}>
                <Grid order={1} item xs={12} sm={6} md={3}>
                    {!accountsState.isLoading && user ? <ProfileWelcome name={`${user.name} ${user.lastName}`} /> : <Skull sx={{ height: "336px" }} />}
                </Grid>

                <Grid item container order={{ xs: 3, md: 2 }} xs={12} md={6}>
                    {!accountsState.isLoading && user ? <ProfileSummaryDetail user={user} /> : <Skull sx={{ height: "336px" }} />}
                </Grid>

                <Grid order={{ xs: 2, md: 3 }} item xs={12} sm={6} md={3}>
                    {!accountsState.isLoading && user ? user.bio && <Details description={user.bio} /> : <Skull sx={{ height: "336px" }} />}
                </Grid>

                <Grid item xs={12} order={4} mt={1}>
                    {!accountsState.isLoading && user ? (
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
                    ) : (
                        <Skull sx={{ height: "116px" }} />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default SingleProfile;
