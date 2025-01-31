
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mood_db
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `blacklist`
--

LOCK TABLES `blacklist` WRITE;
/*!40000 ALTER TABLE `blacklist` DISABLE KEYS */;
INSERT INTO `blacklist` VALUES (1,2,6),(2,5,6);
/*!40000 ALTER TABLE `blacklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cohort`
--

LOCK TABLES `cohort` WRITE;
/*!40000 ALTER TABLE `cohort` DISABLE KEYS */;
INSERT INTO `cohort` VALUES (1,'Kim Possible'),(2,'Code Lyoko'),(3,'Totally Spies'),(4,'Winx');
/*!40000 ALTER TABLE `cohort` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cohort_user`
--

LOCK TABLES `cohort_user` WRITE;
/*!40000 ALTER TABLE `cohort_user` DISABLE KEYS */;
INSERT INTO `cohort_user` VALUES (4,1),(5,1),(1,2),(2,2),(3,2),(4,2);
/*!40000 ALTER TABLE `cohort_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `mood_score`
--

LOCK TABLES `mood_score` WRITE;
/*!40000 ALTER TABLE `mood_score` DISABLE KEYS */;
INSERT INTO `mood_score` VALUES (1,52,1,'2025-01-31 09:46:27'),(2,1,2,'2025-01-31 09:46:35'),(3,89,3,'2025-01-31 09:46:43'),(4,23,4,'2025-01-31 09:46:52');
/*!40000 ALTER TABLE `mood_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Darrel','Andrade','darrel@email.com','$2b$10$nmVuCDySH3mBQmpp4118wOVEwUXitNTt7tzmym2dfr4FZVzdKkeeW','trainee',0),(2,'Benita ','AndrKellerde','benita@email.com','$2b$10$yCcEKzjlMa.OKOVMXDn3aeVpCAHx5yh2OydtXh32.RJswrLCi/AgS','trainee',0),(3,'Erwin','Gamble','erwin@email.com','$2b$10$pouHNyED.KhoBGI49s297eK4hnB6nbkPsI9rVDWAHCzMiUKkrzeBu','trainee',0),(4,'Royal','Norman','royal@email.com','$2b$10$UESGBAKNW6l0dAJXSpnobObfWxU7RtGh36n9vCB1SLtIfrbemxV3y','trainee',0),(5,'Douglas','Warren','douglass@email.com','$2b$10$xD4VJJyE.6Qy39uXVB7zXe8ZCWucmCcObQHX8M10TVuOBtQM21hsm','trainee',0),(6,'Otha','Parrish','otha@email.com','$2b$10$jbdygESbeBiAavEeDUHOce9I01y/8DgX5FD2568nvcFTdXOOXl6Ie','supervisor',0),(9,'Cornell','Cannon','cornell@email.com','$2b$10$zJa6pt5mJEnzs4/fzE.9Muiaja0BlpoVXNbU7DAfwOK6EePRlT0Iu','admin',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-31 10:48:19
