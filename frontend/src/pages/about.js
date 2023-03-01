import React from 'react'
import Content from '/components/Boilerplate/Content'
import styles from './about.module.css'
import './common.css'

const about = () => {
	return (
		<Content name={styles.about}>
			<h1>
				Kto sme?
			</h1>
			<p>
				Sme koalícia nespokojných študentov z Gymnázia Gamča :>, ktorí sa rozhodli vytvoriť vlastnú databázu poznámok z predmetov, pri ktorích je lepšie dávať pozor na hodine a nie písať si poznámky. Keby ste chceli pomocť so stránkov napíšte mi na: adam.labuznik@gmail.com 
			</p>
			<img src="/api/images/gamca.jpg"/>
		</Content>
	)	
}

export default about
