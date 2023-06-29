package com.example.Tests.controllers;

import com.example.Backend.controllers.RestauranteController;
import com.example.Backend.dto.RestauranteDTO;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.service.RestauranteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class RestauranteControllerTest {

    @Mock
    private RestauranteService restauranteService;

    @InjectMocks
    private RestauranteController restauranteController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

//    @Test
//    void testGuardarRestaurante() throws Exception {
//        List<MultipartFile> imagenes = new ArrayList<>();
//        MockMultipartFile imagen1 = new MockMultipartFile("imagen1", "imagen1.jpg", "image/jpeg", new byte[]{});
//        imagenes.add(imagen1);
//
//        RestauranteFormData restauranteFormData = new RestauranteFormData();
//
//        Restaurante restauranteGuardado = new Restaurante();
//        when(restauranteService.guardarRestaurante(any(Restaurante.class))).thenReturn(restauranteGuardado);
//
//        ResponseEntity<Restaurante> response = restauranteController.guardarRestaurante(imagenes, restauranteFormData);
//
//        assertEquals(HttpStatus.CREATED, response.getStatusCode());
//        assertNotNull(response.getBody());
//        assertEquals(restauranteGuardado, response.getBody());
//
//        verify(restauranteService, times(1)).guardarRestaurante(any(Restaurante.class));
//    }

    @Test
    void testBuscarRestaurante() throws ResourceNotFoundException {
        Long restauranteId = 1L;

        RestauranteDTO restauranteDTO = new RestauranteDTO();
        when(restauranteService.buscarRestaurante(restauranteId)).thenReturn(Optional.of(restauranteDTO));

        ResponseEntity<RestauranteDTO> response = restauranteController.buscarRestaurante(restauranteId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(restauranteDTO, response.getBody());

        verify(restauranteService, times(1)).buscarRestaurante(restauranteId);
    }

    @Test
    void testListarRestaurantes() {
        String plan = "somePlan";
        String ciudad = "someCiudad";
        String hora = "someHora";

        List<RestauranteDTO> restaurantes = new ArrayList<>();
        when(restauranteService.buscarTodosRestaurantes(any(Specification.class))).thenReturn(restaurantes);

        List<RestauranteDTO> response = restauranteController.listarRestaurantes(plan, ciudad, hora);

        assertNotNull(response);
        assertEquals(restaurantes, response);

        verify(restauranteService, times(1)).buscarTodosRestaurantes(any(Specification.class));
    }

    @Test
    void testEliminarRestaurante() throws ResourceNotFoundException {
        Long restauranteId = 1L;

        RestauranteDTO restauranteDTO = new RestauranteDTO();
        when(restauranteService.buscarRestaurante(restauranteId)).thenReturn(Optional.of(restauranteDTO));

        ResponseEntity<String> response = restauranteController.eliminarRestaurante(restauranteId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Se eliminó el restaurante con id: " + restauranteId, response.getBody());

        verify(restauranteService, times(1)).eliminarRestaurante(restauranteId);
    }

    @Test
    void testListarRestaurantesPorCiudadYPlan() {
        String ciudad = "someCiudad";
        String categoria = "someCategoria";

        List<RestauranteDTO> restaurantes = new ArrayList<>();
        when(restauranteService.buscarPorCiudadYPlan(ciudad, categoria)).thenReturn(restaurantes);

        List<RestauranteDTO> response = restauranteController.listarRestaurantesPorCiudadYPlan(ciudad, categoria);

        assertNotNull(response);
        assertEquals(restaurantes, response);

        verify(restauranteService, times(1)).buscarPorCiudadYPlan(ciudad, categoria);
    }
}
