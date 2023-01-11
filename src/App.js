import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./page/ErrorPage/ErrorPage";
import Home from "./page/Home/Home";
import Lobby from "./page/Lobby/Lobby";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Room from "./page/Room/Room";
import React, {useState, useEffect} from 'react';
import "./App.css";
import { Get } from "./axios/Axios";
import e from "cors";

export default function App() {
    const [users, setUsers] = useState([]);
    useEffect(()=> {
		Get("http://localhost:8080/users")
		.then((res)=>{
			setUsers(res.data);
		})
		.catch((err)=>console.log(err.response));
	}, []);
    if (localStorage.getItem("username")!=undefined)
        return (
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<Home/>}/>
                    <Route path = "/lobby" element = {<Lobby users={users}/>}/>
                    <Route path = "/login" element = {<Login/>}/>
                    <Route path = "/register" element = {<Register/>}/>
                    <Route path = "/room" element = {<Room users={users}/>}/>
                    <Route path = "/*" element = {<ErrorPage/>}/>
                </Routes>
            </BrowserRouter>
        );
    else 
    {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<Login/>}/>
                    <Route path = "/login" element = {<Login/>}/>
                    <Route path = "/register" element = {<Register/>}/>
                    <Route path = "/*" element = {<ErrorPage/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
 }

