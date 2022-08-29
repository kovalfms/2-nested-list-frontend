import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {baseStorage} from "./index";
import {config} from "./index";


export default function useApi() {
    const [auth, setAuth] = useState('')
    const [data, setData] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        setAuth(baseStorage.getItem('user_login'))
    }, [])

    useEffect(() => {
        auth && fetchNotes().then(data => setData(data))
    }, [auth])

    const fetchNotes = async () => {
        try {
            const {data} = await axios.get(`users/${auth?.user.id}`, config(auth?.accessToken))
            return data.notes
        } catch (e) {
            console.log(e)
        }
    }

    const updateStorage = async (data) => {
        try {
            if (auth && auth.user && auth.id) {
                await axios.patch(`users/${auth?.user?.id}`, {notes: data}, config(auth?.accessToken))
                baseStorage.setItem('notes', data)
            }
        } catch (e) {
            console.log("PATCH ERROR", e)
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
                   baseStorage.setItem('user_login', res.data)
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

  return  {
        auth,
        setAuth,
        data,
        registerUser,
        loginUser,
        logOutUser,
        fetchNotes,
        updateStorage
    }
}




