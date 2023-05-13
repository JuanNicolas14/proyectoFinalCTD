/**
 * Define los endpoints para el controlador de Restaurante
 */
package com.example.Backend.controllers;

import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Restaurante;
import com.example.Backend.service.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;


/**
 * Define los endpoints para el controlador de Restaurante
 * Provee los métodos para listar, guardar, actualizar y eliminar Restaurante
 */
@RestController
@RequestMapping("/restaurante")
@CrossOrigin(origins = "*")
public class RestauranteController {
    // TODO: Proteger algunos endpoints con roles
    private Logger logger = Logger.getLogger(Restaurante.class.getName());
    private RestauranteService RestauranteService;

    /**
     * Constructor de RestauranteController
     * @param RestauranteService instancia de RestauranteService
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
     * Endpoint para listar todos los restaurantes
     * @param id id del restaurante a buscar
     * @return ResponseEntity con el restaurante buscado
     * @throws ResourceNotFoundException si no se encuentra el restaurante
     */
    @GetMapping("/{id}")
    public ResponseEntity<Restaurante> buscarRestaurante(@PathVariable Long id) throws ResourceNotFoundException {
        this.logger.info("Buscando restaurante con id: " + id);
        Optional<Restaurante> restauranteBuscado = RestauranteService.buscarRestaurante(id);
        if (restauranteBuscado.isEmpty()) {
            this.logger.warning("No se encontró el restaurante con id: " + id);
            throw new ResourceNotFoundException("No se encontró el restaurante con id: " + id);
        }
        this.logger.info("Se encontró el restaurante: " + restauranteBuscado);
        return ResponseEntity.ok(restauranteBuscado.get());
    }

    /**
     * Endpoint para listar todos los restaurantes
     * @return ResponseEntity con la lista de restaurantes
     */
    @GetMapping("/")
    public List<Restaurante> listarRestaurantes() {
        this.logger.info("Listando restaurantes");
        List<Restaurante> restaurantes = RestauranteService.buscarTodosRestaurantes();
        this.logger.info("Se encontraron " + restaurantes.size() + " restaurantes");
        return restaurantes;
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

    /**
     * Maneja la excepción ResourceNotFoundException y retorna un ResponseEntity con el mensaje de error
     * @param exc instancia de ResourceNotFoundException
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException exc) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exc.getMessage());
    }
}
