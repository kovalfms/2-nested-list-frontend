import React, {useContext} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {CustomContext} from "../../Context";
import NotesList from "../NotesList/NotesList";

const Dashboard = () => {
    const {auth} = useContext(CustomContext)

    return (
        <Container>
            <Grid container>
                <Grid  item xs={2}>
                    <Typography variant="h5">
                        Hello {auth.user?.name}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <NotesList/>
                </Grid>
            </Grid>

        </Container>
    );
};

export default Dashboard;