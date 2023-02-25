--Start from scratch
CREATE DATABASE IF NOT EXISTS webserver;
DROP DATABASE webserver;

CREATE DATABASE webserver;
USE webserver;

CREATE TABLE preregister (
 	username varchar(64) NOT NULL,
	password varchar(128) NOT NULL,
	email varchar(64) NOT NULL,
	token char(16) NOT NULL
);

CREATE TABLE notes (
	name varchar(64) NOT NULL,
	description varchar(4096),
	author varchar(64) NOT NULL,
	date varchar(10) NOT NULL,
	subject char(3) NOT NULL,
	id int UNSIGNED NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id)
);

CREATE TABLE notes_images (
	notes_id int UNSIGNED NOT NULL,
	filename varchar(64) NOT NULL
);

