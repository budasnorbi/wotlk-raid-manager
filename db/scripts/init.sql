CREATE DATABASE raid;

USE raid;
CREATE TABLE filtered_talents(
  id int NOT NULL AUTO_INCREMENT,
  classId int NOT NULL,
  spellId int NOT NULL,
  PRIMARY KEY (id)
);

USE mysql;
/* CREATE raid user & grant priv for raid db */
CREATE USER 'raid'@'localhost' IDENTIFIED BY 'raid';
CREATE USER 'raid'@'%' IDENTIFIED BY 'raid';

GRANT ALL PRIVILEGES ON raid.* TO 'raid'@'localhost';
GRANT ALL PRIVILEGES ON raid.* TO 'raid'@'%';

FLUSH PRIVILEGES;