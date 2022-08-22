import React, {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";


const Edit = ({item, openEdit, setOpenEdit, editItem}) => {
    const [inputText, setInputText] = useState(item.text)

    const checkInput = () => {
        if (inputText === '') {
            return
        }
        editItem(inputText, item.id)
        setInputText("");
        setOpenEdit(() => !openEdit)
    };
    return (
        <Grid container
              flex
              justifyContent="space-between"
              alignItems="center"
        >
            <Grid xs={12} md={10} item sx={{paddingRight: "16px"}}>
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
                    onClick={() => checkInput()}
                >
                    Edit
                </Button>
            </Grid>
        </Grid>

    );
};

export default Edit;