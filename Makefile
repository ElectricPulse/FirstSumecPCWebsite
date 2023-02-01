OUT = out
SRC = src
SRC_PAGES_FOLDER = $(SRC)/pages
SRC_IMAGES_FOLDER = $(SRC)/images
SRC_COMPONENTS_FOLDER = $(SRC)/components

OUT_PAGES != ls $(SRC_PAGES_FOLDER) | sed -e 's|[^ ]*|$(OUT)/&.html|'
SRC_PAGE_FOLDERS != ls $(SRC_PAGES_FOLDER)


OUT_IMAGES != ls $(SRC_IMAGES_FOLDER) | sed 's|^|$(OUT)/images/|'
COMPONENT_FOLDERS != ls $(SRC_COMPONENTS_FOLDER);
OUT_COMPONENT_MARKERS != ls $(SRC_COMPONENTS_FOLDER) | sed 's|^|$(OUT)/marker_component-|';
IMAGE_EXTENSIONS = png svg

1: 
	$(MAKE) clean
	$(MAKE) build
	$(MAKE) build_components
	echo $(OUT_PAGES)

build_components: $(OUT_COMPONENT_MARKERS)

mrproper: 
	if [ -d $(OUT) ]; then \
		$(MAKE) clean; \
	else \
		mkdir $(OUT); \
	fi

.PHONY: build 1	

build: $(OUT_PAGES) compile_images $(OUT)/.htaccess


compile_images: 
	mkdir $(OUT)/images
	$(MAKE) $(OUT_IMAGES)

