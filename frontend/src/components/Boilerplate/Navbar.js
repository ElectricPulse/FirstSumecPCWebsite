import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useSelector } from '/store.js'

import Image from '/components/Image'

function Dropdown() {
	const state = useSelector(s => s)
	return (
		<div className={styles.accountDropdown}>
			{!state.token && <>
				<Link to="/register">Registrovať</Link>
				<Link to="/login">Prihlásiť</Link>
			</>
			}
			{state.token && <>
				Welcome aboard captain:
				<div>
					<h4>{state.user.username}</h4>
					<h5>{state.user.email}</h5>
				</div>
				<hr className={styles.ruler}/>
				<Link to="/account">Konto</Link>
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
					<Image name="accountIcon.svg"/>
				</button>

				<div className={styles.accountDropdownContainer}>
					<Image className={styles.triangle} name="triangle.svg"/>		
					<Dropdown/>					
				</div>
				</div>
				<Link to="/" className={styles.logo}>
					<Image name="sumec.png"/>
				</Link>


				</nav>
		</header>
	)
}

export default main
