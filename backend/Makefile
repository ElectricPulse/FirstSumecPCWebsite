1: 
	$(MAKE) compile
	$(MAKE) run
	$(MAKE) autoreload

FRONTEND_DIR = ../frontend
FRONTEND_OUT = $(FRONTEND_DIR)/dist
FRONTEND_SRC = $(FRONTEND_DIR)/src

autoreload:
	while 1; do \
		$(MAKE) compile; \
		sleep 0.1; \
	done; &

run: 
	node app.js &

compile: $(FRONTEND_SRC)
	echo Compiling
	cd $(FRONTEND_DIR); \
	npm run compile
