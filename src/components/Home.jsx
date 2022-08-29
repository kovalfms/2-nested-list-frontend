import React from 'react';
import {Box, Typography} from "@mui/material";
import useApi from "../utils/Context";

const Home = () => {
    const {auth} = useApi()

    return (
        <Box display="flex" justifyContent="center">
            <Typography component="h1" variant="h3">
                Welcome! {auth?.user?.name}
            </Typography>
        </Box>
    )
};

export default Home;