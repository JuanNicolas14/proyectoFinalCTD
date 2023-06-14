package com.example.Backend.controllers;

import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Permiso;
import com.example.Backend.service.PermisoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/permiso")
@CrossOrigin(origins = "*")
public class PermisoController {
    private final PermisoService permisoService;

    @Autowired
    public PermisoController(PermisoService permisoService) {
        this.permisoService = permisoService;
    }

    private final Logger logger = Logger.getLogger(PermisoController.class.getName());

    /**
     * Endpoint para listar permiso por id
     * @param id del permiso a buscar
     * @return ResponseEntity con el permiso buscado
     * @throws ResourceNotFoundException si no se encuentra el permiso
     */
    @GetMapping("/{id}")
    public ResponseEntity<Permiso> buscarPermiso(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Permiso> permisoBuscado = permisoService.buscarPermiso(id);
        this.logger.info("Se encontró permiso: " + permisoBuscado.get().toString());
        return ResponseEntity.ok(permisoBuscado.get());
    }

    /**
     * Endpoint para listar todos los permisos
     * @return ResponseEntity con la lista de permisos
     */
    @GetMapping
    public ResponseEntity<List<Permiso>> listarPermisos() {
        List<Permiso> permisos = permisoService.buscarTodosPermisos();
        this.logger.info("Se encontraron " + permisos.size() + " permisos");
        return ResponseEntity.ok(permisos);
    }
}