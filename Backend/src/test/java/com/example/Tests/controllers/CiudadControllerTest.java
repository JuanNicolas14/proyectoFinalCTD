package com.example.Tests.controllers;

import com.example.Backend.controllers.CiudadController;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Ciudad;
import com.example.Backend.service.CiudadService;
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
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class CiudadControllerTest {

    @Mock
    private CiudadService ciudadService;

    @InjectMocks
    private CiudadController ciudadController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void agregarCiudad_ValidCiudad_ReturnsCiudad() {
        // Arrange
        Ciudad ciudad = new Ciudad();
        ciudad.setId(1L);
        ciudad.setNombre("Ciudad Test");

        when(ciudadService.registrarCiudad(any(Ciudad.class))).thenReturn(ciudad);

        // Act
        ResponseEntity<Ciudad> response = ciudadController.agregarCiudad(ciudad);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(ciudad, response.getBody());
        verify(ciudadService, times(1)).registrarCiudad(ciudad);
    }

    @Test
    public void actualizarCiudad_ExistingIdAndValidCiudad_ReturnsCiudad() throws BadRequestException, ResourceNotFoundException {
        // Arrange
        Long ciudadId = 1L;
        Ciudad ciudad = new Ciudad();
        ciudad.setId(ciudadId);
        ciudad.setNombre("Ciudad Test");

        when(ciudadService.actualizarCiudad(eq(ciudad))).thenReturn(ciudad);

        // Act
        ResponseEntity<Ciudad> response = ciudadController.actualizarCiudad(ciudadId, ciudad);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(ciudad, response.getBody());
        verify(ciudadService, times(1)).actualizarCiudad(ciudad);
    }

    @Test
    public void listarCiudades_ReturnsListOfCiudades() {
        // Arrange
        List<Ciudad> ciudades = new ArrayList<>();
        Ciudad ciudad1 = new Ciudad();
        ciudad1.setId(1L);
        ciudad1.setNombre("Ciudad 1");
        Ciudad ciudad2 = new Ciudad();
        ciudad2.setId(2L);
        ciudad2.setNombre("Ciudad 2");
        ciudades.add(ciudad1);
        ciudades.add(ciudad2);

        when(ciudadService.buscarTodasCiudades()).thenReturn(ciudades);

        // Act
        ResponseEntity<List<Ciudad>> response = ciudadController.listarCiudades();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(ciudades, response.getBody());
        verify(ciudadService, times(1)).buscarTodasCiudades();
    }

    @Test
    public void buscarCiudad_ExistingId_ReturnsCiudad() {
        // Arrange
        Long ciudadId = 1L;
        Ciudad ciudad = new Ciudad();
        ciudad.setId(ciudadId);
        ciudad.setNombre("Ciudad Test");

        when(ciudadService.buscarCiudad(eq(ciudadId))).thenReturn(Optional.of(ciudad));

        // Act
        ResponseEntity<Ciudad> response = ciudadController.buscarCiudad(ciudadId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(ciudad, response.getBody());
        verify(ciudadService, times(1)).buscarCiudad(ciudadId);
    }

    @Test
    public void buscarCiudad_NonExistingId_ReturnsNotFoundStatus() {
        // Arrange
        Long ciudadId = 1L;

        when(ciudadService.buscarCiudad(eq(ciudadId))).thenReturn(Optional.empty());

        // Act
        ResponseEntity<Ciudad> response = ciudadController.buscarCiudad(ciudadId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(ciudadService, times(1)).buscarCiudad(ciudadId);
    }

    @Test
    public void eliminarCiudad_ExistingId_ReturnsSuccessMessage() throws ResourceNotFoundException {
        // Arrange
        Long ciudadId = 1L;
        Optional<Ciudad> ciudadBuscada = Optional.of(new Ciudad());

        when(ciudadService.buscarCiudad(eq(ciudadId))).thenReturn(ciudadBuscada);

        // Act
        ResponseEntity<String> response = ciudadController.eliminarCiudad(ciudadId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().contains(String.valueOf(ciudadId)));
        verify(ciudadService, times(1)).eliminarCiudad(ciudadId);
    }

    @Test
    public void eliminarCiudad_NonExistingId_ReturnsNotFoundStatus() throws ResourceNotFoundException {
        // Arrange
        Long ciudadId = 1L;
        Optional<Ciudad> ciudadBuscada = Optional.empty();

        when(ciudadService.buscarCiudad(eq(ciudadId))).thenReturn(ciudadBuscada);

        // Act
        ResponseEntity<String> response = ciudadController.eliminarCiudad(ciudadId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody().contains(String.valueOf(ciudadId)));
        verify(ciudadService, times(0)).eliminarCiudad(anyLong());
    }
}
