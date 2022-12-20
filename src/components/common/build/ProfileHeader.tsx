import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import apiServices from "../../../services/VisionDashboardApiServices";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useState } from "react";
import { IAccount } from "../../../models/account";
import { Box, Avatar, Typography, Button, Badge, FormLabel } from "@mui/material";

interface ProfileHeaderProps {
    data: IAccount;
}

const ProfileHeader = ({ data }: ProfileHeaderProps) => {
    console.log(data.profileImage);

    // @todo : sending image
    const [image, setImage] = useState<File>();
    const [imageUpload, setImageUpload] = useState<boolean>(false);
    const [assetId, setAssetId] = useState<string>();

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget && e.currentTarget.files && setImage(e.currentTarget.files[0]);
        setAssetId("");
        const formData = new FormData();
        setImageUpload(true);

        if (e.currentTarget && e.currentTarget.files) {
            formData.append("fileUpload", e.currentTarget.files[0]);
            apiServices.updateProfileImage(data.itemId, formData, setImageUpload);
        }
    };

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
                        <>
                            <FormLabel
                                htmlFor="file-upload"
                                sx={{
                                    color: "white",
                                    background:
                                        "linear-gradient(138.78deg, rgba(6, 11, 40, 0.94) 17.44%, rgb(80 83 101 / 98%) 93.55%, rgba(10, 14, 35, 0.69) 93.55%)",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    p: 0.8,
                                    mt: 2,
                                    ml: 2,
                                }}
                            >
                                <EditIcon sx={{ fontSize: "18px" }} onClick={() => console.log("hello")} />
                            </FormLabel>

                            <input style={{ visibility: "hidden" }} id="file-upload" accept="image/jpeg" type="file" onChange={(e) => handleInputChange(e)} />
                        </>
                    }
                >
                    <Avatar
                        variant="rounded"
                        sx={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "10px",
                            bgcolor: data.color.hex || "gray.light",
                        }}
                    >
                        {imageUpload ? (
                            <HourglassEmptyIcon className="u-rotate" sx={{ fontSize: "48px" }} />
                        ) : data.profileImage ? (
                            <img
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                src={data.profileImage.url}
                                alt={`${data.name}-${data.lastName}`}
                            />
                        ) : (
                            <GroupIcon sx={{ fontSize: "48px" }} />
                        )}
                    </Avatar>
                </Badge>

                <Box>
                    <Typography textTransform="capitalize" variant="h5" color="white">
                        {data.name || " "}
                    </Typography>

                    <Typography textTransform="capitalize" variant="h5" color="gray.light">
                        {data.lastName || " "}
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
