import React, {useState} from 'react';
import {Button, Grid, Paper, TextField} from "@mui/material";

const Form = ({addNewItem}) => {

    const [inputText, setInputText] = useState('')

    const checkInput = () => {
        if (inputText === '') {
            return
        }
        addNewItem(inputText)
        setInputText("");
    };

    return (
        <Paper elevation={2} sx={{ margin: "16px", padding: "16px", width: "800px" }}>
            <Grid container
                  flex
                  justifyContent="space-between"
                  alignItems="center"
            >
                <Grid xs={12} md={10} item sx={{ paddingRight: "16px"}}>
                    <TextField
                        placeholder="Add Todo here"
                        value={inputText}
                        fullWidth
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </Grid>
                <Grid xs={2} md={2} item>
                    <Button
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        onClick={checkInput}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Form;