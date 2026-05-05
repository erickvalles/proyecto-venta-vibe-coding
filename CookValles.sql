-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: COOK_VALLES
-- ------------------------------------------------------
-- Server version	8.4.8

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
-- Table structure for table `CATEGORIAS`
--

DROP TABLE IF EXISTS `CATEGORIAS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CATEGORIAS` (
  `id_categoria` int NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CATEGORIAS`
--

LOCK TABLES `CATEGORIAS` WRITE;
/*!40000 ALTER TABLE `CATEGORIAS` DISABLE KEYS */;
INSERT INTO `CATEGORIAS` VALUES (1,'comida');
/*!40000 ALTER TABLE `CATEGORIAS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DETALLE_VENTA`
--

DROP TABLE IF EXISTS `DETALLE_VENTA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DETALLE_VENTA` (
  `id_detalle` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` float NOT NULL,
  `subtotal` float NOT NULL,
  `VENTAS_id_venta` int NOT NULL,
  `PRODUCTOS_id_producto` int NOT NULL,
  PRIMARY KEY (`id_detalle`,`VENTAS_id_venta`),
  KEY `fk_DETALLE_VENTA_VENTAS1_idx` (`VENTAS_id_venta`),
  KEY `fk_DETALLE_VENTA_PRODUCTOS1_idx` (`PRODUCTOS_id_producto`),
  CONSTRAINT `fk_DETALLE_VENTA_PRODUCTOS1` FOREIGN KEY (`PRODUCTOS_id_producto`) REFERENCES `PRODUCTOS` (`id_producto`),
  CONSTRAINT `fk_DETALLE_VENTA_VENTAS1` FOREIGN KEY (`VENTAS_id_venta`) REFERENCES `VENTAS` (`id_venta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DETALLE_VENTA`
--

LOCK TABLES `DETALLE_VENTA` WRITE;
/*!40000 ALTER TABLE `DETALLE_VENTA` DISABLE KEYS */;
INSERT INTO `DETALLE_VENTA` VALUES (1,2,25,50,1,1);
/*!40000 ALTER TABLE `DETALLE_VENTA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRODUCTOS`
--

DROP TABLE IF EXISTS `PRODUCTOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PRODUCTOS` (
  `id_producto` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int NOT NULL,
  `VENDEDORES_id_vendedor` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `fk_PRODUCTOS_VENDEDORES1_idx` (`VENDEDORES_id_vendedor`),
  CONSTRAINT `fk_PRODUCTOS_VENDEDORES1` FOREIGN KEY (`VENDEDORES_id_vendedor`) REFERENCES `VENDEDORES` (`id_vendedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUCTOS`
--

LOCK TABLES `PRODUCTOS` WRITE;
/*!40000 ALTER TABLE `PRODUCTOS` DISABLE KEYS */;
INSERT INTO `PRODUCTOS` VALUES (1,'Pitsa','peruana',199.9,2,1);
/*!40000 ALTER TABLE `PRODUCTOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRODUCTOS_has_CATEGORIAS`
--

DROP TABLE IF EXISTS `PRODUCTOS_has_CATEGORIAS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PRODUCTOS_has_CATEGORIAS` (
  `PRODUCTOS_id_producto` int NOT NULL,
  `CATEGORIAS_id_categoria` int NOT NULL,
  PRIMARY KEY (`PRODUCTOS_id_producto`,`CATEGORIAS_id_categoria`),
  KEY `fk_PRODUCTOS_has_CATEGORIAS_CATEGORIAS1_idx` (`CATEGORIAS_id_categoria`),
  KEY `fk_PRODUCTOS_has_CATEGORIAS_PRODUCTOS1_idx` (`PRODUCTOS_id_producto`),
  CONSTRAINT `fk_PRODUCTOS_has_CATEGORIAS_CATEGORIAS1` FOREIGN KEY (`CATEGORIAS_id_categoria`) REFERENCES `CATEGORIAS` (`id_categoria`),
  CONSTRAINT `fk_PRODUCTOS_has_CATEGORIAS_PRODUCTOS1` FOREIGN KEY (`PRODUCTOS_id_producto`) REFERENCES `PRODUCTOS` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUCTOS_has_CATEGORIAS`
--

LOCK TABLES `PRODUCTOS_has_CATEGORIAS` WRITE;
/*!40000 ALTER TABLE `PRODUCTOS_has_CATEGORIAS` DISABLE KEYS */;
INSERT INTO `PRODUCTOS_has_CATEGORIAS` VALUES (1,1);
/*!40000 ALTER TABLE `PRODUCTOS_has_CATEGORIAS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIOS`
--

DROP TABLE IF EXISTS `USUARIOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USUARIOS` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(11) DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `id_usuario_UNIQUE` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIOS`
--

LOCK TABLES `USUARIOS` WRITE;
/*!40000 ALTER TABLE `USUARIOS` DISABLE KEYS */;
INSERT INTO `USUARIOS` VALUES (1,'Alexis','1234567801','Alepsis@test.com','1234'),(2,'valentino','1234567891','valentinishow@test.com','4321'),(3,'Felix','1234567811','feliz@test.com','123j');
/*!40000 ALTER TABLE `USUARIOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VENDEDORES`
--

DROP TABLE IF EXISTS `VENDEDORES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VENDEDORES` (
  `id_vendedor` int NOT NULL,
  `negocio` varchar(45) NOT NULL,
  `zona` varchar(100) NOT NULL,
  `telefono` varchar(11) NOT NULL,
  `USUARIOS_id_usuario` int NOT NULL,
  PRIMARY KEY (`id_vendedor`),
  KEY `fk_VENDEDORES_USUARIOS_idx` (`USUARIOS_id_usuario`),
  CONSTRAINT `fk_VENDEDORES_USUARIOS` FOREIGN KEY (`USUARIOS_id_usuario`) REFERENCES `USUARIOS` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VENDEDORES`
--

LOCK TABLES `VENDEDORES` WRITE;
/*!40000 ALTER TABLE `VENDEDORES` DISABLE KEYS */;
INSERT INTO `VENDEDORES` VALUES (1,'cevichito','peru','1234567890',2);
/*!40000 ALTER TABLE `VENDEDORES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VENTAS`
--

DROP TABLE IF EXISTS `VENTAS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VENTAS` (
  `id_venta` int NOT NULL,
  `fecha` date NOT NULL,
  `total` float NOT NULL,
  `metodo_pago` varchar(45) NOT NULL,
  `USUARIOS_id_usuario` int NOT NULL,
  `VENDEDORES_id_vendedor` int NOT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `fk_VENTAS_USUARIOS1_idx` (`USUARIOS_id_usuario`),
  KEY `fk_VENTAS_VENDEDORES1_idx` (`VENDEDORES_id_vendedor`),
  CONSTRAINT `fk_VENTAS_USUARIOS1` FOREIGN KEY (`USUARIOS_id_usuario`) REFERENCES `USUARIOS` (`id_usuario`),
  CONSTRAINT `fk_VENTAS_VENDEDORES1` FOREIGN KEY (`VENDEDORES_id_vendedor`) REFERENCES `VENDEDORES` (`id_vendedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VENTAS`
--

LOCK TABLES `VENTAS` WRITE;
/*!40000 ALTER TABLE `VENTAS` DISABLE KEYS */;
INSERT INTO `VENTAS` VALUES (1,'2026-05-01',199.9,'efectivo',1,1);
/*!40000 ALTER TABLE `VENTAS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-05 10:41:47
