/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `citas`;
CREATE TABLE `citas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `usuarioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId_idx` (`usuarioId`),
  CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `citasservicios`;
CREATE TABLE `citasservicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `citaId` int DEFAULT NULL,
  `servicioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `citaId_idx` (`citaId`),
  KEY `servicioId_idx` (`servicioId`),
  CONSTRAINT `citasservicios_ibfk_1` FOREIGN KEY (`citaId`) REFERENCES `citas` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `citasservicios_ibfk_2` FOREIGN KEY (`servicioId`) REFERENCES `servicios` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE `servicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,
  `precio` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,
  `apellido` varchar(60) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `contrasena` varchar(60) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `admin` tinyint DEFAULT NULL,
  `confirmado` tinyint DEFAULT NULL,
  `token` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

INSERT INTO `citas` (`id`, `fecha`, `hora`, `usuarioId`) VALUES
(3, '2025-10-08', '15:12:00', 5),
(4, '2025-10-21', '16:36:00', 5),
(5, '2025-10-29', '17:37:00', 5),
(6, '2025-10-14', '15:41:00', 5),
(7, '2025-10-22', '17:25:00', 5),
(8, '2025-10-13', '10:46:00', 5);
INSERT INTO `citasservicios` (`id`, `citaId`, `servicioId`) VALUES
(1, 7, 1),
(2, 7, 2),
(3, 8, 1),
(4, 8, 6);
INSERT INTO `servicios` (`id`, `nombre`, `precio`) VALUES
(1, 'Corte de Cabello Mujer', '90.00'),
(2, 'Corte de Cabello Hombre', '80.00'),
(3, 'Corte de Cabello Niña', '60.00'),
(4, 'Peinado Mujer', '80.00'),
(5, 'Peinado Hombre', '60.00'),
(6, 'Peinado Niño', '60.00'),
(7, 'Corte de Barba', '60.00'),
(8, 'Tinte Mujer', '300.00'),
(9, 'Uñas', '400.00'),
(10, 'Lavado de Cabello', '50.00'),
(11, 'Tratamiento Capilar', '150.00');
INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `contrasena`, `telefono`, `admin`, `confirmado`, `token`) VALUES
(1, 'Michelle', 'Berrio ', 'correo@correo.com', '12345678', '123456789', NULL, 1, NULL),
(2, ' sfsdf', 'f', 'dsfdsf@sfsdfsdf', '$2y$10$Hp1K0.W1a9DeBsXVwAt9i.upjbYb7ZJ9.gZ9E8NpYXA5ywRc/GL2i', '1234567891', 0, 0, ''),
(3, ' usuario', 'nuevo', 'correo2@correo.com', '$2y$10$AOgCkfA436Nh1LyjnIngd.vT3ZmiJ.TGG1c9DZo9RNei3YJholLHi', '1234567891', 0, 0, ''),
(4, ' usuario', 'nuevo', 'dsfdsf@sfsdfsdfzxz', '$2y$10$sZ3OMBNTyvBKW40fR5MjaepqUlBJD/ysbcFTm81z/FUsyk.9zgt/a', '1234567891', 0, 1, ''),
(5, ' prueba', 'nuevo', 'prueba2@prueba.com', '$2y$10$vm1FEtdl4iqd4SyatL3XC.NVLXCpnNTPK8g3CVJUoX1/qzVv8BHUS', '1234567891', 0, 1, ''),
(6, ' usuario', 'nuevo', 'jiric98510@linxues.com', '$2y$10$qDLWFiU4nP7x4QajpKQl7OBI92U.u0pYiAXN5nhJbOroMa5ht0Q32', '1234567891', 0, 1, ''),
(7, ' Admin', 'Admin', 'admin@admin.com', '$2y$10$dKcKZi7ckGxmG.cOQdQW5.2Om9qKQIPQakQkftMyjhMHF4kw3.TUa', '1234567891', 1, 1, '');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;