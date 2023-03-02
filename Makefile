start:	
	./start.sh

debug:
	./start.sh debug

compile:
	cd frontend; npm run compile

host:
	export HOST='YES'; cd backend; node routes.js

install:
	cd frontend; npm i
	cd backend; npm i
	cd database; npm i

	
