package com.example.Backend.controllers;

import com.example.Backend.dto.UsuarioDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Usuario;
import com.example.Backend.repository.UsuarioRepository;
import com.example.Backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {
    private UsuarioService usuarioService;
    private UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioController(UsuarioService usuarioService,UsuarioRepository usuarioRepository ) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    private Logger logger = Logger.getLogger(UsuarioController.class.getName());

    @PostMapping("/registrar")
    public ResponseEntity<UsuarioDTO> guardarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws BadRequestException {
        return ResponseEntity.ok(usuarioService.guardarUsuario(usuarioDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscarUsuario(@PathVariable Long id) throws ResourceNotFoundException {
        this.logger.info("Buscando Usuario con id: " + id);
        Optional<UsuarioDTO> usuarioBuscado = usuarioService.buscarUsuario(id);
        if (usuarioBuscado.isEmpty()) {
            this.logger.warning("No se encontró el usuario con id: " + id);
            throw new ResourceNotFoundException("No se encontró el usuario con id: " + id);
        }
        this.logger.info("Se encontró el usuario: " + usuarioBuscado);
        return ResponseEntity.ok(usuarioBuscado.get());
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios() {
        this.logger.info("Listando usuarios");
        List<UsuarioDTO> usuarios = usuarioService.buscarTodosUsuarios();
        this.logger.info("Se encontraron " + usuarios.size() + " usuarios");
        return ResponseEntity.ok(usuarios);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) throws ResourceNotFoundException {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.ok("Se eliminó el usuario con id: " + id);
    }

    @GetMapping("/detalle")
    public ResponseEntity<UsuarioDTO> user() throws Exception{

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UsuarioDTO usuario = new UsuarioDTO();
        usuario.setEmail(userDetails.getUsername());

        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByEmail(userDetails.getUsername());

        usuario.setId(usuarioEncontrado.get().getId());
        usuario.setNombre(usuarioEncontrado.get().getNombre());
        usuario.setApellido(usuarioEncontrado.get().getApellido());
        usuario.setRol(usuarioEncontrado.get().getUsuarioRol().getRol());

        return ResponseEntity.ok(usuario);
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
