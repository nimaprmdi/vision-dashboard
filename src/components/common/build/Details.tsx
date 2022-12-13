import React from "react";
import { Box, Typography, Stack } from "@mui/material";

interface DetailsProps {
    description: string;
    children?: JSX.Element | JSX.Element[];
}

const Details = ({ description, children }: DetailsProps) => {
    return (
        <Box className="u-box-light" py={2} px={3}>
            {description && (
                <Typography pt={4} variant="h6" className="u-text-small" color="gray.light">
                    {description}
                </Typography>
            )}

            {description && <Box mt={5} className="u-divider" />}

            <Stack mt={3.5}>{children}</Stack>
        </Box>
    );
};

export default Details;
