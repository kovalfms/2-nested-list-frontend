import React, {useContext, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {LockOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {CustomContext} from "../../../Context";


const Register = () => {
    const {registerUser} = useContext(CustomContext)
    const [showPass, setShowPass] = useState(false)
    const {handleSubmit, control} = useForm();


    const handleClickShowPass = () => {
        setShowPass(showPass => !showPass)
    }

    return (
        <Container maxWidth="sm">
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                sx={{minHeight: "100vh"}}
            >
                <Grid item xs={12} sm={8} md={5}>
                    <Paper elevation={6} sx={{
                        padding: 10, display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Avatar>
                            <LockOutlined/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <form onSubmit={handleSubmit(registerUser)}>
                            <Controller
                                control={control}
                                name="name"
                                render={({field}) => (
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Name"
                                        placeholder="Enter Your name"
                                        autoComplete="name"
                                        autoFocus
                                        onChange={(e) => field.onChange(e)}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="email"
                                render={({field}) => (
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        placeholder="Enter Your email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={(e) => field.onChange(e)}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="password"
                                render={({field}) => (
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        placeholder="Enter Your password"
                                        label="Password"
                                        type={showPass ? "text" : "password"}
                                        id="password"
                                        autoComplete="current-password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        edge="end"
                                                        onClick={handleClickShowPass}
                                                    >
                                                        {showPass ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={(e) => field.onChange(e)}
                                    />
                                )}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Box display="flex">
                            <Typography component="p" variant="p">
                                Do you already have an account?
                            </Typography>
                            <Typography component="p" variant="p">
                                <Link to="/login"> Login</Link>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;