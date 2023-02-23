import { createRoot } from 'react-dom/client';
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from '/pages/index.js';
import About from '/pages/about.js';
import Note from '/pages/note.js';
import Error from '/pages/error.js';

import eruda from 'eruda'
eruda.init()

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Index/>}/>
					<Route path="about" element={<About/>}/>
					<Route path="note/:id" element={<Note/>}/>
					<Route path="*" element={<Error/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
const root = createRoot(document.getElementById('app'));
root.render(<App/>)
