CREATE TABLE user (
  email varchar(255) DEFAULT NULL,
  create_time timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  team varchar(255) DEFAULT NULL,
  grade varchar(45) DEFAULT NULL,
  first_name varchar(128) DEFAULT NULL,
  last_name varchar(128) DEFAULT NULL,
  info varchar(1024) DEFAULT 'Add information about yourself',
  dis tinyint(1) DEFAULT '0',
  id int(11) NOT NULL AUTO_INCREMENT,
  password char(60) DEFAULT NULL,
  PRIMARY KEY (id)
)