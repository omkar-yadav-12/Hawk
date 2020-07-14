CREATE TABLE events (
  id int(11) NOT NULL AUTO_INCREMENT,
  Name varchar(512) DEFAULT NULL,
  Location varchar(512) DEFAULT NULL,
  Date datetime DEFAULT NULL,
  Type varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
)