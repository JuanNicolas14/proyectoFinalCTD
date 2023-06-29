package com.example.Tests.controllers;
import com.example.Backend.controllers.PaisController;
import com.example.Backend.models.Pais;
import com.example.Backend.service.PaisService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class PaisControllerTest {
    @Mock
    private PaisService paisService;

    @InjectMocks
    private PaisController paisController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testListarPaises() {
        List<Pais> paises = Arrays.asList(new Pais(), new Pais());
        // Configurar el comportamiento esperado del servicio
        when(paisService.listarPaises()).thenReturn(paises);

        // Llamar al método del controlador y verificar la respuesta
        ResponseEntity<List<Pais>> response = paisController.listarPaises();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(paises, response.getBody());

        // Verificar que el método del servicio fue llamado una vez
        verify(paisService, times(1)).listarPaises();
    }
}