import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { createStore, useDispatch } from '/store.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from '/pages/index';
import About from '/pages/about';
import Error from '/pages/error';
import Note from '/pages/note';
import Register from '/pages/register';
import AuthMail from '/pages/authMail';
import Login from '/pages/login';
import ResetPasswordMail from '/pages/resetPasswordMail'
import ResetPassword from '/pages/resetPassword'
import User from '/pages/user'
import Unlogin from '/pages/unlogin';

import settings from '@shared/settings.json'
import eruda from 'eruda'

if(settings.eruda) 
	eruda.init()

//Initialize custom state managment system
createStore()

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if(token)
			dispatch("SET_TOKEN", token)
	}, [])


	return (
	<BrowserRouter>
	<Routes>
		<Route path="/">
			<Route index element={<Index/>}/>
			<Route path="about" element={<About/>}/>
			<Route path="register" element={<Register/>}/>
			<Route path="login" element={<Login/>}/>
			<Route path="account" element={<User/>}/>
			<Route path="resetPasswordMail" element={<ResetPasswordMail/>}/>
			<Route path="note/:id" element={<Note/>}/>
			<Route path="resetPassword/:token" element={<ResetPassword/>}/>
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
