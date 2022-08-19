import React, {useContext, useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import {CustomContext} from "../../Context";

const Form = () => {

    const {addNewItem} = useContext(CustomContext)

    const [inputText, setInputText] = useState('')

    const checkInput = () => {
        if (inputText === '') {
            return
        }
        addNewItem(inputText)
        setInputText("");
    };

    return (
            <Grid container
                  flex
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ margin: "16px", padding: "16px", width: "320px"}}
            >
                <Grid xs={12} md={10} item sx={{ paddingRight: "16px"}}>
                    <TextField
                        variant="standard"
                        placeholder="Add Todo here"
                        value={inputText}
                        fullWidth
                        size="small"
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </Grid>
                <Grid xs={2} md={2} item  >
                    <Button
                        sx={{ paddingRight: "16px"}}
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        onClick={checkInput}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
    );
};

export default Form;