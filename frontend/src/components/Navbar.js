import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
	return (
		<header className="header">
			<nav className="navigation">
				<Link to="/about">O nás</Link>
				<Link to="/">Poznámky</Link>
			</nav>
			<div className="logo">
				<img src="/api/images/sumec.png"/>
			</div>
		</header>
	)
}

export default Navbar
