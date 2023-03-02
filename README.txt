To intialize webserver mysql database, run database/scripts/initialize_database.sql
All major settings are in shared/settings.json
To run the frontend & backend as a dev-server run: ```make start```or run ```./start.sh``` directly
To turn on nodejs debugging run make debug

Dependencies:
	If you want to use the start.sh script you need bash
	Mysql/Mariadb
	Node.js

Todo:
	1. Add CSS :hover animations
	2. Sanitise SQL input as to prevent Injection attacks
	3. Clean up pages (they are fragmented)
	4. Port to https
 
Notes:
	Currently querying is done on the frontend
	I decided to use XHR requests for learning purposes

Features to be added: 
	Editing of notes
	Reviewing/Comments of notes
	Profile pictures

To run:
	download mentioned dependencies
	fill in neccessary passwords, jwt salt etc in share/settings-skeleton.json and move to share/settings.json
	run make install
	then run make start
