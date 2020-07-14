CREATE TABLE team (
  idteam int(11) NOT NULL AUTO_INCREMENT,
  team_number int(8) DEFAULT NULL,
  name varchar(512) DEFAULT NULL,
  school varchar(512) DEFAULT NULL,
  location varchar(512) DEFAULT NULL,
  league varchar(512) DEFAULT NULL,
  opr float DEFAULT '0',
  wl float DEFAULT '0',
  PRIMARY KEY (idteam)
)
