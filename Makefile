1: run


run:
	trap '' INT; \
	$(MAKE) -C backend run & 1>&1 ;\
	backend_pid=$$!;\
	$(MAKE) -C frontend run & 1>&1 ;\
     	frontend_pid=$$!;\
	while true; do\
		read -N 1; \
		if [ "$$REPLY" == 'q' ]; then \
			kill -s INT $$frontend_pid; \
			kill -s INT $$backend_pid; \
			break; \
		fi; \
	done & ;\
	echo $$frontend_pid > pid;\
	
	
#tee /dev/$$frontend_pid /dev/$$backend_pid
