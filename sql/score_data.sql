TIMESTAMP,
  match_num int(8) DEFAULT NULL,
  field_num int(8) DEFAULT NULL,
  skystone1 tinyint(1) DEFAULT '0',
  skystone2 tinyint(1) DEFAULT '0',
  skystone3 tinyint(1) DEFAULT '0',
  skystone4 tinyint(1) DEFAULT '0',
  skystone5 tinyint(1) DEFAULT '0',
  skystone6 tinyint(1) DEFAULT '0',
  stone1 tinyint(1) DEFAULT '0',
  stone2 tinyint(1) DEFAULT '0',
  stone3 tinyint(1) DEFAULT '0',
  stone4 tinyint(1) DEFAULT '0',
  stone5 tinyint(1) DEFAULT '0',
  stone6 tinyint(1) DEFAULT '0',
  none1 tinyint(1) DEFAULT '0',
  none2 tinyint(1) DEFAULT '0',
  none3 tinyint(1) DEFAULT '0',
  none4 tinyint(1) DEFAULT '0',
  none5 tinyint(1) DEFAULT '0',
  none6 tinyint(1) DEFAULT '0',
  frs tinyint(1) DEFAULT '0',
  fr tinyint(1) DEFAULT '0',
  r1n tinyint(1) DEFAULT '0',
  r2n tinyint(1) DEFAULT '0',
  returned_auto int(8) DEFAULT NULL,
  placed_auto int(8) DEFAULT NULL,
  delivered int(8) DEFAULT NULL,
  tallest_sky int(8) DEFAULT NULL,
  returned_drs int(8) DEFAULT NULL,
  placed_drs int(8) DEFAULT NULL,
  found_moved tinyint(1) DEFAULT '0',
  cap1 tinyint(1) DEFAULT '0',
  cap2 tinyint(1) DEFAULT '0',
  parked1 tinyint(1) DEFAULT '0',
  parked2 tinyint(1) DEFAULT '0',
  r1l int(8) DEFAULT NULL,
  r2l int(8) DEFAULT NULL,
  minor int(8) DEFAULT NULL,
  major int(8) DEFAULT NULL,
  team1_0 tinyint(1) DEFAULT '0',
  team1_1 tinyint(1) DEFAULT '0',
  team1_2 tinyint(1) DEFAULT '0',
  team2_0 tinyint(1) DEFAULT '0',
  team2_1 tinyint(1) DEFAULT '0',
  team2_2 tinyint(1) DEFAULT '0',
  PRIMARY KEY (id)
)