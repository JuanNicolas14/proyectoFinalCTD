package com.example.Tests.controllers;
import com.example.Backend.controllers.UsuarioController;
import com.example.Backend.dto.UsuarioDTO;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.service.MailService;
import com.example.Backend.service.RolService;
import com.example.Backend.service.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UsuarioControllerTest {

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private MailService mailService;

    @Mock
    private RolService rolService;

    @InjectMocks
    private UsuarioController usuarioController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGuardarUsuario() throws Exception {
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        // Configurar el usuarioDTO y el usuarioService según sea necesario

        UsuarioDTO usuarioGuardado = usuarioDTO; // Cambiar esto por el usuarioDTO guardado real

        ResponseEntity<UsuarioDTO> expectedResponse = ResponseEntity.status(HttpStatus.CREATED).body(usuarioGuardado);

        when(usuarioService.guardarUsuario(usuarioDTO)).thenReturn(usuarioGuardado);

        ResponseEntity<UsuarioDTO> actualResponse = usuarioController.guardarUsuario(usuarioDTO);

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());

        verify(usuarioService, times(1)).guardarUsuario(usuarioDTO);
        // Verificar cualquier otra interacción necesaria
    }

    @Test
    public void testBuscarUsuario() throws ResourceNotFoundException {
        Long usuarioId = 1L;
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        // Configurar el usuarioDTO y el usuarioService según sea necesario

        ResponseEntity<UsuarioDTO> expectedResponse = ResponseEntity.status(HttpStatus.OK).body(usuarioDTO);

        when(usuarioService.buscarUsuario(usuarioId)).thenReturn(Optional.of(usuarioDTO));

        ResponseEntity<UsuarioDTO> actualResponse = usuarioController.buscarUsuario(usuarioId);

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());

        verify(usuarioService, times(1)).buscarUsuario(usuarioId);
        // Verificar cualquier otra interacción necesaria
    }

    @Test
    public void testListarUsuarios() {
        List<UsuarioDTO> usuarios = List.of(new UsuarioDTO(), new UsuarioDTO());
        // Configurar los usuarios y el usuarioService según sea necesario

        ResponseEntity<List<UsuarioDTO>> expectedResponse = ResponseEntity.ok(usuarios);

        when(usuarioService.buscarTodosUsuarios()).thenReturn(usuarios);

        ResponseEntity<List<UsuarioDTO>> actualResponse = usuarioController.listarUsuarios();

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());

        verify(usuarioService, times(1)).buscarTodosUsuarios();
        // Verificar cualquier otra interacción necesaria
    }

    @Test
    public void testEliminarUsuario() throws ResourceNotFoundException {
        Long id = 1L;

        ResponseEntity<String> expectedResponse = ResponseEntity.ok("Se eliminó el usuario con id: " + id);

        ResponseEntity<String> actualResponse = usuarioController.eliminarUsuario(id);

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());

        verify(usuarioService, times(1)).eliminarUsuario(id);
    }

    @Test
    public void testValidarCuenta() throws Exception {
        Long id = 1L;

        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(id);
        usuarioDTO.setValidado(false);

        when(usuarioService.buscarUsuario(id)).thenReturn(Optional.of(usuarioDTO));
        when(usuarioService.actualizarUsuario(usuarioDTO)).thenReturn(usuarioDTO);

        ResponseEntity<String> response = usuarioController.validarCuenta(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Se validó la cuenta del usuario con id: " + id, response.getBody());

        verify(usuarioService, times(1)).buscarUsuario(id);
        verify(usuarioService, times(1)).actualizarUsuario(usuarioDTO);
        verify(mailService, times(1)).enviarCorreoBienvenida(usuarioDTO);
    }

    @Test
    public void testActualizarUsuario() throws Exception {
        Long id = 1L;

        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(id);
        usuarioDTO.setNombre("John");
        usuarioDTO.setApellido("Doe");

        when(usuarioService.buscarUsuario(id)).thenReturn(Optional.of(usuarioDTO));
        when(usuarioService.actualizarUsuario(usuarioDTO)).thenReturn(usuarioDTO);

        ResponseEntity<UsuarioDTO> response = usuarioController.actualizarUsuario(id, usuarioDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(usuarioDTO, response.getBody());

        verify(usuarioService, times(1)).buscarUsuario(id);
        verify(usuarioService, times(1)).actualizarUsuario(usuarioDTO);
    }
}