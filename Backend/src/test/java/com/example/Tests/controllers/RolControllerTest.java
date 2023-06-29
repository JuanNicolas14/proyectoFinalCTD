package com.example.Tests.controllers;
import com.example.Backend.controllers.RolController;
import com.example.Backend.dto.RolDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.service.RolService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class RolControllerTest {
    @Mock
    private RolService rolService;

    @InjectMocks
    private RolController rolController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGuardarRol() throws BadRequestException {
        RolDTO rolDTO = new RolDTO();
        // Configurar el comportamiento esperado del servicio
        when(rolService.guardarRol(rolDTO)).thenReturn(rolDTO);

        // Llamar al método del controlador y verificar la respuesta
        ResponseEntity<RolDTO> response = rolController.guardarRol(rolDTO);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(rolDTO, response.getBody());

        // Verificar que el método del servicio fue llamado una vez
        verify(rolService, times(1)).guardarRol(rolDTO);
    }

    @Test
    void testBuscarRol() throws ResourceNotFoundException {
        Long id = 1L;
        RolDTO rolDTO = new RolDTO();
        // Configurar el comportamiento esperado del servicio
        when(rolService.buscarRol(id)).thenReturn(Optional.of(rolDTO));

        // Llamar al método del controlador y verificar la respuesta
        ResponseEntity<RolDTO> response = rolController.buscarRol(id);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(rolDTO, response.getBody());

        // Verificar que el método del servicio fue llamado una vez
        verify(rolService, times(1)).buscarRol(id);
    }

    @Test
    void testListarRoles() {
        List<RolDTO> roles = Arrays.asList(new RolDTO(), new RolDTO());
        // Configurar el comportamiento esperado del servicio
        when(rolService.buscarTodosRoles()).thenReturn(roles);

        // Llamar al método del controlador y verificar la respuesta
        ResponseEntity<List<RolDTO>> response = rolController.listarRoles();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(roles, response.getBody());

        // Verificar que el método del servicio fue llamado una vez
        verify(rolService, times(1)).buscarTodosRoles();
    }

    @Test
    void testActualizarRol() throws BadRequestException, ResourceNotFoundException {
        Long id = 1L;
        RolDTO rolDTO = new RolDTO();
        // Configurar el comportamiento esperado del servicio
        when(rolService.actualizarRol(rolDTO)).thenReturn(rolDTO);

        // Llamar al método del controlador y verificar la respuesta
        ResponseEntity<RolDTO> response = rolController.actualizarRol(id, rolDTO);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(rolDTO, response.getBody());

        // Verificar que el método del servicio fue llamado una vez
        verify(rolService, times(1)).actualizarRol(rolDTO);
    }

    @Test
    void testEliminarRol() throws ResourceNotFoundException {
        Long id = 1L;

        // Llamar al método del controlador y verificar la respuesta
        ResponseEntity<String> response = rolController.eliminarRol(id);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Se eliminó el rol con id: " + id, response.getBody());

        // Verificar que el método del servicio fue llamado una vez
        verify(rolService, times(1)).eliminarRol(id);
    }
}
