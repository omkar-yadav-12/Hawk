--These are the Create Statements for the tables--

--Events--


CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(512) DEFAULT NULL,
  `Location` varchar(512) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
) 


-- Score -- 

CREATE TABLE `score_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alliance` varchar(16) DEFAULT NULL,
  `team1_name` varchar(256) DEFAULT NULL,
  `team2_name` varchar(256) DEFAULT NULL,
  `match_num` int(8) DEFAULT NULL,
  `field` int(8) DEFAULT NULL,
  `skystone1` tinyint(1) DEFAULT '0',
  `skystone2` tinyint(1) DEFAULT '0',
  `skystone3` tinyint(1) DEFAULT '0',
  `skystone4` tinyint(1) DEFAULT '0',
  `skystone5` tinyint(1) DEFAULT '0',
  `skystone6` tinyint(1) DEFAULT '0',
  `stone1` tinyint(1) DEFAULT '0',
  `stone2` tinyint(1) DEFAULT '0',
  `stone3` tinyint(1) DEFAULT '0',
  `stone4` tinyint(1) DEFAULT '0',
  `stone5` tinyint(1) DEFAULT '0',
  `stone6` tinyint(1) DEFAULT '0',
  `none1` tinyint(1) DEFAULT '0',
  `none2` tinyint(1) DEFAULT '0',
  `none3` tinyint(1) DEFAULT '0',
  `none4` tinyint(1) DEFAULT '0',
  `none5` tinyint(1) DEFAULT '0',
  `none6` tinyint(1) DEFAULT '0',
  `frs` tinyint(1) DEFAULT '0',
  `fr` tinyint(1) DEFAULT '0',
  `r1n` tinyint(1) DEFAULT '0',
  `r2n` tinyint(1) DEFAULT '0',
  `returned_auto` int(8) DEFAULT NULL,
  `placed_auto` int(8) DEFAULT NULL,
  `delivered` int(8) DEFAULT NULL,
  `tallest_sky` int(8) DEFAULT NULL,
  `returned_drs` int(8) DEFAULT NULL,
  `placed_drs` int(8) DEFAULT NULL,
  `found_moved` tinyint(1) DEFAULT '0',
  `cap1` tinyint(1) DEFAULT '0',
  `cap2` tinyint(1) DEFAULT '0',
  `parked1` tinyint(1) DEFAULT '0',
  `parked2` tinyint(1) DEFAULT '0',
  `r1l` int(8) DEFAULT NULL,
  `r2l` int(8) DEFAULT NULL,
  `minor` int(8) DEFAULT NULL,
  `major` int(8) DEFAULT NULL,
  `team1_0` tinyint(1) DEFAULT '0',
  `team1_1` tinyint(1) DEFAULT '0',
  `team1_2` tinyint(1) DEFAULT '0',
  `team2_0` tinyint(1) DEFAULT '0',
  `team2_1` tinyint(1) DEFAULT '0',
  `team2_2` tinyint(1) DEFAULT '0',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Author` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Scout -- 

CREATE TABLE `scout_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_number` int(255) DEFAULT NULL,
  `event_name` varchar(256) DEFAULT NULL,
  `author` varchar(128) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `move_auto` varchar(45) DEFAULT NULL,
  `sense_auto` varchar(45) DEFAULT NULL,
  `over_auto` varchar(45) DEFAULT NULL,
  `collect_auto` varchar(45) DEFAULT NULL,
  `place_auto` varchar(45) DEFAULT NULL,
  `found_auto_d` blob,
  `sense_auto_d` blob,
  `park_auto_d` blob,
  `stone_auto_d` blob,
  `add_auto_d` blob,
  `found_teleop` varchar(45) DEFAULT NULL,
  `collect_teleop` varchar(45) DEFAULT NULL,
  `palce_teleop` varchar(45) DEFAULT NULL,
  `found_teleop_d` blob,
  `stone_teleop_d` blob,
  `add_teleop_d` blob,
  `found_end` varchar(45) DEFAULT NULL,
  `in_end` varchar(45) DEFAULT NULL,
  `over_end` varchar(45) DEFAULT NULL,
  `place_end` varchar(45) DEFAULT NULL,
  `found_end_d` blob,
  `parki_end_d` blob,
  `stones_end_d` blob,
  `add_end_d` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- team -- 

CREATE TABLE `team` (
  `idteam` int(11) NOT NULL AUTO_INCREMENT,
  `team_number` int(8) DEFAULT NULL,
  `name` varchar(512) DEFAULT NULL,
  `school` varchar(512) DEFAULT NULL,
  `location` varchar(512) DEFAULT NULL,
  `league` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`idteam`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- user --

CREATE TABLE `user` (
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `team` varchar(255) DEFAULT NULL,
  `grade` varchar(45) DEFAULT NULL,
  `first_name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) DEFAULT NULL,
  `info` varchar(1024) DEFAULT 'Add information about yourself'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
