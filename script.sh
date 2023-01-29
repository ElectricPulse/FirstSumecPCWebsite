for folder in src/components/*; do \
        if [ `find $folder -name '*\.html' | wc -l` != 1 ]; then \
                echo "Multiple .html files in components folder"; \
        fi; \
        element_name="<$(basename $folder)/>"; \
        component_file=`find $folder -name '*\.html' | tr '\n' ' '`; \
        for page in `find out/ -name '*\.html' | tr '\n' ' '`; do \
                element_lines=`grep -n "$element_name" $page | cut -f1 -d: | tr '\n' ' '`; \
                for line in $element_lines ; do \
                        echo "${line}r $component_file $page"; \
                        which sed;\
                        sed -i "${line}r `echo $$component_file | tr ' ' ''`" $page; \
                done; \
        done; \
done

