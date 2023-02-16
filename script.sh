trap 'echo "Press q to exit"' INT
setsid make -C backend run 1>&1 &
backend_pid=$!
setsid make -C frontend run 1>&1 &
frontend_pid=$!
while true; do
	read -sN 1
	if [ "$REPLY" == 'q' ]; then
			break
	fi
done	
kill $frontend_pid
kill $backend_pid
wait $backend_pid $frontend_pid
stty sane
