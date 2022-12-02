import React from "react";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";

const PostComment = () => {
    return (
        <Box className="u-box-light" height="auto" mt={3} p={3}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" color="white">
                    Submit An Answer
                </Typography>

                <Button variant="contained" color="primary">
                    Post Answer
                </Button>
            </Box>

            <Box mt={2}>
                <TextField sx={{ width: "100%" }} required id="outlined-required" label="Enter Title" />

                <TextField
                    sx={{ width: "100%", mt: 2 }}
                    required
                    id="outlined-required"
                    label="Enter Description"
                    defaultValue=""
                    size="small"
                    multiline={true}
                    rows={6}
                />
            </Box>
        </Box>
    );
};

export default PostComment;
