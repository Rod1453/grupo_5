CREATE DATABASE `book_market`;

USE `book_market`;

CREATE TABLE `theme` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombre` varchar(50) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

CREATE TABLE `product` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`theme_id` INT NOT NULL,
	`titulo` varchar(50) NOT NULL,
	`autor` varchar(50) NOT NULL,
	`editorial` varchar(50) NOT NULL,
	`paginas` INT NOT NULL,
	`idioma` varchar(50) NOT NULL,
	`tipo_tapa` varchar(50) NOT NULL,
	`precio` double NOT NULL,
	`sinopsis` TEXT,
	`stock` INT NOT NULL,
	`fecha_emision` DATE NOT NULL,
	`imagen` varchar(150),
	PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombre` varchar(50) NOT NULL,
	`apellido` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL UNIQUE,
	`password` varchar(30) NOT NULL,
	`categoria` varchar(50) NOT NULL DEFAULT 'comprador',
	`imagen` varchar(150),
	PRIMARY KEY (`id`)
);

CREATE TABLE `shopping_cart` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`fecha` DATE NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `detail` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`product_id` INT NOT NULL,
	`carrito_id` INT NOT NULL,
	`precio` double NOT NULL,
	`cantidad` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `product` ADD CONSTRAINT `product_fk0` FOREIGN KEY (`theme_id`) REFERENCES `theme`(`id`);

ALTER TABLE `shopping_cart` ADD CONSTRAINT `shopping_cart_fk0` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`);

ALTER TABLE `detail` ADD CONSTRAINT `detail_fk0` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`);

ALTER TABLE `detail` ADD CONSTRAINT `detail_fk1` FOREIGN KEY (`carrito_id`) REFERENCES `shopping_cart`(`id`);


