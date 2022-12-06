import { Grid, Box, Typography, Avatar } from "@mui/material";

interface BreadCrumbProps {
    title: string;
    value: string;
    icon: JSX.Element;
}

const BreadCrumbItem = ({ title, value, icon }: BreadCrumbProps) => {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Box className="c-breadcrumb" sx={{ borderRadius: "20px" }}>
                <Box>
                    <Typography color="gray.light" variant="h6" className="u-text-tiny">
                        {title}
                    </Typography>

                    <Typography color="white" variant="h5">
                        {value}
                    </Typography>
                </Box>

                <Avatar className="u-avatar-secondary" variant="rounded">
                    {icon}
                </Avatar>
            </Box>
        </Grid>
    );
};

export default BreadCrumbItem;
