import {useContext, useState} from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {ArrowDownward, ArrowUpward, Delete, NoteAdd} from "@mui/icons-material";
import {v4 as uniqId} from "uuid";
import {CustomContext} from "../Context";
import Form from "./Form";
import axios from "axios";

const NotesList = () => {
    const {auth, setAuth} = useContext(CustomContext)
    const [notes, setNotes] = useState(auth.notesList)
    console.log(notes)

    const addNewItem =  (text) => {
        const newItem = {
            id: uniqId(),
            text,
        }
        try {
            // await axios.post(`http://localhost:4000/users/${auth.id}`, newItem)
            setNotes(prevState => [...prevState, newItem])
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <List
            sx={{width: '100%', maxWidth: 800, bgcolor: 'yellow'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
                </ListSubheader>
            }
        >
            {notes.map((item) => (
                <ListItem key={item.id} sx={{display: "flex", justifyContent: "space-between"}}>
                    <ListItemText primary={item.text}/>
                    <ListItemButton sx={{width: "50px"}}>
                        <ListItemIcon>
                            <Delete/>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton sx={{width: "50px", alignItems: "center"}}>
                        <ListItemIcon>
                            <NoteAdd/>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton sx={{width: "50px"}}>
                        <ListItemIcon>
                            <ArrowUpward/>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton sx={{width: "50px", height: 50}}>
                        <ListItemIcon>
                            <ArrowDownward/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            ))}
            <Form addNewItem={addNewItem}/>
        </List>
    );
}

export default NotesList;