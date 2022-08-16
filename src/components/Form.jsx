import React, {useState} from 'react';
import {Button, Input, ListItem} from "@mui/material";

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
        <ListItem sx={{display: "flex"}}>
                <Input
                    fullWidth
                    placeholder="add notes"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <Button
                    sx={{marginLeft: 20}}
                    variant="outlined"
                    onClick={checkInput}
                >
                    Add
                </Button>
        </ListItem>
    );
};

export default Form;