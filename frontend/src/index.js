import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import { createStore, useDispatch } from '/store.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from '/pages/index';
import About from '/pages/about';
import Note from '/pages/note';
import Error from '/pages/error';
import Register from '/pages/register';
import AuthMail from '/pages/authMail';
import Login from '/pages/login';
import Unlogin from '/pages/unlogin';

import settings from '@shared/settings.json'
import eruda from 'eruda'

if(settings.eruda) 
	eruda.init()

//Initialize custom state managment system
createStore()

const App = () => {
	const [token, setToken] = useState("")
	const dispatch = useDispatch()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if(token)
			dispatch("SET_TOKEN", token)
	})
	
	return (
	<BrowserRouter>
	<Routes>
		<Route path="/">
			<Route index element={<Index/>}/>
			<Route path="about" element={<About/>}/>
			<Route path="register" element={<Register/>}/>
			<Route path="login" element={<Login/>}/>
			<Route path="note/:id" element={<Note/>}/>
			<Route path="authMail/:token" element={<AuthMail/>}/>
			<Route path="unlogin" element={<Unlogin/>}/>
			<Route path="*" element={<Error/>}/>
		</Route>
	</Routes>
	</BrowserRouter>
	)
}
const root = createRoot(document.getElementById('app'));
root.render(<App/>)
