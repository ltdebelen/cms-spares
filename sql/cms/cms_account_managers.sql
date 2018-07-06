CREATE DATABASE  IF NOT EXISTS `cms` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cms`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: cms
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_managers`
--

DROP TABLE IF EXISTS `account_managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_managers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `business_group_id` int(11) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_managers`
--

LOCK TABLES `account_managers` WRITE;
/*!40000 ALTER TABLE `account_managers` DISABLE KEYS */;
INSERT INTO `account_managers` VALUES (1,1,'Ailyn Alquizalas','Alquizalas','asromero@trends.com.ph'),(2,2,'Aisah ','Abdul-Rahman','aeabdulrahman@trends.com.ph'),(3,2,'Allysa','Pasamba','ddpasamba@trends.com.ph'),(4,2,'Anna Angelica','Yamsuan','aryamsuan@trends.com.ph'),(5,3,'Anne Paula ','Dela Merced-Baluyut','addelamerced@trends.com.ph'),(6,2,'Arianne ','Adesas','aaadesas@trends.com.ph'),(7,1,'Beverly ','Lero','bilero@trends.com.ph'),(8,2,'Bunny ','Santos','bunny@trends.com.ph'),(9,2,'Camille ','David','cbalamban@trends.com.ph'),(10,3,'Candy ','Domingo','cadomingo@trends.com.ph'),(11,2,'Claire ','Fernando','cbfernando@trends.com.ph'),(12,2,'Clouie ','De Guzman','cmdeguzman@trends.com.ph'),(13,4,'Connie ','Landicho','mblandicho@trends.com.ph'),(14,3,'Cris','Santos','cvsantos@trends.com.ph'),(15,2,'Danica','Adrales','mradrales@trends.com.ph'),(16,3,'Des ','Calaustro','mdcalaustro@trends.com.ph'),(17,5,'Diana Andal ','Dapat','dtandal@trends.com.ph'),(18,5,'Diana Kate ','Hipolito','ddsalvador@trends.com.ph'),(19,4,'Emilio ','Gregorio','ebgregorio@trends.com.ph'),(20,6,'Francis ','Querubin','francisq@trends.com.ph'),(21,3,'Gerry ','Baquiran','gabaquiran@trends.com.ph'),(22,6,'Harrychris ','Gonzales','htgonzales@trends.com.ph'),(23,5,'Ilona ','Bitalac','igbitalac@trends.com.ph'),(24,4,'Jabs ','Domingo','rcdomingo@trends.com.ph'),(25,6,'Jamie Janelle ','Torres','jmtorres@trends.com.ph'),(26,3,'Janina ','Tabisaura','jptabisaura@trends.com.ph'),(27,2,'Janine ','Ricaflanca','jaricaflanca@trends.com.ph'),(28,1,'Jeffrey ','Duria','jaduria@trends.com.ph'),(29,6,'Jester ','Tan','jdtan@trends.com.ph'),(30,3,'Joanna Marie ','Cunanan','jacunanan@trends.com.ph'),(31,6,'Jorge ','Lee','jelee@trends.com.ph'),(32,5,'Joselito  ','Dilig','jmdilig@trends.com.ph'),(33,3,'Joy ','Castillo','dccastillo@trends.com.ph'),(34,6,'Justine ','Moraga','jvmoraga@trends.com.ph'),(36,6,'Kimberley ','Santos','kfsantos@trends.com.ph'),(37,3,'Kristine ','Lomadilla','kblomadilla@trends.com.ph'),(38,5,'Marejoy ','Camandero','mccamandero@trends.com.ph'),(39,1,'Maricon ','Balonos','mkbalonos@trends.com.ph'),(40,3,'Mary Cris ','Ramirez','mgramirez@trends.com.ph'),(42,6,'Menchu ','Surabia','mmsurabia@trends.com.ph'),(43,3,'Michael ','Abella','mtabella@trends.com.ph'),(44,3,'Mylene ','David','mylened@trends.com.ph'),(45,4,'Myraflor ','Puebla','mcpuebla@trends.com.ph'),(46,3,'Nady ','Pereja','nspereja@trends.com.ph'),(47,4,'Nicole ','Domingo','pcdomingo@trends.com.ph'),(48,3,'Anndrea Nikkole ','Reyes','arreyes@trends.com.ph'),(49,1,'Norman ','Mallari','nsmallari@trends.com.ph'),(50,2,'Patricia ','Caldito','jmcaldito@trends.com.ph'),(51,5,'Prim ','Ducusin','meducusin@trends.com.ph'),(52,1,'Regina ','Silverio','rvsilverio@trends.com.ph'),(53,5,'Richard ','Del Pilar','rmdelpilar@trends.com.ph'),(54,2,'Rizza ','Gorospe','rpgorospe@trends.com.ph'),(55,1,'Robert ','Corcino','rtcorcino@trends.com.ph'),(56,2,'Rommel ','Santonia','rasantonia@trends.com.ph'),(57,2,'Ronalyn  ','Basilio','rsbasilio@trends.com.ph'),(58,4,'Rose ','Hernandez','rhoses@trends.com.ph'),(59,1,'Rowena ','Maspina','rpmaspinas@trends.com.ph'),(60,2,'Shane ','Delos Santos','scdelossantos@trends.com.ph'),(61,1,'Sharon ','Agarrado','svagarrado@trends.com.ph'),(62,4,'Shirley ','Amata','szamata@trends.com.ph'),(63,5,'Tonette ','Martinez','acmartinez@trends.com.ph'),(64,2,'Venus ','Largo','vclargo@trends.com.ph'),(65,3,'Verna ','Rivera','vcrivera@trends.com.ph'),(66,4,'Victor ','Tiu','victor@trends.com.ph'),(67,6,'Virgie ','Galvez','vmgalvez@trends.com.ph'),(68,5,'Willy ','Aguilar','willya@trends.com.ph'),(69,4,'Winston ','Cabigas','wvcabigas@trends.com.ph'),(70,6,'Zara ','Batan','znbatan@trends.com.ph');
/*!40000 ALTER TABLE `account_managers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-04 15:25:13
