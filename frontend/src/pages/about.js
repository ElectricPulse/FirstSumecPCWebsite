import React from 'react'
import Content from '/components/Boilerplate/Content'
import Image from '/components/Image'
import styles from './about.module.css'
import './common.css'


function main() {
	return (
		<Content>
			<section className={styles.about}>
			<h1>
				Kto sme?
			</h1>
			<p>
				Sme študenti z Gymnázia Gamča, ktorí sa rozhodli vytvoriť vlastnú databázu poznámok z predmetov, pri ktorích je lepšie dávať pozor na hodine a nie písať si poznámky. Keby ste chceli pomocť so stránkov napíšte mi na: adam.labuznik@gmail.com 
			</p>
			<Image name="gamca.jpg"/>
			</section>
		</Content>
	)	
}

export default main
