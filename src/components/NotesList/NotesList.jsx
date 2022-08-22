import React, {useContext, useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {CustomContext} from "../../Context";
import Form from "../MainForm/Form";
import NotesListItem from "../NotesItem/NotesListItem";
import {v4 as uniqId} from "uuid";
import api from "../../server/api";
import {config} from "../../Context";


const NotesList = ({data, onUpdate, parentData, parentId}) => {
    const {auth} = useContext(CustomContext)
    const [notes, setNotes] = useState(data)

    useEffect(() => {
        if (parentData && parentId) {
            const parentNote = parentData
                .map(note => note.id === parentId ? ({...note, sublist: notes}) : note)
            return onUpdate(parentNote)
        }
        return onUpdate(notes)
    }, [notes])

    const addNewItem = async (text) => {
        const newItem = {
            id: uniqId(),
            text
        }
        try {
            await api.patch(`users/${auth.user?.id}`, {notes: [newItem, ...notes]}, config(auth?.accessToken))
            setNotes(prevState => [newItem, ...prevState])
        } catch (e) {
            console.log(e)
        }
    }

    const editItem = async (text, id) => {
        const list = [...notes]
        const findIndex = list.findIndex((item) => item.id === id);
        const editNote = {
            ...list[findIndex],
            text: text
        }
        list[findIndex] = editNote
        try {
            await api.patch(`users/${auth.user.id}`, {notes: list}, config(auth?.accessToken))
            setNotes(list)
        } catch (e) {
            console.log(e)
        }
        console.log("EDITED NOTE  ", editNote)
        console.log("NOTES", notes)
    }

    const addSubList = async (id) => {
        const list = [...notes]
        const findIndex = list.findIndex((item) => item.id === id);
        list[findIndex].sublist = []
        try {
            await api.patch(`users/${auth.user.id}`, {notes: list}, config(auth?.accessToken))
            setNotes(prevState => [...prevState])
        } catch (e) {
            console.log(e)
        }
    }

    const deleteSublist = async (id) => {
        const list = [...notes]
        const findIndex = list.findIndex((item) => item.id === id);
        delete list[findIndex].sublist
        try {
            await api.patch(`users/${auth.user.id}`,
                {
                    notes: list
                }, config(auth?.accessToken))
            setNotes(prevState => [...prevState])
        } catch (e) {
            console.log(e)
        }
    }

    const deleteItem = async (id) => {
        const deleteNote = [...notes].filter(item => item.id !== id)
        console.log(deleteNote)
        try {
            await api.patch(`users/${auth.user.id}`, {notes: deleteNote}, config(auth?.accessToken))
            setNotes(prevState => prevState.filter(item => item.id !== id))

        } catch (e) {
            console.log(e)
        }
    }

    const upOrDownItem = async (id, item, delta) => {
        const newPosition = [...notes];
        const currentIndex = newPosition.indexOf(item);
        // Remove from the array
        newPosition.splice(currentIndex, 1);
        // put it back in at the new position
        newPosition.splice(currentIndex + delta, 0, item);

        try {
            await api.patch(`users/${auth.user.id}`, {notes: newPosition}, config(auth?.accessToken))
            const {data} = await api.get(`users/${auth.user.id}`, config)
            setNotes(data.notes)
        } catch (e) {
            console.log(e)
        }
        setNotes(newPosition)
        console.log(newPosition, ` new position`)
        console.log(currentIndex, ` current index`)
    }


    return (
        <Grid
            container
            flex
            justifyContent="flex-start"
            flexDirection="column"
        >
            <Form addNewItem={addNewItem}/>
            {notes.map((item, index) =>
                <Grid
                    paddingTop="10px"
                    item
                    key={item.id}>
                    <NotesListItem
                        item={item}
                        index={index}
                        listLength={notes.length}
                        notes={notes}
                        setNotes={setNotes}
                        addNewItem={addNewItem}
                        editItem={editItem}
                        addSubList={addSubList}
                        deleteSublist={deleteSublist}
                        deleteItem={deleteItem}
                        upOrDownItem={upOrDownItem}

                    />
                </Grid>
            )}
        </Grid>
    )
}
export default NotesList;