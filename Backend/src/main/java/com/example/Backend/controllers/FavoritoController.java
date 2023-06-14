package com.example.Backend.controllers;

import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Restaurante;
import com.example.Backend.service.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.logging.Logger;

@RestController
@RequestMapping("/favoritos")
@CrossOrigin(origins = "*")
public class FavoritoController {

    private final FavoritoService favoritoService;

    private final Logger logger = Logger.getLogger(FavoritoController.class.getName());

    @Autowired
    public FavoritoController(FavoritoService favoritoService) {
        this.favoritoService = favoritoService;
    }

    @PostMapping("/{usuarioId}/{restauranteId}")
    public ResponseEntity<String> guardarFavorito(@PathVariable("usuarioId") Long usuarioId, @PathVariable("restauranteId") Long restauranteId) throws ResourceNotFoundException {
        logger.info("Guardando favorito" + usuarioId + " " + restauranteId);
        favoritoService.agregarFavorito(usuarioId, restauranteId);
        logger.info("Favorito guardado");
        return ResponseEntity.ok("restaurante agregado a favoritos");
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<Set<Restaurante>> listarFavoritos(@PathVariable("usuarioId") Long usuarioId) {
        logger.info("Listando restaurantes favoritos");
        Set<Restaurante> favoritos = favoritoService.listarFavoritos(usuarioId);
        logger.info("Se encontraron " + favoritos.size() + " restaurantes favoritos");
        return ResponseEntity.ok(favoritos);
    }

    @DeleteMapping("/{usuarioId}/{restauranteId}")
    public ResponseEntity<String> eliminarFavorito(@PathVariable("usuarioId") Long usuarioId, @PathVariable("restauranteId") Long restauranteId) throws ResourceNotFoundException {
        logger.info("Eliminando favorito" + usuarioId + " " + restauranteId);
        favoritoService.eliminarRestauranteFavorito(usuarioId, restauranteId);
        logger.info("Favorito eliminado");
        return ResponseEntity.ok("Restaurante eliminado de favoritos");
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