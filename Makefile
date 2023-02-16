1: run


run:	
	./script.sh

debug:
	cd frontend; npm run start-dev-server &
	$(MAKE) -C backend debug
	killall webpack
	
