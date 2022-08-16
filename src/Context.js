import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const CustomContext = createContext()


export const Context = ({children}) => {
    const [auth, setAuth] = useState('')
    console.log(auth)
    const navigate = useNavigate()

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem('user_login')))
    }, [])

    //


    const registerUser = async (data) => {
        try {
            await axios.post(' http://localhost:4000/register', {...data, notesList: []})
                .then(res => res.data)
            navigate('/login')

        } catch (error) {
            console.log(error)
        }
    }

    const loginUser = async (data) => {
        try {
            await axios.post(' http://localhost:4000/login', data)
                .then(res => {
                        setAuth(res.data)
                        localStorage.setItem('user_login', JSON.stringify(res.data))
                    }
                )

            navigate('/dashboard')

        } catch (error) {
            console.log(error)
        }
    }

    const logOutUser = () => {
        localStorage.removeItem("user_login")
        setAuth('')
    }

    const value = {
        auth,
        setAuth,
        registerUser,
        loginUser,
        logOutUser
    }

    return <CustomContext.Provider value={value}>
        {children}
    </CustomContext.Provider>
}
