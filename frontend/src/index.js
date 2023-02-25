import { createRoot } from 'react-dom/client';
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from '/pages/index';
import About from '/pages/about';
import Note from '/pages/note';
import Error from '/pages/error';
import Register from '/pages/register';
import Login from '/pages/login';


import eruda from 'eruda'

if(_ERUDA) 
	eruda.init()


const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Index/>}/>
					<Route path="about" element={<About/>}/>
					<Route path="register" element={<Register/>}/>
					<Route path="login" element={<Login/>}/>
					<Route path="note/:id" element={<Note/>}/>
					<Route path="*" element={<Error/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
const root = createRoot(document.getElementById('app'));
root.render(<App/>)
