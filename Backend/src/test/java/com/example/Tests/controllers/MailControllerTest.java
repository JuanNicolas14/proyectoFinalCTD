package com.example.Tests.controllers;
import com.example.Backend.controllers.MailController;
import com.example.Backend.dto.UsuarioDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.service.MailService;
import com.example.Backend.service.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class MailControllerTest {
    @Mock
    private MailService mailService;

    @Mock
    private UsuarioService usuarioService;

    @InjectMocks
    private MailController mailController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testEnviarCorreoValidacion_ValidUser() throws Exception {
        Long userId = 1L;
        UsuarioDTO usuario = new UsuarioDTO();
        usuario.setId(userId);
        Optional<UsuarioDTO> usuarioOptional = Optional.of(usuario);

        // Configurar el comportamiento esperado del servicio y del controlador
        when(usuarioService.buscarUsuario(userId)).thenReturn(usuarioOptional);

        // Llamar al método del controlador y verificar el comportamiento esperado
        mailController.enviarCorreoValidacion(userId);

        // Verificar que el método del servicio fue llamado una vez
        verify(mailService, times(1)).enviarCorreoValidacion(usuario);
    }

    @Test
    void testEnviarCorreoValidacion_InvalidUser() throws Exception {
        Long userId = 1L;
        Optional<UsuarioDTO> usuarioOptional = Optional.empty();

        // Configurar el comportamiento esperado del servicio y del controlador
        when(usuarioService.buscarUsuario(userId)).thenReturn(usuarioOptional);

        // Llamar al método del controlador y verificar que lanza una excepción BadRequestException
        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            mailController.enviarCorreoValidacion(userId);
        });

        // Verificar el mensaje de error de la excepción
        assertEquals("Usuario no encontrado", exception.getMessage());

        // Verificar que el método del servicio no fue llamado
        verify(mailService, never()).enviarCorreoValidacion(any());
    }

    @Test
    void testEnviarCorreoValidacion_TooManyRequests() throws Exception {
        Long userId = 1L;
        HashMap<Long, HashMap<String, Long>> solicitudes = new HashMap<>();
        HashMap<String, Long> solicitudesUsuario = new HashMap<>();
        solicitudesUsuario.put("solicitudes", 4L);
        solicitudesUsuario.put("timestamp", System.currentTimeMillis() / 1000 - 30);
        solicitudes.put(userId, solicitudesUsuario);

        // Configurar el comportamiento esperado del controlador
        mailController.setSolicitudes(solicitudes);

        // Llamar al método del controlador y verificar que lanza una excepción BadRequestException
        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            mailController.enviarCorreoValidacion(userId);
        });

        // Verificar el mensaje de error de la excepción
        assertEquals("Demasiadas solicitudes de validación", exception.getMessage());

        // Verificar que el método del servicio no fue llamado
        verify(mailService, never()).enviarCorreoValidacion(any());
    }

    @Test
    void testEnviarCorreoBienvenida_ValidUser() throws Exception {
        Long userId = 1L;
        UsuarioDTO usuario = new UsuarioDTO();
        usuario.setId(userId);
        Optional<UsuarioDTO> usuarioOptional = Optional.of(usuario);

        // Configurar el comportamiento esperado del servicio y del controlador
        when(usuarioService.buscarUsuario(userId)).thenReturn(usuarioOptional);

        // Llamar al método del controlador y verificar el comportamiento esperado
        mailController.enviarCorreoBienvenida(userId);

        // Verificar que el método del servicio fue llamado una vez
        verify(mailService, times(1)).enviarCorreoBienvenida(usuario);
    }

    @Test
    void testEnviarCorreoBienvenida_InvalidUser() throws Exception {
        Long userId = 1L;
        Optional<UsuarioDTO> usuarioOptional = Optional.empty();

        // Configurar el comportamiento esperado del servicio y del controlador
        when(usuarioService.buscarUsuario(userId)).thenReturn(usuarioOptional);

        // Llamar al método del controlador y verificar que lanza una excepción BadRequestException
        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            mailController.enviarCorreoBienvenida(userId);
        });

        // Verificar el mensaje de error de la excepción
        assertEquals("Usuario no encontrado", exception.getMessage());

        // Verificar que el método del servicio no fue llamado
        verify(mailService, never()).enviarCorreoBienvenida(any());
    }

    @Test
    void testHandleBadRequestException() {
        BadRequestException exception = new BadRequestException("Error");

        // Llamar al método de manejo de excepciones y verificar la respuesta
        ResponseEntity<String> response = mailController.handleBadRequestException(exception);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Error", response.getBody());
    }
}

