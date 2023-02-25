import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.navigationLeft}>
				<Link to="/about">O nás</Link>
				<Link to="/">Poznámky</Link>
			</nav>
			<nav className={styles.navigationRight}>
				<div className={styles.accountContainer}>
				<button className={styles.account}>
					<img src="/api/images/accountIcon.svg"/>
				</button>

				<div className={styles.accountDropdownContainer}>
					<img className={styles.triangle} src="/api/images/triangle.svg"/>		
					<div className={styles.accountDropdown}>
					<Link to="/register">Registrovať</Link>
					<Link to="/login">Prihlásiť</Link>
					</div>
				</div>
				</div>
				<Link to="/" className={styles.logo}>
					<img src="/api/images/sumec.png"/>
				</Link>


				</nav>
				</header>
	)
}

export default Navbar
