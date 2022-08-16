import React, {useContext} from 'react';
import {Box, Typography} from "@mui/material";
import {CustomContext} from "../Context";
import NotesList from "./NotesList";

const Dashboard = () => {
    const {auth} = useContext(CustomContext)
    return (
        <Box>
            <Typography component="h1" variant="h3">
                    Hello {auth.user?.name}
                </Typography>
            <Typography component="h2" variant="h5">
                <NotesList/>
            </Typography>
        </Box>
    );
};

export default Dashboard;