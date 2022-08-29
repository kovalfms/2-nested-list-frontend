import React from 'react';
import {Grid, Typography} from "@mui/material";
import useApi from "../../utils/Context";
import NotesList from "../NotesList/NotesList";


const Dashboard = () => {
    const {auth,data, updateStorage} = useApi()

    return (
        <>
            <Typography variant="h5">
                Hello {auth?.user?.name}
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
                <NotesList data={data} onUpdate={updateStorage}/>
            </Grid>
        </>


    );
};

export default Dashboard;