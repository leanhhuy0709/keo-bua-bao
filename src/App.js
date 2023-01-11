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
import ReadIPServer from "./page/ReadIPServer/ReadIPServer";

export default function App() {
    const [users, setUsers] = useState([]);
    useEffect(()=> {
		Get(`https://${localStorage.getItem("ip_server")}:8080/users`)
		.then((res)=>{
			setUsers(res.data);
		})
		.catch((err)=>console.log(err));
	}, []);
    if (localStorage.getItem("ip_server")==undefined)
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<ReadIPServer/>}/>
                <Route path = "/*" element = {<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );

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
                    <Route path = "/ipserver" element = {<ReadIPServer/>}/>
                    <Route path = "/*" element = {<ErrorPage/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
 }

