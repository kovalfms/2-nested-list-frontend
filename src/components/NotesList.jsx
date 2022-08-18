import {useCallback, useContext, useEffect, useState} from "react";
import {Container, Grid} from "@mui/material";
import {v4 as uniqId} from "uuid";
import {CustomContext} from "../Context";
import Form from "./Form";
import api from "../server/api"
import NotesListItem from "./NotesListItem";
import axios from "axios";

const NotesList = () => {
    const {auth} = useContext(CustomContext)
    const [notes, setNotes] = useState([])

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const {data} = await api.get(`users/${auth.user?.id}/posts`, config)
                setNotes(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchNotes()
    }, [auth, setNotes])

    const config = {
        headers: {Authorization: `Bearer ${auth.accessToken}`}
    };

    const addNewItem = async (text) => {
        const newItem = {
            id: uniqId(),
            text,
        }
        try {
            await api.post(`600/users/${auth.user.id}/posts`, newItem, config)
            // const response = await api.patch(`users/${auth.user.id}`, {list: [...auth.user.list, newItem]}, config)
            setNotes([...notes, newItem])
        } catch (e) {
            console.log(e)
        }
    }

    const editItem = async (text, id) => {
        const list = [...notes]
        const editNote = list.map(item => item.id === id ? {...item, text: text}: item)

        try{
            await api.patch(`posts/${id}`, {}, config)
            setNotes(editNote)

        }catch (e) {
            console.log(e)
        }
        console.log(text, id)
    }

    const addSubList = useCallback((itemId) => {
        const list = [...notes]
        const findId = list.findIndex(({id}) => id === itemId);
        list[findId].sublist = []
        setNotes(prevState => [...prevState])
    }, [notes])

    const deleteSublist = useCallback((itemId) => {
        const list = [...notes]
        const findId = list.findIndex(({id}) => id === itemId);
        delete list[findId].sublist
        setNotes(prevState => [...prevState])
    }, [notes])


    const deleteItem = useCallback(async (id) => {
        try {
            await api.delete(`posts/${id}`, config)
            setNotes(prevState => prevState.filter(item => item.id !== id)
            )

        } catch (e) {
            console.log(e)
        }
    }, [notes])

    const upOrDownItem = useCallback(async (item, delta) => {
        const newPosition = [...notes];
        const currentIndex = newPosition.indexOf(item);
        // Remove from the array
        newPosition.splice(currentIndex, 1);
        // put it back in at the new position
        newPosition.splice(currentIndex + delta, 0, item);
        try {
            await api.put(`/posts`, newPosition, config)
            setNotes(newPosition)
        } catch (e) {
            console.log(e)
        }
        setNotes(newPosition)
    }, [notes])

    return (
        <Container>
            <Grid
                container
                flex
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
            >
                <Grid item>
                    <Form addNewItem={addNewItem}/>
                </Grid>
                {notes.map((item, index) =>
                    <Grid
                        width="800px"
                        paddingTop="16px"
                        item
                        key={item.id}>
                        <NotesListItem
                            item={item}
                            index={index}
                            listLength={notes.length}
                            notes={notes}
                            deleteItem={deleteItem}
                            upOrDownItem={upOrDownItem}
                            setNotes={setNotes}
                            addSubList={addSubList}
                            deleteSubList={deleteSublist}
                            editItem={editItem}
                        />
                    </Grid>
                )}
            </Grid>
        </Container>

    )
}
export default NotesList;