import React, {useContext} from 'react';
import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {SpeakerNotes} from "@mui/icons-material"
import {Link} from "react-router-dom";
import {CustomContext} from "../../Context";

const Header = () => {
    const {auth, logOutUser} = useContext(CustomContext)

    return (
        <Box flex justifyContent="space-between" sx={{flexGrow: 1,}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Link to='/' style={{textDecoration: "none"}}><SpeakerNotes
                            sx={{fontSize: 40, color: "white"}}/></Link>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Notes List
                    </Typography>
                    {auth
                        ? <>
                            <Link to="/dashboard">
                                <Avatar/>
                            </Link>
                            <Button
                                onClick={logOutUser}
                                color="inherit">
                                <Link to="/login" style={{textDecoration: "none", color: "white"}}>
                                    Logout
                                </Link>
                            </Button>
                        </>
                        : <Button color="inherit">
                            <Link to="/login" style={{textDecoration: "none", color: "white"}}>
                                Login
                            </Link>
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;