/**
 * Define los endpoints para el controlador de Restaurante
 */
package com.example.Backend.controllers;

import com.example.Backend.models.Restaurante;
import com.example.Backend.service.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.logging.Logger;


/**
 * Define los endpoints para el controlador de Restaurante
 * Provee los métodos para listar, guardar, actualizar y eliminar Restaurante
 */
@RestController
@RequestMapping("/restaurante")
public class RestauranteController {
    // TODO: Proteger algunos endpoints con roles
    private Logger logger = Logger.getLogger(Restaurante.class.getName());
    private RestauranteService RestauranteService;

    /**
     * Constructor de RestauranteController
     * @param RestauranteService
     */
    @Autowired
    public RestauranteController(RestauranteService RestauranteService) {
        this.RestauranteService = RestauranteService;
    }

    /**
     * Endpoint para guardar un restaurante
     * @param restaurante restaurante a guardar
     * @return ResponseEntity con el restaurante guardado
     */
    @PostMapping
    public ResponseEntity<Restaurante> guardarRestaurante(@RequestBody Restaurante restaurante) {
        // TODO: Se debe validar que el restaurante no exista con el mismo nombre
        this.logger.info("Guardando restaurante: " + restaurante.toString());
        Restaurante restauranteGuardado = RestauranteService.guardarRestaurante(restaurante);
        this.logger.info("Se guardó el restaurante: " + restauranteGuardado.toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(restauranteGuardado);
    }

    /**
     * Maneja la excepción SQLException y retorna un ResponseEntity con el mensaje de error
     * @param exc instancia de SQLException
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<String> handleSQLException(SQLException exc) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exc.getMessage());
    }
}
