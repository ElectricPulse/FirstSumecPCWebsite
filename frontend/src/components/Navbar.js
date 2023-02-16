import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/images/sumec.png'
import './Navbar.css'

const Navbar = () => {
	return (
		<header className="header">
			<nav className="navigation">
				<Link to="/about">O nás</Link>
				<Link to="/">Poznámky</Link>
			</nav>
			<div className="logo">
				<img src={logo}/>
			</div>
		</header>
	)
}

export default Navbar
