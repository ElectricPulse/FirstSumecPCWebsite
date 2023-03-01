To intialize webserver mysql database, run database/scripts/initialize_database.sql
All major settings are in shared/settings.json
To run the frontend & backend as a dev-server run: ```make start-dev-server```or run ```./start.sh``` directly

Dependencies:
	If you want to use the start.sh script you need bash
	Mysql 
	Node

Todo:
	1. Refactor the ugly hacks in Register.js 
	1.5 Replace name={} with ClassName in <Content/> for example
	2. Compartmentlize big JS files (mainly forms)
	3. Unify styling
	4. Add CSS :hover animations
	5. Sanitise SQL input as to prevent Injection attacks
	6. Convert all fetches to XHR
	7. Add .this to all XHR requests
 
Notes:
	Currently querying is done on the frontend
	I decided to use XHR requests for learning purposes
