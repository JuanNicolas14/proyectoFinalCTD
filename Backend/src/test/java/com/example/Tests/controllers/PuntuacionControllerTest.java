package com.example.Tests.controllers;
//package com.example.Tests.controllers;
import com.example.Backend.controllers.PuntuacionController;
import com.example.Backend.dto.PuntuacionDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.repository.UsuarioRepository;
import com.example.Backend.service.PuntuacionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class PuntuacionControllerTest {
    @Mock
    private PuntuacionService puntuacionService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private PuntuacionController puntuacionController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void guardarPuntuacion() throws BadRequestException {
        // Arrange
        PuntuacionDTO puntuacionDTO = new PuntuacionDTO();
        when(puntuacionService.guardarPuntuacion(puntuacionDTO)).thenReturn(puntuacionDTO);

        // Act
        ResponseEntity<PuntuacionDTO> response = puntuacionController.guardarPuntuacion(puntuacionDTO);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(puntuacionDTO, response.getBody());
        verify(puntuacionService, times(1)).guardarPuntuacion(puntuacionDTO);
    }

    @Test
    public void buscarPuntuacion_IdExistente() throws ResourceNotFoundException {
        // Arrange
        Long id = 1L;
        PuntuacionDTO puntuacionDTO = new PuntuacionDTO();
        Optional<PuntuacionDTO> puntuacionOptional = Optional.of(puntuacionDTO);
        when(puntuacionService.buscarPuntuacion(id)).thenReturn(puntuacionOptional);

        // Act
        ResponseEntity<PuntuacionDTO> response = puntuacionController.buscarPuntuacion(id);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(puntuacionDTO, response.getBody());
        verify(puntuacionService, times(1)).buscarPuntuacion(id);
    }

    @Test
    public void buscarPuntuacion_IdNoExistente() throws ResourceNotFoundException {
        // Arrange
        Long id = 1L;
        Optional<PuntuacionDTO> puntuacionOptional = Optional.empty();
        when(puntuacionService.buscarPuntuacion(id)).thenReturn(puntuacionOptional);

        // Act & Assert
        ResourceNotFoundException exception = org.junit.jupiter.api.Assertions.assertThrows(
                ResourceNotFoundException.class,
                () -> puntuacionController.buscarPuntuacion(id)
        );
        assertEquals("No se encontró puntuación con id: " + id, exception.getMessage());
        verify(puntuacionService, times(1)).buscarPuntuacion(id);
    }

    @Test
    public void listarPuntuaciones() {
        // Arrange
        List<PuntuacionDTO> puntuaciones = new ArrayList<>();
        puntuaciones.add(new PuntuacionDTO());
        when(puntuacionService.buscarTodasPuntuaciones()).thenReturn(puntuaciones);

        // Act
        ResponseEntity<List<PuntuacionDTO>> response = puntuacionController.listarPuntuaciones();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(puntuaciones, response.getBody());
        verify(puntuacionService, times(1)).buscarTodasPuntuaciones();
    }
}