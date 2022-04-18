-- MySQL Script generated by MySQL Workbench
-- Sun Apr 17 18:06:48 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema musicplayerapi
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema musicplayerapi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `musicplayerapi` DEFAULT CHARACTER SET utf8 ;
USE `musicplayerapi` ;

-- -----------------------------------------------------
-- Table `musicplayerapi`.`Group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicplayerapi`.`Group` (
  `idGroupe` INT NOT NULL AUTO_INCREMENT,
  `GroupName` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(45) NULL,
  `PermissionLevel` INT NOT NULL,
  `Groupecol1` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idGroupe`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicplayerapi`.`Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicplayerapi`.`Country` (
  `idCountry` INT NOT NULL AUTO_INCREMENT,
  `CountryName` VARCHAR(45) NOT NULL,
  `CountryCode` CHAR(2) NOT NULL,
  PRIMARY KEY (`idCountry`),
  UNIQUE INDEX `CountryCode_UNIQUE` (`CountryCode` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicplayerapi`.`City`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicplayerapi`.`City` (
  `idCity` INT NOT NULL AUTO_INCREMENT,
  `CityName` VARCHAR(45) NOT NULL,
  `PostalCode` INT NOT NULL,
  `Country_idCountry` INT NOT NULL,
  PRIMARY KEY (`idCity`),
  INDEX `fk_City_Country1_idx` (`Country_idCountry` ASC) ,
  UNIQUE INDEX `CityCodePostal_UNIQUE` (`PostalCode` ASC) ,
  CONSTRAINT `fk_City_Country1`
    FOREIGN KEY (`Country_idCountry`)
    REFERENCES `musicplayerapi`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicplayerapi`.`Adress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicplayerapi`.`Adress` (
  `idAdress` INT NOT NULL,
  `NumAdress` INT NOT NULL,
  `NomAdresse` VARCHAR(150) NULL,
  `City_idCity` INT NOT NULL,
  PRIMARY KEY (`idAdress`),
  INDEX `fk_Adress_City1_idx` (`City_idCity` ASC) ,
  CONSTRAINT `fk_Adress_City1`
    FOREIGN KEY (`City_idCity`)
    REFERENCES `musicplayerapi`.`City` (`idCity`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicplayerapi`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicplayerapi`.`User` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Token` VARCHAR(150) NOT NULL,
  `CreationDate` TIMESTAMP(2) NULL DEFAULT CURRENT_TIMESTAMP,
  `LastLogin` TIMESTAMP(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PermissionLevel` INT NULL DEFAULT 0,
  `Groupe_idGroupe` INT NOT NULL,
  `Adress_idAdress` INT NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userName_UNIQUE` (`Username` ASC) ,
  INDEX `fk_User_Groupe1_idx` (`Groupe_idGroupe` ASC) ,
  INDEX `fk_User_Adress1_idx` (`Adress_idAdress` ASC) ,
  CONSTRAINT `fk_User_Groupe1`
    FOREIGN KEY (`Groupe_idGroupe`)
    REFERENCES `musicplayerapi`.`Group` (`idGroupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_Adress1`
    FOREIGN KEY (`Adress_idAdress`)
    REFERENCES `musicplayerapi`.`Adress` (`idAdress`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicplayerapi`.`Genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicplayerapi`.`Genre` (
  `idGenre` INT NOT NULL AUTO_INCREMENT,
  `Genre` VARCHAR(45) NULL,
  PRIMARY KEY (`idGenre`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicplayerapi`.`Playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicplayerapi`.`Playlist` (
  `idPlaylist` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Genre_idGenre` INT NOT NULL,
  `User_userId` INT NOT NULL,
  PRIMARY KEY (`idPlaylist`),
  INDEX `fk_Playlist_Genre1_idx` (`Genre_idGenre` ASC) ,
  INDEX `fk_Playlist_User1_idx` (`User_userId` ASC) ,
  CONSTRAINT `fk_Playlist_Genre1`
    FOREIGN KEY (`Genre_idGenre`)
    REFERENCES `musicplayerapi`.`Genre` (`idGenre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Playlist_User1`
    FOREIGN KEY (`User_userId`)
    REFERENCES `musicplayerapi`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicplayerapi`.`Sing`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicplayerapi`.`Sing` (
  `idSing` INT NOT NULL AUTO_INCREMENT,
  `SingName` VARCHAR(45) NOT NULL,
  `Genre` VARCHAR(45) NOT NULL,
  `Genre_idGenre` INT NOT NULL,
  `User_userId` INT NOT NULL,
  PRIMARY KEY (`idSing`, `Genre`),
  INDEX `fk_Sing_Genre1_idx` (`Genre_idGenre` ASC) ,
  INDEX `fk_Sing_User1_idx` (`User_userId` ASC) ,
  CONSTRAINT `fk_Sing_Genre1`
    FOREIGN KEY (`Genre_idGenre`)
    REFERENCES `musicplayerapi`.`Genre` (`idGenre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Sing_User1`
    FOREIGN KEY (`User_userId`)
    REFERENCES `musicplayerapi`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicplayerapi`.`Album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicplayerapi`.`Album` (
  `idAlbum` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Genre_idGenre` INT NOT NULL,
  `User_userId` INT NOT NULL,
  PRIMARY KEY (`idAlbum`),
  INDEX `fk_Album_Genre1_idx` (`Genre_idGenre` ASC) ,
  INDEX `fk_Album_User1_idx` (`User_userId` ASC) ,
  CONSTRAINT `fk_Album_Genre1`
    FOREIGN KEY (`Genre_idGenre`)
    REFERENCES `musicplayerapi`.`Genre` (`idGenre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Album_User1`
    FOREIGN KEY (`User_userId`)
    REFERENCES `musicplayerapi`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicplayerapi`.`apikey`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicplayerapi`.`apikey` (
  `idapikey` INT NOT NULL AUTO_INCREMENT,
  `apikey` VARCHAR(150) NOT NULL,
  `ismasterkey` TINYINT NOT NULL,
  PRIMARY KEY (`idapikey`),
  UNIQUE INDEX `apikey_UNIQUE` (`apikey` ASC) )
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;