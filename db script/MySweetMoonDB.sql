DROP DATABASE IF EXISTS mysweetmoondb;
CREATE DATABASE mysweetmoondb;
USE mysweetmoondb;

DROP TABLE IF EXISTS rols;
CREATE TABLE rols
 (
	`id` INTEGER NOT NULL AUTO_INCREMENT ,
	`rol` varchar(11) NOT NULL ,
	PRIMARY KEY(`id`)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	`id` INTEGER NOT NULL AUTO_INCREMENT ,
    `nombre` varchar(30) NOT NULL,
    `apellido` varchar(30) NOT NULL,
    `clave` varchar(30) NOT NULL,
    `correo` varchar(30) NOT NULL,
    `rolId` INTEGER NOT NULL,
	PRIMARY KEY(`id`),
    CONSTRAINT `rol_id` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`)
);

DROP TABLE IF EXISTS contacts;
CREATE TABLE contacts (
	`id` INTEGER NOT NULL AUTO_INCREMENT ,
    `nombre` varchar(30) NOT NULL,
    `apellido` varchar(30) NOT NULL,
    `celular` varchar(30) NOT NULL,
    `correo` varchar(30) NOT NULL,
    `mensaje` varchar(200) NOT NULL,
    `fecha` DATE NOT NULL,
    `userId` INTEGER NOT NULL,
	PRIMARY KEY(`id`),
    CONSTRAINT `user_idC` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
);

  
DROP TABLE IF EXISTS quotes;
CREATE TABLE quotes (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
    `tamano` INTEGER NOT NULL,
    `nombre` VARCHAR(50),
    `isModelo` BOOL NOT NULL,
    `fecha` DATE NOT NULL,
    `userId` INTEGER NOT NULL,
	PRIMARY KEY(`id`),
    CONSTRAINT `user_Id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
);

DROP TABLE IF EXISTS ingredients;
CREATE TABLE ingredients(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`nombre` varchar(30) NOT NULL,
    `precio` FLOAT NOT NULL,
    `tipo` varchar(30) NOT NULL,
	PRIMARY KEY(`id`)
);
  

DROP TABLE IF EXISTS quote_ingredients;
CREATE TABLE quote_ingredients(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`quoteId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,
	PRIMARY KEY(`id`),
    CONSTRAINT `cotizacion_Id` FOREIGN KEY (`quoteId`) REFERENCES `quotes` (`id`),
    CONSTRAINT `ingrediente_Id` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients` (`id`)
);

DROP TABLE IF EXISTS pictures;
CREATE TABLE pictures(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`url` varchar(30) NOT NULL,
    `alt` varchar(30) NOT NULL,
    `esGaleria` BOOL NOT NULL,
	PRIMARY KEY(`id`)
);

DROP TABLE IF EXISTS news;
CREATE TABLE news(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`fecha` DATE NOT NULL,
    `titulo` varchar(30) NOT NULL,
    `subtitulo` varchar(100) NOT NULL,
    `contenido` varchar(1000) NOT NULL,
	`userId` INTEGER NOT NULL,
    `pictureId` INTEGER NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `userNId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
    CONSTRAINT `pictureNId` FOREIGN KEY (`pictureId`) REFERENCES `pictures` (`id`)
);

DROP TABLE IF EXISTS products;
CREATE TABLE products(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` varchar(30) NOT NULL,
    `caracteristicas` varchar(100) NOT NULL,
    `pictureId` INTEGER NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `picturePId` FOREIGN KEY (`pictureId`) REFERENCES `pictures` (`id`)
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `mensaje` varchar(500) NOT NULL,
    `userId` INTEGER NOT NULL,
    `newId` INTEGER NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `userCId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
    CONSTRAINT `newCId` FOREIGN KEY (`newId`) REFERENCES `news` (`id`)
);
