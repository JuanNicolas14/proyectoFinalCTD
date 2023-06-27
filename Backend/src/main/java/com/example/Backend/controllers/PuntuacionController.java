package com.example.Backend.controllers;


import com.example.Backend.dto.PuntuacionDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.repository.UsuarioRepository;
import com.example.Backend.service.PuntuacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/puntuacion")
@CrossOrigin(origins = "*")
public class PuntuacionController {
    private final PuntuacionService puntuacionService;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public PuntuacionController(PuntuacionService puntuacionService, UsuarioRepository usuarioRepository) {
        this.puntuacionService = puntuacionService;
        this.usuarioRepository = usuarioRepository;
    }

    private final Logger logger = Logger.getLogger(PuntuacionController.class.getName());

    @PostMapping("/agregar")
    public ResponseEntity<PuntuacionDTO> guardarPuntuacion(@RequestBody PuntuacionDTO puntuacionDTO) throws BadRequestException {
        // Almacenar puntuación

        return ResponseEntity.status(HttpStatus.CREATED).body(puntuacionService.guardarPuntuacion(puntuacionDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PuntuacionDTO> buscarPuntuacion(@PathVariable Long id) throws ResourceNotFoundException {
        this.logger.info("Buscando Puntuación con id: " + id);
        Optional<PuntuacionDTO> puntuacionBuscada = puntuacionService.buscarPuntuacion(id);
        if (puntuacionBuscada.isEmpty()) {
            this.logger.warning("No se encontró puntuación con id: " + id);
            throw new ResourceNotFoundException("No se encontró puntuación con id: " + id);
        }
        this.logger.info("Se encontró puntuación: " + puntuacionBuscada);
        return ResponseEntity.ok(puntuacionBuscada.get());
    }

    @GetMapping
    public ResponseEntity<List<PuntuacionDTO>> listarPuntuaciones() {
        this.logger.info("Listando puntuaciones");
        List<PuntuacionDTO> puntuaciones = puntuacionService.buscarTodasPuntuaciones();
        this.logger.info("Se encontraron " + puntuaciones.size() + " puntuaciones");
        return ResponseEntity.ok(puntuaciones);
    }

    @GetMapping("/restaurante/{id}")
    public ResponseEntity<List<PuntuacionDTO>> buscarPuntuacionesPorRestauranteId(@PathVariable Long id) throws ResourceNotFoundException {
        List<PuntuacionDTO> todasLasPuntuaciones = puntuacionService.buscarTodasPuntuaciones();
        List<PuntuacionDTO> puntuacionesRestauranteBuscado = new ArrayList<>();

        for (PuntuacionDTO puntuacionEncontrada : todasLasPuntuaciones) {
            if (puntuacionEncontrada.getRestaurante_id().equals(id)){
                puntuacionesRestauranteBuscado.add(puntuacionEncontrada);
            }
        }
        this.logger.info("Se encontraron " + puntuacionesRestauranteBuscado.size() + " puntuaciones para el restaurante");
        return ResponseEntity.ok(puntuacionesRestauranteBuscado);
    }

}
