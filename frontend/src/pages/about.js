import React from 'react'
import Content from '/components/Content'
import Gamca from '/images/gamca.jpg'
import './about.css'
import './common.css'

const about = () => {
	return (
		<Content name="about">
			<h1>
				Kto sme?
			</h1>
			<p>
				Sme koalícia nespokojných študentov z Gymnázia Gamča, ktorí sa rozhodli vytvoriť vlastnú databázu poznámok z predmetov, kedy je lepšie dávať pozor na hodine a nie písať si poznámky. Keby ste chceli pomocť so stránkov napíšte mi na: adam.labuznik@gmail.com 
			</p>
			<img src={Gamca}/>
		</Content>
	)	
}

export default about
