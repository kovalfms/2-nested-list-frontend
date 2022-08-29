import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";

import Form from "../MainForm/Form";
import NotesListItem from "../NotesItem/NotesListItem";
import {v4 as uniqId} from "uuid";



const NotesList = ({data, onUpdate, parentData, parentId}) => {

    const [notes, setNotes] = useState(data)

    useEffect(() => {
       data && setNotes(data)
        console.log(data)
    }, [data])

    useEffect(() => {
        if (parentData && parentId) {
            const parentNote = parentData
                .map(note => note.id === parentId ? ({...note, sublist: notes}) : note)
             onUpdate(parentNote)
        }
        // onUpdate(notes)
    }, [notes])

    const addNewItem = (text) => {
        const newItem = {
            id: uniqId(),
            text
        }
        setNotes(prevState => [...prevState, newItem])
    }

    const editItem = (text, id) => {
        const list = [...notes]
        const findIndex = list.findIndex((item) => item.id === id);
        list[findIndex] = {
            ...list[findIndex],
            text: text
        }
        setNotes(list)
    }

    const addSubList = (id, text) => {
        const list = [...notes]
        const findIndex = list.findIndex((item) => item.id === id);
        list[findIndex].sublist = []
        setNotes(prevState => [...prevState])
    }

    const deleteSublist = (id) => {
        const list = [...notes]
        const findIndex = list.findIndex((item) => item.id === id);
        delete list[findIndex].sublist
        setNotes(prevState => [...prevState])
    }

    const deleteItem = async (id) => {
        const deleteNote = notes.filter(item => item.id !== id)
        try {
            await onUpdate(deleteNote)
            setNotes(prevState => prevState.filter(item => item.id !== id))

        } catch (e) {
            console.log(e)
        }
    }

    const upOrDownItem = (id, item, delta) => {
        const newPosition = [...notes];
        const currentIndex = newPosition.indexOf(item);
        newPosition.splice(currentIndex, 1);
        newPosition.splice(currentIndex + delta, 0, item);
        setNotes(newPosition)
    }


    return (
        <Grid
            container
            flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="700px"
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