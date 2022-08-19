import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "./server/api";
import {v4 as uniqId} from "uuid";

export const CustomContext = createContext()

export const Context = ({children}) => {
    const [auth, setAuth] = useState('')
    const [notes, setNotes] = useState([])

    const config = {
        headers: {Authorization: `Bearer ${auth?.accessToken}`}
    };

    const navigate = useNavigate()

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem('user_login')))
    }, [])

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const {data} = await api.get(`users/${auth?.user?.id}/posts`, config)
                setNotes(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchNotes()
    }, [auth])

    const addNewItem = async (text) => {
        const newItem = {
            id: uniqId(),
            text,
            userId: auth.user.id
        }
        try {
            await api.post(`posts`, newItem, config)
            await api.get(`posts`, config)
            setNotes([...notes, newItem])
        } catch (e) {
            console.log(e)
        }
    }

    const editItem = async (text, id) => {
        const findNote = notes.find(item => item.id === id)
        const editNote = {
            ...findNote,
            text: text
        }

        try {
            await api.put(`posts/${id}`, editNote, config)
            const {data} = await api.get(`users/${auth.user?.id}/posts`, config)
            setNotes(data)
        } catch (e) {
            console.log(e)
        }
        console.log("FIND NOTE  ", findNote)
        console.log("EDITED NOTE  ", editNote)
        console.log("NOTES", notes)
    }

    const addSubList = async (id) => {
        const findNote = notes.find((item) => item.id === id);
        findNote.sublist = []
        try {
            await api.put(`posts/${id}`, findNote, config)
            setNotes(prevState => [...prevState])
        } catch (e) {
            console.log(e)
        }
    }

    const deleteSublist = async (id) => {
        const findNote = notes.find((item) => item.id === id);
        delete findNote.sublist
        try {
            await api.put(`posts/${id}`, findNote, config)
            setNotes(prevState => [...prevState])
        } catch (e) {
            console.log(e)
        }
    }

    const deleteItem = async (id) => {
        try {
            await api.delete(`posts/${id}`, config)
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
            await api.put(`600/users/${auth.user?.id}/posts`, newPosition, config)
            const {data} = await api.get(`posts`, config)
            setNotes(data)
        } catch (e) {
            console.log(e)
        }
        setNotes(newPosition)
        console.log(newPosition, ` new position`)
        console.log(currentIndex, ` current index`)
    }

    const registerUser = async (data) => {
        try {
            await api.post('/register', data)
                .then(res => res.data)
            navigate('/login')

        } catch (e) {
            console.log(e)
        }
    }

    const loginUser = async (data) => {
        try {
            await api.post('/login', data)
                .then(res => {
                    setAuth(res.data)
                    localStorage.setItem('user_login', JSON.stringify(res.data))
                })

            navigate('/dashboard')

        } catch (e) {
            console.log(e)
        }
    }

    const logOutUser = () => {
        localStorage.removeItem("user_login")
        setAuth('')
    }

    const value = {
        auth,
        setAuth,
        notes,
        setNotes,
        registerUser,
        loginUser,
        logOutUser,
        addSubList,
        deleteItem,
        deleteSublist,
        upOrDownItem,
        editItem,
        addNewItem
    }

    return (
        <CustomContext.Provider value={value}>
            {children}
        </CustomContext.Provider>)
}




