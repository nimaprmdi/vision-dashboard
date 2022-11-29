import default_image from "../../assets/img/user-background.jpg";
import { Box } from "@mui/material";
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

interface SmartCardProps {
    children?: JSX.Element | JSX.Element[];
    sx?: SystemStyleObject<Theme>;
    className?: string;
    user_image?: string;
    hasBackground?: boolean;
}

const WideCard = ({ children, sx, className, user_image = default_image, hasBackground = false }: SmartCardProps) => {
    return (
        <Box
            className={className}
            sx={{
                backgroundColor: "",
                background: `linear-gradient(126.97deg, rgba(6, 11, 38, 0.89) 28.26%, rgba(26, 31, 55, 0.5) 91.2%)${
                    hasBackground ? `,url(${user_image})` : ""
                }  `,
                borderRadius: "20px",
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default WideCard;
