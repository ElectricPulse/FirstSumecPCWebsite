import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

function Dropdown() {
	const state = useSelector((state) => state)	
	console.log(state.user)
	return (
		<div className={styles.accountDropdown}>
			{!state.token && <>
				<Link to="/register">Registrovať</Link>
				<Link to="/login">Prihlásiť</Link>
			</>}
			{state.token && <>
				Welcome aboard captain:
				<div>
					<h4>{state.user.username}</h4>
					<h5>{state.user.email}</h5>
				</div>
				<Link to="/unlogin">Odhlásiť</Link>
			</>}
		</div>
	)
}

function main(){
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
					<Dropdown/>					
				</div>
				</div>
				<Link to="/" className={styles.logo}>
					<img src="/api/images/sumec.png"/>
				</Link>


				</nav>
				</header>
	)
}

export default main
