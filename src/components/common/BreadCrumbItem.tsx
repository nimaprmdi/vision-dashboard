import { Box, Typography, Avatar } from "@mui/material";

interface BreadCrumbProps {
    title: string;
    value: string;
    icon: JSX.Element;
}

const BreadCrumbItem = ({ title, value, icon }: BreadCrumbProps) => {
    return (
        <Box className="c-breadcrumb u-opacity-0 u-fadein" sx={{ borderRadius: "20px" }}>
            <Box>
                <Typography color="gray.light" variant="h6" className="u-text-tiny">
                    {title}
                </Typography>

                <Typography color="white" variant="h5" mt={1}>
                    {value}
                </Typography>
            </Box>

            <Avatar className="u-avatar-secondary" variant="rounded">
                {icon}
            </Avatar>
        </Box>
    );
};

export default BreadCrumbItem;
