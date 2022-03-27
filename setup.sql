-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.7.33 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour musicplayerapi
CREATE DATABASE IF NOT EXISTS `musicplayerapi` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `musicplayerapi`;

-- Listage de la structure de la table musicplayerapi. album
CREATE TABLE IF NOT EXISTS `album` (
  `albumId` int(11) NOT NULL AUTO_INCREMENT,
  `albumName` varchar(100) NOT NULL,
  `albumAuthor` varchar(100) NOT NULL,
  `albumSong` int(11) DEFAULT NULL,
  `albumIsVisible` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`albumId`),
  KEY `fk_albumsong` (`albumSong`),
  CONSTRAINT `fk_albumsong` FOREIGN KEY (`albumSong`) REFERENCES `song` (`songId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.album : ~0 rows (environ)
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
/*!40000 ALTER TABLE `album` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. apikey
CREATE TABLE IF NOT EXISTS `apikey` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` char(50) NOT NULL,
  `ismasterkey` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Index 2` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.apikey : ~15 rows (environ)
/*!40000 ALTER TABLE `apikey` DISABLE KEYS */;
INSERT INTO `apikey` (`id`, `key`, `ismasterkey`) VALUES
	(1, 'aaa', 1),
	(2, 'aaaa', 0),
	(3, 'aZAQjSnhLC8yG65SBAAi2jnWXGd2B2', 0),
	(4, '4Jg5HDmYMIEnoETwXEZwyviH8xpLFD', 0),
	(5, 'k1W5fdbOKCLquYPMLnPdNnOEY0kBZ3', 0),
	(6, 'nSncGp5tx2uFn2oNEdOFNA3JYuY3G8', 0),
	(7, 'r2QkKl47aMW5SkNeCHtpghjVz260Kr', 0),
	(8, 'HFgJDlXdMStxVnSFstNWSDIXaG2Rnk', 0),
	(9, 'x4SDwymSMWdycBfjpneu9Q0c7uTFPn', 0),
	(10, 'OBcf16n45o357xw84G4hrB2Ye9KNdJ', 0),
	(11, 'QrFNcZAHeT7Wv9pKs788o4K1zRNfV5', 1),
	(12, 'bpVsAdu3B5iW0VPs0GH2B0X2s669P2', 1),
	(13, 'pPNnAMb1PAlozjdNW90LaSdQlk4gWL', 1),
	(15, 'e3HwYfaTtfxlm1vMw3a6Uwr4DPojND', 0),
	(16, 'Qov5pMg7Mtj3huntzQDQmd9EZt9E33', 0),
	(17, 'ViIaNS5QFtyGzcdN1xwLfwxbvchlLX', 0),
	(18, '30bgmnyne7bZIrAkjJ0CAV9IFnbOrq', 1);
/*!40000 ALTER TABLE `apikey` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. apisettings
CREATE TABLE IF NOT EXISTS `apisettings` (
  `maintenance` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.apisettings : ~0 rows (environ)
/*!40000 ALTER TABLE `apisettings` DISABLE KEYS */;
/*!40000 ALTER TABLE `apisettings` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. group
CREATE TABLE IF NOT EXISTS `group` (
  `groupId` int(11) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(50) NOT NULL DEFAULT '',
  `groupDescription` varchar(200) DEFAULT 'No Description',
  PRIMARY KEY (`groupId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.group : ~0 rows (environ)
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
/*!40000 ALTER TABLE `group` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. playlist
CREATE TABLE IF NOT EXISTS `playlist` (
  `playlistId` int(11) NOT NULL,
  `playlistName` varchar(250) NOT NULL DEFAULT '',
  `playlistDescription` varchar(250) DEFAULT 'No Description',
  `playlistContent` int(11) NOT NULL DEFAULT '0',
  `playlistAuthorId` int(11) NOT NULL,
  PRIMARY KEY (`playlistId`),
  KEY `fk_playlistAuthorId` (`playlistAuthorId`),
  CONSTRAINT `fk_playlistAuthorId` FOREIGN KEY (`playlistAuthorId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.playlist : ~0 rows (environ)
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. singer
CREATE TABLE IF NOT EXISTS `singer` (
  `singerId` int(11) NOT NULL,
  `singerName` varchar(50) NOT NULL DEFAULT '',
  `singerGenre` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.singer : ~0 rows (environ)
/*!40000 ALTER TABLE `singer` DISABLE KEYS */;
/*!40000 ALTER TABLE `singer` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. song
CREATE TABLE IF NOT EXISTS `song` (
  `songId` int(11) NOT NULL AUTO_INCREMENT,
  `songFileName` varchar(200) NOT NULL DEFAULT '0',
  `songName` varchar(50) NOT NULL,
  `songAuthor` varchar(50) NOT NULL DEFAULT 'Unknow Author',
  PRIMARY KEY (`songId`),
  UNIQUE KEY `Index 2` (`songName`,`songFileName`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.song : ~11 rows (environ)
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` (`songId`, `songFileName`, `songName`, `songAuthor`) VALUES
	(20, '1648294496612.mp3', 'Crabew', 'Crabe'),
	(36, '1648299582334.mp3', 'Black Clover Ending 9 Full', 'Black Clover'),
	(37, '1648299693795.mp3', 'There and Back _Monster', 'ProtoStar'),
	(44, '1648317833050.mp3', 'Harehare Ya', 'Tiktok'),
	(45, '1648317847517.mp3', 'Monkey King\'s Theme - The God of Hi', 'Crunchyroll'),
	(46, '1648317863157.mp3', 'Jujutsu Kaisen Ending 2 FullCö shu ', 'Jujustu Kaisen'),
	(47, '1648318217574.mp3', 'BOOM BOOM SATELLITES LAY YOUR HANDS', 'Kiznaiver'),
	(48, '1648319228713.mp3', 'Blinding Lights', 'The Weeknd'),
	(52, '1648319599440.mp3', 'CIX WIN Lyrics', 'God Of Highschool'),
	(53, '1648320738764.mp3', 'Make Me Move', 'Culture Code'),
	(54, '1648320808990.mp3', 'Get Up', 'Sture Zetterberg feat. Wil'),
	(55, '1648401700111.mp3', 'No Money', 'Galantis'),
	(56, '1648401843306.mp3', 'Falling', 'Trevor Daniel'),
	(57, '1648401959860.mp4', 'Eve', 'Unknow Author');
/*!40000 ALTER TABLE `song` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. user
CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userPseudo` varchar(50) NOT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `userLastname` varchar(50) DEFAULT NULL,
  `userEmail` varchar(100) NOT NULL,
  `userPassword` varchar(100) NOT NULL COMMENT 'Must be hashed',
  `userToken` varchar(100) DEFAULT '',
  `userVerifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userCreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `userGroup` int(11) NOT NULL DEFAULT '0' COMMENT 'Group ID',
  `userIsAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `userIsPremium` tinyint(1) NOT NULL DEFAULT '0',
  `userIsSinger` tinyint(1) NOT NULL DEFAULT '0',
  `userIsBanned` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userPseudo` (`userPseudo`),
  KEY `fk_userGroup` (`userGroup`),
  CONSTRAINT `fk_userGroup` FOREIGN KEY (`userGroup`) REFERENCES `group` (`groupId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.user : ~0 rows (environ)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. usergroup
CREATE TABLE IF NOT EXISTS `usergroup` (
  `userId` int(11) NOT NULL,
  `userGroup` int(11) NOT NULL,
  `userGroupName` varchar(50) NOT NULL,
  `groupDescription` varchar(200) NOT NULL,
  `groupPermission` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`,`userGroup`),
  CONSTRAINT `fk_userGroupId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.usergroup : ~0 rows (environ)
/*!40000 ALTER TABLE `usergroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `usergroup` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. userverify
CREATE TABLE IF NOT EXISTS `userverify` (
  `userId` int(11) NOT NULL,
  `verifyId` int(11) NOT NULL AUTO_INCREMENT,
  `verifyToken` varchar(100) DEFAULT NULL,
  `verifyAskAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`verifyId`,`userId`) USING BTREE,
  KEY `fk_userverifyId` (`userId`),
  CONSTRAINT `fk_userverifyId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.userverify : ~0 rows (environ)
/*!40000 ALTER TABLE `userverify` DISABLE KEYS */;
/*!40000 ALTER TABLE `userverify` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
