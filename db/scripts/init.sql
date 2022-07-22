CREATE DATABASE raid;

USE raid;


USE mysql;
/* CREATE raid user & grant priv for raid db */
CREATE USER 'raid'@'localhost' IDENTIFIED BY 'raid';
CREATE USER 'raid'@'%' IDENTIFIED BY 'raid';

GRANT ALL PRIVILEGES ON raid.* TO 'raid'@'localhost';
GRANT ALL PRIVILEGES ON raid.* TO 'raid'@'%';

FLUSH PRIVILEGES;