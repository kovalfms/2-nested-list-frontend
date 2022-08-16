import {useContext, useEffect, useState} from "react";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {ArrowDownward, ArrowUpward, Delete, NoteAdd} from "@mui/icons-material";
import {v4 as uniqId} from "uuid";
import {CustomContext} from "../Context";
import Form from "./Form";
import axios from "axios";

const NotesList = () => {
    const {auth, setAuth} = useContext(CustomContext)
    const [notes, setNotes] = useState([])

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const {data} = await axios.get(`http://localhost:4000/users/${auth.user?.id}/posts`)
                setNotes(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchNotes()
    }, [auth])

    const config = {
        headers: {Authorization: `Bearer ${auth.accessToken}`}
    };

    // const fetchNotes = async () => {
    //     try {
    //         await axios.get(`http://localhost:4000/users/${auth.user.id}/posts`)
    //             .then(res => setNotes(res.data))
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // fetchNotes();

    const addNewItem = async (text) => {
        const newItem = {
            userId: auth.user.id,
            id: uniqId(),
            text,
        }
        try {
            await axios.post(`http://localhost:4000/600/users/${auth.user.id}/posts`, newItem, config)
                .then(res => setNotes(prevState => [...prevState, newItem]))
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <List
            sx={{width: '100%', maxWidth: 800}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
                </ListSubheader>
            }
        >
            {notes?.map((item) => (
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