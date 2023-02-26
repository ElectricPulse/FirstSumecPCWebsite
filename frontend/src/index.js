import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from '/pages/index';
import About from '/pages/about';
import Note from '/pages/note';
import Error from '/pages/error';
import Register from '/pages/register';
import AuthMail from '/pages/authMail';
import Login from '/pages/login';
import Unlogin from '/pages/unlogin';

import store from './store.js'


import eruda from 'eruda'

if(_ERUDA) 
	eruda.init()

const App = () => {
	const dispatch = useDispatch()
	const store = useSelector(state => state)
	const [token, setToken] = useState("")

	useEffect(() => {
		const savedToken = localStorage.getItem("token")
		if(savedToken) {
			setToken(savedToken)
			dispatch({ type: "SET_TOKEN", value: savedToken})
		}
	}, [])

	useEffect(() => {
		if(!token)
			return
		const xhr = new XMLHttpRequest()
                xhr.open('GET', '/api/user', true)
                xhr.setRequestHeader('Authorization', store.token)
		xhr.onreadystatechange = function() {
			if(this.readyState === 4 && this.status == 200) {
				const data = JSON.parse(this.responseText)

				dispatch({ type: "SET_USER", value: data})			
			}
		}
		xhr.send()
	
	}, [token])
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
root.render(<Provider store={store}>
		<App/>
	</Provider>)
