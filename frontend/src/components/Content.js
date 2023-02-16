import Navbar from './Navbar'
import Footer from './Footer'
import React from 'react'
import './Content.css'

const Content = (props) => {
	return (
		<>
			<Navbar/>
			<div className={"content " + props.name}>
			{props.children}
			</div>
			<Footer/>
		</>
	)
}

export default Content
