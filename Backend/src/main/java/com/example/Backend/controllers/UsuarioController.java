package com.example.Backend.controllers;

import com.example.Backend.dto.RolDTO;
import com.example.Backend.dto.UsuarioDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.MailSenderException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Usuario;
import com.example.Backend.repository.UsuarioRepository;
import com.example.Backend.service.MailService;
import com.example.Backend.service.RolService;
import com.example.Backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {
    @Value("${frontend.url}")
    private String frontendUrl;

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final MailService mailService;
    private final RolService rolService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService,UsuarioRepository usuarioRepository, MailService mailService, RolService rolService ) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.mailService = mailService;
        this.rolService = rolService;
    }

    private final Logger logger = Logger.getLogger(UsuarioController.class.getName());

    @PostMapping("/registrar")
    public ResponseEntity<UsuarioDTO> guardarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws Exception {
        // Almacenamos el usuario
        UsuarioDTO usuarioGuardado = usuarioService.guardarUsuario(usuarioDTO);

        // Enviamos el correo de validación de cuenta
        mailService.enviarCorreoValidacion(usuarioGuardado);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioGuardado);
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
        return ResponseEntity.status(HttpStatus.OK).body(usuarioBuscado.get());
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
    public ResponseEntity<UsuarioDTO> user() throws Exception {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UsuarioDTO usuario = new UsuarioDTO();
        RolDTO rolDTO = new RolDTO();
        usuario.setEmail(userDetails.getUsername());

        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByEmail(userDetails.getUsername());
        if (usuarioEncontrado.isEmpty()) {
            throw new ResourceNotFoundException("No se encontró el usuario con email: " + userDetails.getUsername());
        }

        logger.info("Se encontró el usuario: " + usuarioEncontrado.get());

        usuario.setId(usuarioEncontrado.get().getId());
        usuario.setNombre(usuarioEncontrado.get().getNombre());
        usuario.setApellido(usuarioEncontrado.get().getApellido());
        usuario.setRol(usuarioEncontrado.get().getUsuarioRol().getRol());
        usuario.setValidado(usuarioEncontrado.get().getValidado());
        usuario.setFechaCreacion(usuarioEncontrado.get().getFechaCreacion());
        rolDTO = rolService.buscarRol(usuarioEncontrado.get().getUsuarioRol().getId()).get();
        usuario.setPermisos(rolDTO.getPermisos());

        return ResponseEntity.status(HttpStatus.OK).body(usuario);
    }

    /**
     * Válida la cuenta de un usuario
     * @param id id del usuario
     * @return ResponseEntity con el mensaje de éxito
     */
    @PutMapping("/validar/{id}")
    public ResponseEntity<String> validarCuenta(@PathVariable Long id) throws Exception {
        // Checamos si existe el usuario
        Optional<UsuarioDTO> usuario = usuarioService.buscarUsuario(id);
        if (usuario.isEmpty()) {
            throw new ResourceNotFoundException("No se encontró el usuario con id: " + id);
        }

        // Checamos si la cuenta ya está validada
        logger.info("Validando cuenta del usuario: " + usuario.get());
        if (usuario.get().getValidado() != null && usuario.get().getValidado()) {
            throw new BadRequestException("La cuenta ya está validada");
        }

        // Actualizamos el campo de validación de la cuenta en la base de datos
        UsuarioDTO usuarioDTO = usuario.get();
        usuarioDTO.setValidado(true);
        usuarioDTO = usuarioService.actualizarUsuario(usuarioDTO);
        logger.info("Se validó la cuenta del usuario");

        // Enviamos correo de bienvenida
        mailService.enviarCorreoBienvenida(usuarioDTO);

        return ResponseEntity.ok("Se validó la cuenta del usuario con id: " + id);
    }

    /**
     * Actualizar un usuario
     * @param id id del usuario
     * @return ResponseEntity con el usuarioDTO
     */
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<UsuarioDTO> actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) throws Exception {
        // Checamos si existe el usuario
        Optional<UsuarioDTO> usuario = usuarioService.buscarUsuario(id);
        //Traer datos que no se envían desde el formulario de actualizar
        usuarioDTO.setPassword(usuario.get().getPassword());
        usuarioDTO.setFechaCreacion(usuario.get().getFechaCreacion());
        usuarioDTO.setValidado(usuario.get().getValidado());
        if (usuario.isEmpty()) {
            throw new ResourceNotFoundException("No se encontró el usuario con id: " + id);
        }

        return ResponseEntity.ok(usuarioService.actualizarUsuario(usuarioDTO));
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

    /**
     * Maneja la excepción MailSenderException y retorna un ResponseEntity con el mensaje de error
     * @param exc Mensaje de la excepción
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(MailSenderException.class)
    public ResponseEntity<String> handleMailSenderException(String exc) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(exc);
    }

    /**
     * Maneja la excepción IOException y retorna un ResponseEntity con el mensaje de error
     * @param exc Mensaje de la excepción
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleIOException(String exc) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exc);
    }
}
