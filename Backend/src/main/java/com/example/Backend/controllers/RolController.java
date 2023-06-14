package com.example.Backend.controllers;

import com.example.Backend.dto.RolDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/rol")
@CrossOrigin(origins = "*")
public class RolController {
    private final RolService rolService;

    @Autowired
    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    private final Logger logger = Logger.getLogger(RolController.class.getName());

    /**
     * Endpoint para guardar un rol
     * @param rolDTO datos del rol
     * @return ResponseEntity con el rol guardado
     */
    @PostMapping("/agregar")
    public ResponseEntity<RolDTO> guardarRol(@RequestBody RolDTO rolDTO) throws BadRequestException {
        return ResponseEntity.status(HttpStatus.CREATED).body(rolService.guardarRol(rolDTO));
    }

    /**
     * Endpoint para listar rol por id
     * @param id id del rol a buscar
     * @return ResponseEntity con el rol buscado
     * @throws ResourceNotFoundException si no se encuentra el rol
     */
    @GetMapping("/{id}")
    public ResponseEntity<RolDTO> buscarRol(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<RolDTO> rolBuscado = rolService.buscarRol(id);
        this.logger.info("Se encontró rol: " + rolBuscado.get().toString());
        return ResponseEntity.ok(rolBuscado.get());
    }

    /**
     * Endpoint para listar todos los roles
     * @return ResponseEntity con la lista de roles
     */
    @GetMapping
    public ResponseEntity<List<RolDTO>> listarRoles() {
        List<RolDTO> roles = rolService.buscarTodosRoles();
        this.logger.info("Se encontraron " + roles.size() + " roles");
        return ResponseEntity.ok(roles);
    }

    /**
     * Endpoint para actualizar un rol
     * @param rolDTO datos del rol
     * @return ResponseEntity con el rol actualizado
     */
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<RolDTO> actualizarRol(@PathVariable Long id,@RequestBody RolDTO rolDTO) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(rolService.actualizarRol(rolDTO));
    }

    /**
     * Endpoint para eliminar un rol
     * @param id id del rol a eliminar
     * @return ResponseEntity con el mensaje de éxito
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarRol(@PathVariable Long id) throws ResourceNotFoundException {
        rolService.eliminarRol(id);
        return ResponseEntity.ok("Se eliminó el rol con id: " + id);
    }
}