-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bukinfood
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bukinfood
-- -----------------------------------------------------
DROP SCHEMA `bukinfood`;
CREATE SCHEMA IF NOT EXISTS `bukinfood` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bukinfood` ;

-- -----------------------------------------------------
-- Table `bukinfood`.`ciudad`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `bukinfood`.`ciudad` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_ciudad` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`ciudad`;

-- -----------------------------------------------------
-- Table `bukinfood`.`pais`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`pais` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`pais`;

-- -----------------------------------------------------
-- Table `bukinfood`.`domicilio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`domicilio` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `calle` VARCHAR(30) NOT NULL,
  `latitud` DECIMAL(19,2) NOT NULL,
  `localidad` VARCHAR(30) NOT NULL,
  `longitud` DECIMAL(19,2) NOT NULL,
  `numero` VARCHAR(10) NOT NULL,
  `ciudad_id` INT NOT NULL,
  `pais_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKs3ildeq7m5cip6skf9rmuh8wp` (`ciudad_id` ASC) VISIBLE,
  INDEX `FKobk534u3dd3fqeumuch9kw2jv` (`pais_id` ASC) VISIBLE,
  CONSTRAINT `FKobk534u3dd3fqeumuch9kw2jv`
    FOREIGN KEY (`pais_id`)
    REFERENCES `bukinfood`.`pais` (`id`),
  CONSTRAINT `FKs3ildeq7m5cip6skf9rmuh8wp`
    FOREIGN KEY (`ciudad_id`)
    REFERENCES `bukinfood`.`ciudad` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 55
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`domicilio`;

-- -----------------------------------------------------
-- Table `bukinfood`.`plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`plan` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(50) NOT NULL,
  `imagen` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 47
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`plan`;

-- -----------------------------------------------------
-- Table `bukinfood`.`restaurante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`restaurante` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `menu` VARCHAR(500) NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `numero_valoraciones` INT NOT NULL,
  `politicas` VARCHAR(255) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `puntuacion_promedio` DOUBLE NOT NULL,
  `reglas_restaurante` VARCHAR(255) NOT NULL,
  `salud_seguridad` VARCHAR(255) NOT NULL,
  `domicilio_id` INT NOT NULL,
  `plan_id` INT NOT NULL,
  `hora_apertura` VARCHAR(15) NOT NULL,
  `hora_cierre` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK1v9yqboatwgmq3ujas9ys1fd7` (`domicilio_id` ASC) VISIBLE,
  INDEX `FKsjkhytnioroq2k9rq6u0msns2` (`plan_id` ASC) VISIBLE,
  CONSTRAINT `FK1v9yqboatwgmq3ujas9ys1fd7`
    FOREIGN KEY (`domicilio_id`)
    REFERENCES `bukinfood`.`domicilio` (`id`),
  CONSTRAINT `FKsjkhytnioroq2k9rq6u0msns2`
    FOREIGN KEY (`plan_id`)
    REFERENCES `bukinfood`.`plan` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 34
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`restaurante`;

-- -----------------------------------------------------
-- Table `0523TDPROM1C01LAED0822FT_GRUPO7`.`usuario_rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`usuario_rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`usuario_rol`;

-- -----------------------------------------------------
-- Table `0523TDPROM1C01LAED0822FT_GRUPO7`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `apellido` VARCHAR(30) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `fecha_creacion` DATETIME(6) NOT NULL,
  `nombre` VARCHAR(30) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `validado` BIT(1) NULL DEFAULT NULL,
  `rol_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKbl9l2tfkiy0krho63kbqmlwyf` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `FKbl9l2tfkiy0krho63kbqmlwyf`
    FOREIGN KEY (`rol_id`)
    REFERENCES `bukinfood`.`usuario_rol` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`usuario`;

-- -----------------------------------------------------
-- Table `bukinfood`.`favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`favoritos` (
  `id_restaurante` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_restaurante`, `id_usuario`),
  INDEX `FKkpk6h5wfyvml47qw0uo7vhddt` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `FKkpk6h5wfyvml47qw0uo7vhddt`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bukinfood`.`restaurante` (`id`),
  CONSTRAINT `FKl5ngouweccuwlai70djg0jkvw`
    FOREIGN KEY (`id_restaurante`)
    REFERENCES `bukinfood`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bukinfood`.`imagen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`imagen` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  `restaurante_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK16u7gue6xdqaw9g833n9fa85t` (`restaurante_id` ASC) VISIBLE,
  CONSTRAINT `FK16u7gue6xdqaw9g833n9fa85t`
    FOREIGN KEY (`restaurante_id`)
    REFERENCES `bukinfood`.`restaurante` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 177
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`imagen`;

-- -----------------------------------------------------
-- Table `bukinfood`.`permiso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`permiso` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`permiso`;

-- -----------------------------------------------------
-- Table `bukinfood`.`puntuacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`puntuacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `puntuacion` INT NOT NULL,
  `restaurante_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `comentario` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKtq8opuynm4bdma700ri27j1yj` (`restaurante_id` ASC) VISIBLE,
  INDEX `FK5n8pewrfbucrxps483lc57l5` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `FK5n8pewrfbucrxps483lc57l5`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `bukinfood`.`usuario` (`id`),
  CONSTRAINT `FKtq8opuynm4bdma700ri27j1yj`
    FOREIGN KEY (`restaurante_id`)
    REFERENCES `bukinfood`.`restaurante` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 179
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`puntuacion`;

-- -----------------------------------------------------
-- Table `bukinfood`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`reserva` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `direccion_entrega` VARCHAR(50) NOT NULL,
  `fecha_finalizacion` DATETIME(6) NOT NULL,
  `fecha_inicio` DATETIME(6) NOT NULL,
  `hora_entrega` VARCHAR(15) NOT NULL,
  `ciudad_id` INT NOT NULL,
  `restaurante_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `telefono_usuario` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKnsoo7lam9pft4jgl8vdu6tt3x` (`ciudad_id` ASC) VISIBLE,
  INDEX `FKcnqpenp1yqdt6evx6rwo341a6` (`restaurante_id` ASC) VISIBLE,
  INDEX `FKiad9w96t12u3ms2ul93l97mel` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `FKcnqpenp1yqdt6evx6rwo341a6`
    FOREIGN KEY (`restaurante_id`)
    REFERENCES `bukinfood`.`restaurante` (`id`),
  CONSTRAINT `FKiad9w96t12u3ms2ul93l97mel`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `bukinfood`.`usuario` (`id`),
  CONSTRAINT `FKnsoo7lam9pft4jgl8vdu6tt3x`
    FOREIGN KEY (`ciudad_id`)
    REFERENCES `bukinfood`.`ciudad` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 39
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bukinfood`.`rol_permiso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bukinfood`.`rol_permiso` (
  `rol_id` INT NOT NULL,
  `permiso_id` INT NOT NULL,
  INDEX `FKfyao8wd0o5tsyem1w55s3141k` (`permiso_id` ASC) VISIBLE,
  INDEX `FKh73fcnkkke6wpw8yft40kw8yj` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `FKfyao8wd0o5tsyem1w55s3141k`
    FOREIGN KEY (`permiso_id`)
    REFERENCES `bukinfood`.`permiso` (`id`),
  CONSTRAINT `FKh73fcnkkke6wpw8yft40kw8yj`
    FOREIGN KEY (`rol_id`)
    REFERENCES `bukinfood`.`usuario_rol` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
TRUNCATE TABLE `bukinfood`.`rol_permiso`;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
