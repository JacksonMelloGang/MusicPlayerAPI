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

-- Listage de la structure de la table musicplayerapi. apikey
CREATE TABLE IF NOT EXISTS `apikey` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` char(50) NOT NULL,
  `ismasterkey` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.apikey : ~2 rows (environ)
/*!40000 ALTER TABLE `apikey` DISABLE KEYS */;
INSERT INTO `apikey` (`id`, `key`, `ismasterkey`) VALUES
	(1, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\r\n', 1),
	(2, 'bbbb', -1);
/*!40000 ALTER TABLE `apikey` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. playlist
CREATE TABLE IF NOT EXISTS `playlist` (
  `Idplaylist` int(11) NOT NULL,
  `playlistName` varchar(250) NOT NULL DEFAULT '',
  `playlistContent` int(11) NOT NULL DEFAULT '0',
  `playlistAuthorId` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Idplaylist`),
  KEY `cst_playlist` (`playlistAuthorId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.playlist : ~0 rows (environ)
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. user
CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) NOT NULL,
  `userPseudo` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL DEFAULT '',
  `userLastname` varchar(50) NOT NULL DEFAULT '',
  `userEmail` varchar(100) NOT NULL DEFAULT '',
  `userPassword` varchar(100) NOT NULL COMMENT 'Must be hashed',
  `userToken` varchar(100) NOT NULL DEFAULT '',
  `userVerifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userIsAdmin` tinyint(4) DEFAULT '0',
  `userIsPremuim` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`userId`) USING BTREE,
  UNIQUE KEY `userPseudo` (`userPseudo`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table musicplayerapi.user : ~0 rows (environ)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Listage de la structure de la table musicplayerapi. userverify
CREATE TABLE IF NOT EXISTS `userverify` (
  `userId` int(11) NOT NULL,
  `verifyId` int(11) NOT NULL AUTO_INCREMENT,
  `verifyToken` varchar(100) DEFAULT NULL,
  `verifyAskAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`,`verifyId`),
  UNIQUE KEY `verifyId` (`verifyId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `playlist`
	ADD CONSTRAINT `cst_playlist` FOREIGN KEY (`playlistAuthorId`) REFERENCES `musicplayerapi`.`user` (`userId`) ON UPDATE CASCADE ON DELETE SET NULL;


-- Listage des données de la table musicplayerapi.userverify : ~0 rows (environ)
/*!40000 ALTER TABLE `userverify` DISABLE KEYS */;
/*!40000 ALTER TABLE `userverify` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
