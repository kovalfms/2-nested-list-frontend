import React, {useContext, useState} from 'react';
import {
    Avatar, Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
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

const Login = () => {
    const [showPass, setShowPass] = useState(false)
    const {loginUser} = useContext(CustomContext)
    const {control, handleSubmit} = useForm({
            defaultValues: {
                remember: false,
            }
        }
    )

    const showPassword = () => {
        setShowPass(prev => !prev)
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
                            Sign in
                        </Typography>
                        <form onSubmit={handleSubmit(loginUser)}>
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
                            /><Controller
                            control={control}
                            name="password"
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
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
                                                    onClick={showPassword}
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
                            <FormControlLabel control={
                                <Controller
                                    control={control}
                                    render={({field}) => (
                                        <Checkbox
                                            onChange={(e) => field.onChange(e.target.checked)}
                                            checked={field.value}

                                        />
                                    )}
                                    label="Remember me"
                                    name="remember"
                                />
                            } label="Remember me"/>


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                        </form>
                        <Box display="flex" marginTop="10px">
                            <Typography component="p" variant="p">
                                You are not registered yet?
                            </Typography>
                            <Typography component="p" variant="p" marginLeft="10px">
                                <Link to="/register">
                                    Register
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    )
        ;
};

export default Login;