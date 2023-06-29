package com.example.Tests.controllers;
import com.example.Backend.controllers.FavoritoController;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Restaurante;
import com.example.Backend.service.FavoritoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class FavoritoControllerTest {

    @Mock
    private FavoritoService favoritoService;

    @InjectMocks
    private FavoritoController favoritoController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGuardarFavorito() throws ResourceNotFoundException {
        Long usuarioId = 1L;
        Long restauranteId = 1L;

        ResponseEntity<String> expectedResponse = ResponseEntity.ok("restaurante agregado a favoritos");

        doNothing().when(favoritoService).agregarFavorito(usuarioId, restauranteId);

        ResponseEntity<String> actualResponse = favoritoController.guardarFavorito(usuarioId, restauranteId);

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());

        verify(favoritoService, times(1)).agregarFavorito(usuarioId, restauranteId);
        verify(favoritoService).agregarFavorito(1L, 1L);

    }

    @Test
    public void testListarFavoritos() {
        Long usuarioId = 1L;

        Set<Restaurante> favoritos = new HashSet<>();
        favoritos.add(new Restaurante());
        favoritos.add(new Restaurante());
        favoritos.add(new Restaurante());

        ResponseEntity<Set<Restaurante>> expectedResponse = ResponseEntity.ok(favoritos);

        when(favoritoService.listarFavoritos(usuarioId)).thenReturn(favoritos);

        ResponseEntity<Set<Restaurante>> actualResponse = favoritoController.listarFavoritos(usuarioId);

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());

        verify(favoritoService, times(1)).listarFavoritos(usuarioId);
    }

    @Test
    public void testEliminarFavorito() throws ResourceNotFoundException {
        Long usuarioId = 1L;
        Long restauranteId = 1L;

        ResponseEntity<String> expectedResponse = ResponseEntity.ok("Restaurante eliminado de favoritos");

        doNothing().when(favoritoService).eliminarRestauranteFavorito(usuarioId, restauranteId);

        ResponseEntity<String> actualResponse = favoritoController.eliminarFavorito(usuarioId, restauranteId);

        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());

        verify(favoritoService, times(1)).eliminarRestauranteFavorito(usuarioId, restauranteId);
    }

//    @Test
//    public void testHandleResourceNotFoundException() {
//        ResourceNotFoundException exception = new ResourceNotFoundException("Recurso no encontrado");
//
//        ResponseEntity<String> expectedResponse = ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
//
//        ResponseEntity<String> actualResponse = favoritoController.handleResourceNotFoundException(exception);
//
//        assertEquals(expectedResponse.getStatusCode(), actualResponse.getStatusCode());
//        assertEquals(expectedResponse.getBody(), actualResponse.getBody());
//    }
}