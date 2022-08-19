import Login from "./components/auth/SignIn/Login";
import {Route, Routes} from "react-router-dom";
import Register from "./components/auth/SignUp/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home";
import Header from "./components/Header/Header";
import React from "react";


function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </>
    );
}

export default App;
