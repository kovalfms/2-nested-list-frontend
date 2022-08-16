import React, {useContext} from 'react';
import {Box, Typography} from "@mui/material";
import {CustomContext} from "../Context";

const Home = () => {

    const {auth} = useContext(CustomContext)

    return (
        <Box display="flex" justifyContent="center">
            <Typography component="h1" variant="h3">
                Welcome! {auth?.name}
            </Typography>
        </Box>

    )
};

export default Home;