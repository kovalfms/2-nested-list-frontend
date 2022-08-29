import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {baseStorage} from "./utils/";
import {config} from "./utils";


export const CustomContext = createContext()


export const Context = ({children}) => {
    const [auth, setAuth] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem('user_login')))
    }, [])

    useEffect(() => {
        fetchNotes()
    }, [auth])

    const fetchNotes = async () => {
        try {
            const {data} = await axios.get(`users/${auth?.user.id}`, config(auth?.accessToken))
            baseStorage.setItem('notes', data.notes)
        } catch (e) {
            console.log(e)
        }
    }


    const registerUser = async (data) => {
        try {
            await axios.post('/register', {...data, notes: []})
                .then(res => res.data)
            navigate('/login')

        } catch (e) {
            console.log(e)
        }
    }

    const loginUser = async (data) => {
        try {
            await axios.post('/login', data)
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
        localStorage.removeItem("notes")
        setAuth('')
    }

    const value = {
        auth,
        setAuth,
        registerUser,
        loginUser,
        logOutUser,
        fetchNotes
    }

    return (
        <CustomContext.Provider value={value}>
            {children}
        </CustomContext.Provider>)
}




