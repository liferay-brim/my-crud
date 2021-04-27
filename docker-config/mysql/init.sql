CREATE DATABASE IF NOT EXISTS my_crud;

USE my_crud;

CREATE TABLE IF NOT EXISTS users (
	id int(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username varchar(150) NOT NULL,
    password varchar(150) NOT NULL,
    name varchar(150) NOT NULL,
    email varchar(150) NOT NULL,
    type varchar(50) NOT NULL,
    active boolean DEFAULT false
);