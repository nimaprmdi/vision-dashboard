import { Skeleton, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

interface SkullProps {
    sx?: SystemStyleObject<Theme>;
}

const Skull = ({ sx }: SkullProps) => {
    return <Skeleton animation="wave" variant="rounded" width="100%" sx={{ borderRadius: "20px", ...sx }} />;
};

export default Skull;
