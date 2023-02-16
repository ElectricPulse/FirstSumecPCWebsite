FRONTEND_DIR = ../frontend
FRONTEND_OUT = $(FRONTEND_DIR)/dist
FRONTEND_SRC = $(FRONTEND_DIR)/src

1: | kill compile run compile_change

.PHONY: $(FRONTEND_OUT)/livereload.js

$(FRONTEND_OUT)/livereload.js:
	cp ./livereload.js $(FRONTEND_OUT)
	sed '/<head>/a<script src="livereload.js"></script>' -i $(FRONTEND_OUT)/index.html

compile:
	$(MAKE) compile_pages
	$(MAKE) $(FRONTEND_OUT)/livereload.js


define directory_size
du -sc $1 | grep -Po '\d+\t(?=total)'
endef

compile_change:
	size=`$(call directory_size, $(FRONTEND_OUT))`; \
	echo $$size > log
	while true; do \
		size=`$(call directory_size, $(FRONTEND_OUT))`; \
		if [ $$size != `cat log` ]; then \
			echo $$size > log; \
			kill -s USR2 `pgrep -f websocket.js | head -n1`; \
		fi; \
		$(MAKE) compile >/dev/null;  \
		sleep 0.1; \
	done

kill:
	killall -q node; :

run: 
	node app.js &
	node websocket.js & 

compile_pages: $(FRONTEND_SRC)
	echo Compiling
	cd $(FRONTEND_DIR); \
	npm run compile &
