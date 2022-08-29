import React, {useCallback, useContext} from 'react';
import {Grid, Typography} from "@mui/material";
import {CustomContext} from "../../Context";
import NotesList from "../NotesList/NotesList";
import {baseStorage} from "../../utils";


const Dashboard = () => {
    const {auth} = useContext(CustomContext)

    const updateStorage = useCallback(data => {
        baseStorage.setItem('notes', data)
    }, [])

    return (
        <>
            <Typography variant="h5">
                Hello {auth?.user?.name}
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
                <NotesList data={baseStorage.getItem('notes') || []} onUpdate={updateStorage}/>
            </Grid>
        </>


    );
};

export default Dashboard;