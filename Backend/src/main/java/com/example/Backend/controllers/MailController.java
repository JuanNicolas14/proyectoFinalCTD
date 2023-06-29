package com.example.Backend.controllers;

import com.example.Backend.dto.UsuarioDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.service.MailService;
import com.example.Backend.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/mail")
@CrossOrigin(origins = "*")
public class MailController {
    private final UsuarioService usuarioService;
    private final MailService mailService;

    private final Logger logger = Logger.getLogger(MailController.class.getName());

    private HashMap<Long, HashMap<String, Long>> solicitudes = new HashMap<>();


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
        // Validamos que no se haga spam de solicitudes
        // HashMap de solicitudes del usuario (ID, (numero de solicitudes, timestamp primera solicitud))
        HashMap<String, Long> solicitudesUsuario = solicitudes.get(id);
        if (solicitudesUsuario == null) {
            solicitudesUsuario = new HashMap<String, Long>();
            solicitudesUsuario.put("solicitudes", 1L);
            solicitudesUsuario.put("timestamp", System.currentTimeMillis() / 1000);
            solicitudes.put(id, solicitudesUsuario);
        }
        logger.info("ID: " + id);
        logger.info("Solicitudes: " + solicitudesUsuario.get("solicitudes"));
        logger.info("Timestamp: " + solicitudesUsuario.get("timestamp"));

        // Si el usuario ha hecho más de 3 solicitudes en el ultimo minuto, se rechaza la solicitud
        if (solicitudesUsuario.get("solicitudes") > 3 && (System.currentTimeMillis() / 1000) - solicitudesUsuario.get("timestamp") < 60) {
            throw new BadRequestException("Demasiadas solicitudes de validación");
        }

        // Si han pasado más de 60 segundos desde la primera solicitud, se resetea el contador
        if ((System.currentTimeMillis() / 1000) - solicitudesUsuario.get("timestamp") > 60) {
            solicitudesUsuario.put("solicitudes", 1L);
            solicitudesUsuario.put("timestamp", System.currentTimeMillis() / 1000);
        } else {
            solicitudesUsuario.put("solicitudes", solicitudesUsuario.get("solicitudes") + 1);
        }

        Optional<UsuarioDTO> usuario = usuarioService.buscarUsuario(id);
        if (usuario.isEmpty()) {
            throw new BadRequestException("Usuario no encontrado");
        }

        mailService.enviarCorreoValidacion(usuario.get());
    }

    /**
     * Envía un correo de bienvenida al usuario
     * @param id ID del usuario
     * @throws Exception Si el usuario no existe o cualquier otro error
     */
    @GetMapping("/bienvenida/{id}")
    public void enviarCorreoBienvenida(@PathVariable Long id) throws Exception {
        Optional<UsuarioDTO> usuario = usuarioService.buscarUsuario(id);
        if (usuario.isEmpty()) {
            throw new BadRequestException("Usuario no encontrado");
        }

        mailService.enviarCorreoBienvenida(usuario.get());
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

    public void setSolicitudes(HashMap<Long, HashMap<String, Long>> solicitudes) {
        this.solicitudes = solicitudes;
    }
}