#Prepare pages
$(OUT)/%.html: $(SRC_PAGES_FOLDER)/% $(SRC_PAGES_FOLDER)
	if [ `find $< -name '*\.html' | wc -l` != 1 ]; then \
		echo >&2 "Incorrect amount of html documents in pages directory $<"; \
	fi
	cp $</*.html $@
	for file in `find $< -name '*\.js' -o -name '*\.css'`; do \
		$(MAKE) "$(OUT)/`basename $<`-`basename $$file`"; \
	done

#Define how JS/CSS in the src/pages folder should be handled
define JS_compile_template
$(OUT)/$(1)-%.js: $(SRC_PAGES_FOLDER)/$(1)/%.js
	cp $$< $$@
	sed -i "/<head>/a <script src=\"`basename $$@`\"><\/script>" $(OUT)/$(1).html
endef

define CSS_compile_template
$(OUT)/$(1)-%.css: $(SRC_PAGES_FOLDER)/$(1)/%.css
	cp $$< $$@
	sed -i "/<head>/a <link rel=\"stylesheet\" href=\"`basename $$@`\"\/>" $(OUT)/$(1).html
endef

define setup_compile_templates
	$(eval $(call JS_compile_template,$(1)))
	$(eval $(call CSS_compile_template,$(1)))
endef

$(foreach page_folder,$(SRC_PAGE_FOLDERS),$(eval $(call setup_compile_templates,$(page_folder))))



define PAGE_ITER_compile_template
$(OUT)/marker_component-$(1)/%.html/page-$(2):
	$$(eval PAGE_NAME != echo $$@ | grep -oP '(?<=/page-).+')
	$$(eval PAGE_PATH = $(OUT)/$$(PAGE_NAME).html)
	$$(eval COMPONENT_HTML_NAME !=  echo $$@ | grep -Po '(?<=/marker_component-).+(?=/)')
	$$(eval COMPONENT_HTML_PATH =  $(SRC_COMPONENTS_FOLDER)/$$(COMPONENT_HTML_NAME))
	$$(eval COMPONENT_NAME != dirname $$(COMPONENT_HTML_NAME))
	sed -i -e '/<$$(COMPONENT_NAME)\/>/{r $$(COMPONENT_HTML_PATH)' -e 'd}' $$(PAGE_PATH)

$(OUT)/marker_component-$(1)/%.css/page-$(2):
	$$(eval COMPONENT_CSS_NAME !=  echo $$@ | grep -Po '(?<=$(1)/).+(?=/)')
	$$(eval COMPONENT_CSS_PATH =  $(OUT)/component_$(1)_$$(COMPONENT_CSS_NAME))
	$$(eval COMPONENT_NAME != dirname $$(COMPONENT_CSS_NAME))

	sed -i -e '/<head>/a <link rel=\"stylesheet\" href=\"component_$(1)_$$(COMPONENT_CSS_NAME)\"\/>' $(OUT)/$(2).html


$(OUT)/marker_component-$(1)/%.js/page-$(2):
	$$(eval COMPONENT_CSS_NAME !=  echo $$@ | grep -Po '(?<=$(1)/).+(?=/)')
	$$(eval COMPONENT_CSS_PATH =  $(OUT)/component_$(1)_$$(COMPONENT_CSS_NAME))
	$$(eval COMPONENT_NAME != dirname $$(COMPONENT_CSS_NAME))

	sed -i -e '/<head>/a <script src=\"component_$(1)_$$(COMPONENT_CSS_NAME)\"><\/script>' $(OUT)/$(2).html
endef

define COMPONENT_compile_template
$(OUT)/marker_component-$(1):
	files=`echo $(SRC_COMPONENTS_FOLDER)/$(1)/*\.{css,js,html}`; \
	for file in $$$$files; do \
		if [ -f $$$$file ]; then \
			$$(MAKE) $(OUT)/marker_component-$(1)/`basename $$$$file`; \
		fi; \
	done

$(OUT)/marker_component-$(1)/%.js $(OUT)/marker_component-$(1)/%.css $(OUT)/marker_component-$(1)/%.html:
	cp $(SRC_COMPONENTS_FOLDER)/$(1)/`basename $$@` $(OUT)/component_$(1)_`basename $$@`
	for page in $(SRC_PAGE_FOLDERS); do\
		if cat $(SRC_PAGES_FOLDER)/$$$$page/*.html | grep -q '<$(1)/>'; then \
			$$(MAKE) $$@/page-$$$$page;\
		fi; \
	done

$(foreach page_folder,$(SRC_PAGE_FOLDERS),
		$(eval $(call PAGE_ITER_compile_template,$(1),$(page_folder))) 
)
endef
#$(ifeq ($(shell if cat $(SRC_PAGES_FOLDER)/$(page_folder)/*.html | grep -q '<$(1)/>'; then echo found; fi), $(shell echo found)) 

$(foreach component_folder,$(COMPONENT_FOLDERS),$(eval $(call COMPONENT_compile_template,$(component_folder))))

define images_compile_template
$(OUT)/images/%.$(1): $(SRC_IMAGES_FOLDER)/%.$(1)
	cp $$< $$@
endef

$(foreach image_extension,$(IMAGE_EXTENSIONS),$(eval $(call images_compile_template,$(image_extension))))

clean:
	for file in `ls -A $(OUT)`; do \
		rm -dr $(OUT)/$$file ; \
	done  

$(OUT)/.htaccess: $(SRC)/htaccess
	if [ -f $< ]; then \
		cp $< $@; \
	fi



#DEPRECATED BASH BULLSHIT :)
#create_pages: 
#for folder in $(SRC)/pages/*; do \
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
#copy_images: 
#	if [ -d $(SRC)/images ] && [ ! -z "$$(ls -A $(SRC)/images)" ]; then \
#		mkdir $(OUT)/images; \
#		cp $(SRC)/images/* $(OUT)/images; \
#	fi
#expand_components:
#	for folder in $(SRC)/components/*; do \
		if [ `find $$folder -name '*\.html' | wc -l` != 1 ]; then \
			echo "Multiple .html files in components folder"; \
		fi; \
		element_name="<$$(basename $$folder)/>"; \
		component_file=`find $$folder -name '*\.html' | tr -d '\n'`; \
		css_file=`find $$folder -name '*\.css' | tr -d '\n'` ;\
		css_file_out="$(OUT)/`basename $$(dirname $$component_file)`-`basename $$css_file`" ;\
		jss_file=`find $$folder -name '*\.js' | tr -d '\n'` ;\
		jss_file_out="$(OUT)/`basename $$(dirname $$component_file)`-`basename $$css_file`";\
		cp $$css_file $$css_file_out;\
		for page in `find $(OUT)/ -name '*\.html' | tr '\n' ' '`; do \
			element_lines=`grep -n "$$element_name" $$page | cut -f1 -d: | sort -rg | tr '\n' ' '`;\
			for line in $$element_lines; do \
				sed -i "$${line}r $$component_file" $$page; \
				sed -i "$${line}d" $$page; \
				sed -i "/<head>/a <link rel=\"stylesheet\" href=\"`basename $$css_file_out`\"\/>" $$page; \
			done; \
		done; \
	done
