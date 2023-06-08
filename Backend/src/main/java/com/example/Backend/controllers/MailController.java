package com.example.Backend.controllers;

import com.example.Backend.dto.UsuarioDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.service.MailService;
import com.example.Backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/mail")
@CrossOrigin(origins = "*")
public class MailController {
    private final UsuarioService usuarioService;
    private final MailService mailService;

    @Autowired
    public MailController(MailService mailService, UsuarioService usuarioService) {
        this.mailService = mailService;
        this.usuarioService = usuarioService;
    }

    /**
     * Envía un correo de validación de cuenta
     * @param id ID del usuario
     * @throws Exception Si el usuario no existe o cualquier otro error
     */
    @GetMapping("/validacion/{id}")
    public void enviarCorreoValidacion(@PathVariable Long id) throws Exception {
        Optional<UsuarioDTO> usuario = usuarioService.buscarUsuario(id);
        if (usuario.isEmpty()) {
            throw new BadRequestException("Usuario no encontrado");
        }

        mailService.enviarCorreoValidacion(usuario.get());
    }

    /**
     * Maneja la excepción BadRequestException
     * @param exc Excepción
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> handleBadRequestException(BadRequestException exc) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exc.getMessage());
    }
}
