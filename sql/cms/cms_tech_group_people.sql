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
-- Table structure for table `tech_group_people`
--

DROP TABLE IF EXISTS `tech_group_people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tech_group_people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tech_group_id` int(11) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tech_group_people`
--

LOCK TABLES `tech_group_people` WRITE;
/*!40000 ALTER TABLE `tech_group_people` DISABLE KEYS */;
INSERT INTO `tech_group_people` VALUES (1,1,'ibsg-ebg@trends.com.ph'),(2,1,'ibsg-cbg-ccg@trends.com.ph'),(3,1,'ibsg-fsg@trends.com.ph'),(4,1,'ibsg-serviceprovider@trends.com.ph'),(5,2,'ibsg-collaboration@trends.com.ph'),(6,3,'ibsg-datacenter@trends.com.ph'),(7,4,'dcv_engg@trends.com.ph'),(8,5,'cccollab_custcare@trends.com.ph'),(9,5,'cc_cem@trends.com.ph'),(10,6,'isg-ss1@trends.com.ph'),(11,6,'isg-ss2@trends.com.ph'),(12,6,'isg-ss3@trends.com.ph'),(13,7,'sasbg-bm@trends.com.ph'),(14,7,'sasbg-ps-cl@trends.com.ph'),(15,7,'sasbg-pd@trends.com.ph'),(16,8,'ibsg-vismin@trends.com.ph '),(17,8,'isg-vismin@trends.com.ph'),(18,8,'cccollab_vismin@trends.com.ph');
/*!40000 ALTER TABLE `tech_group_people` ENABLE KEYS */;
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
