USE webserver
INSERT INTO preregister (username, password, email, token)
SELECT 'john', '430eef1d1c28a22c082dedf827b60d9fc25a402bb4a96f011583169fecaac65037e6098f096776c6895450e3d501b84990971020e0ddd498b339ce006be0349', 'adam.labuznik@gmail.com', '5419afd82ae4da5e'
WHERE NOT EXISTS (
	SELECT 1 FROM preregister WHERE email = 'adam.labuznik@gmail.com'
) AND NOT EXISTS (
	SELECT 1 FROM accounts WHERE email = 'adam.labuznik@gmail.com'
);
