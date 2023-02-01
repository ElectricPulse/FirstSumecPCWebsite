OUT = out
SRC = src

1: 
	if [ -d $(OUT) ]; then \
		$(MAKE) clean; \
	else \
		mkdir $(OUT); \
	fi

	$(MAKE) copy_images
	$(MAKE) create_pages
	$(MAKE) expand_components
	$(MAKE) copy_htaccess

clean:
	for file in `ls -A $(OUT)`; do \
		rm -dr $(OUT)/$$file ; \
	done  

copy_htaccess:
	if [ -f $(SRC)/htaccess ]; then \
		cp $(SRC)/htaccess $(OUT)/.htaccess; \
	fi

copy_images: 
	if [ -d $(SRC)/images ] && [ ! -z "$$(ls -A $(SRC)/images)" ]; then \
		mkdir $(OUT)/images; \
		cp $(SRC)/images/* $(OUT)/images; \
	fi
		
create_pages: 
	for folder in $(SRC)/pages/*; do \
		if [ `find $$folder -name '*\.html' | wc -l` != 1 ]; then \
			echo "Multiple .html files in pages folder"; \
		fi; \
		html_file="$(OUT)/`basename $$folder`.html";\
		js_file=$${html_file/html/js};\
		css_file=$${html_file/html/css};\
		cp $$folder/*\.html $$html_file; \
		if [ `find $$folder -name '*\.js' | wc -l` == '1' ]; then \
			cp $$folder/*\.js $$js_file; \
			sed -i "/<head>/a <script src=\"`basename $$js_file`\"><\/script>" $$html_file; \
		fi; \
		if [ `find $$folder -name '*\.css' | wc -l` == 1 ]; then \
			cp $$folder/*\.css $$css_file; \
			sed -i "/<head>/a <link rel=\"stylesheet\" href=\"`basename $$css_file`\"\/>" $$html_file; \
		fi;\
	done

expand_components:
	for folder in $(SRC)/components/*; do \
		if [ `find $$folder -name '*\.html' | wc -l` != 1 ]; then \
			echo "Multiple .html files in components folder"; \
		fi; \
		element_name="<$$(basename $$folder)/>"; \
		component_file=`find $$folder -name '*\.html' | tr -d '\n'`; \
		for page in `find $(OUT)/ -name '*\.html' | tr '\n' ' '`; do \
			element_lines=`grep -n "$$element_name" $$page | cut -f1 -d: | sort -rg | tr '\n' ' '`;\
			for line in $$element_lines; do \
				sed -i "$${line}r $$component_file" $$page; \
				sed -i "$${line}d" $$page; \
			done; \
		done; \
	done

