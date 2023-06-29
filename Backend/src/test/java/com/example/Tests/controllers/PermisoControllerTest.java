package com.example.Tests.controllers;
import com.example.Backend.controllers.PermisoController;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Permiso;
import com.example.Backend.service.PermisoService;
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

class PermisoControllerTest {
    @Mock
    private PermisoService permisoService;

    @InjectMocks
    private PermisoController permisoController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testBuscarPermiso() throws ResourceNotFoundException {
        Long id = 1L;
        Permiso permiso = new Permiso();
        // Configurar el comportamiento esperado del servicio
        when(permisoService.buscarPermiso(id)).thenReturn(Optional.of(permiso));

        // Llamar al método del controlador y verificar la respuesta
        ResponseEntity<Permiso> response = permisoController.buscarPermiso(id);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(permiso, response.getBody());

        // Verificar que el método del servicio fue llamado una vez
        verify(permisoService, times(1)).buscarPermiso(id);
    }

    @Test
    void testListarPermisos() {
        List<Permiso> permisos = Arrays.asList(new Permiso(), new Permiso());
        // Configurar el comportamiento esperado del servicio
        when(permisoService.buscarTodosPermisos()).thenReturn(permisos);

        // Llamar al método del controlador y verificar la respuesta
        ResponseEntity<List<Permiso>> response = permisoController.listarPermisos();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(permisos, response.getBody());

        // Verificar que el método del servicio fue llamado una vez
        verify(permisoService, times(1)).buscarTodosPermisos();
    }
}
