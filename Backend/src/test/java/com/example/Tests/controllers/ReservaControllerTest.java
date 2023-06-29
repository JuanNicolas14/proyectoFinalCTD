package com.example.Tests.controllers;
//package com.example.Tests.controllers;

import com.example.Backend.controllers.ReservaController;
import com.example.Backend.dto.ReservaDTO;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.*;
import com.example.Backend.service.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class ReservaControllerTest {
    @Mock
    private ReservaService reservaService;

    @Mock
    private MailService mailService;

    @Mock
    private CiudadService ciudadService;

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private RestauranteService restauranteService;

    @InjectMocks
    private ReservaController reservaController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void registrarReserva_ValidReservaForm_ReturnsCreatedResponse() throws Exception {
        // Arrange
        ReservaForm reservaForm = new ReservaForm();
        reservaForm.setCiudadId(1L);
        reservaForm.setUsuarioId(1L);
        reservaForm.setRestauranteId(1L);
        reservaForm.setHoraEntrega("12:00");
        reservaForm.setFechaInicio(Date.valueOf(LocalDate.now()));
        reservaForm.setFechaFinalizacion(Date.valueOf(LocalDate.now().plusDays(2)));
        reservaForm.setDireccionEntrega("Dirección de entrega");

        Ciudad ciudad = new Ciudad();
        Optional<Ciudad> ciudadOptional = Optional.of(ciudad);
        when(ciudadService.buscarCiudad(reservaForm.getCiudadId())).thenReturn(ciudadOptional);

        Usuario usuario = new Usuario();
        Optional<Usuario> usuarioOptional = Optional.of(usuario);
        when(usuarioService.findById(reservaForm.getUsuarioId())).thenReturn(usuarioOptional);

        Restaurante restaurante = new Restaurante();
        Optional<Restaurante> restauranteOptional = Optional.of(restaurante);
        when(restauranteService.findById(reservaForm.getRestauranteId())).thenReturn(restauranteOptional);

        ReservaDTO reservaDTO = new ReservaDTO();
        when(reservaService.guardarReserva(any(Reserva.class))).thenReturn(reservaDTO);

        // Act
        ResponseEntity<ReservaDTO> response = reservaController.registrarReserva(reservaForm);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(reservaDTO, response.getBody());
        verify(mailService, times(1)).enviarCorreoReserva(usuario.getEmail(), reservaDTO);
    }

    @Test
    public void registrarReserva_InvalidCiudadId_ThrowsResourceNotFoundException() throws Exception {
        // Arrange
        ReservaForm reservaForm = new ReservaForm();
        reservaForm.setCiudadId(1L);

        Optional<Ciudad> ciudadOptional = Optional.empty();
        when(ciudadService.buscarCiudad(reservaForm.getCiudadId())).thenReturn(ciudadOptional);

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            reservaController.registrarReserva(reservaForm);
        });

        assertEquals("No existe la ciudad con id 1", exception.getMessage());
    }

    @Test
    public void registrarReserva_InvalidUsuarioId_ThrowsResourceNotFoundException() throws Exception {
        // Arrange
        ReservaForm reservaForm = new ReservaForm();
        reservaForm.setCiudadId(1L);
        reservaForm.setUsuarioId(1L);

        Ciudad ciudad = new Ciudad();
        Optional<Ciudad> ciudadOptional = Optional.of(ciudad);
        when(ciudadService.buscarCiudad(reservaForm.getCiudadId())).thenReturn(ciudadOptional);

        Optional<Usuario> usuarioOptional = Optional.empty();
        when(usuarioService.findById(reservaForm.getUsuarioId())).thenReturn(usuarioOptional);

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            reservaController.registrarReserva(reservaForm);
        });

        assertEquals("No existe el usuario con id 1", exception.getMessage());
    }

    @Test
    public void registrarReserva_InvalidRestauranteId_ThrowsResourceNotFoundException() throws Exception {
        // Arrange
        ReservaForm reservaForm = new ReservaForm();
        reservaForm.setCiudadId(1L);
        reservaForm.setUsuarioId(1L);
        reservaForm.setRestauranteId(1L);

        Ciudad ciudad = new Ciudad();
        Optional<Ciudad> ciudadOptional = Optional.of(ciudad);
        when(ciudadService.buscarCiudad(reservaForm.getCiudadId())).thenReturn(ciudadOptional);

        Usuario usuario = new Usuario();
        Optional<Usuario> usuarioOptional = Optional.of(usuario);
        when(usuarioService.findById(reservaForm.getUsuarioId())).thenReturn(usuarioOptional);

        Optional<Restaurante> restauranteOptional = Optional.empty();
        when(restauranteService.findById(reservaForm.getRestauranteId())).thenReturn(restauranteOptional);

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            reservaController.registrarReserva(reservaForm);
        });

        assertEquals("No existe el restaurante con id 1", exception.getMessage());
    }

    @Test
    public void buscarReservasUsuario_ValidUsuarioId_ReturnsReservas() throws Exception {
        // Arrange
        Long usuarioId = 1L;

        Usuario usuario = new Usuario();
        Optional<Usuario> usuarioOptional = Optional.of(usuario);
        when(usuarioService.findById(usuarioId)).thenReturn(usuarioOptional);

        List<ReservaDTO> reservas = new ArrayList<>();
        when(reservaService.findByUserId(usuarioId)).thenReturn(reservas);

        // Act
        ResponseEntity<List<ReservaDTO>> response = reservaController.buscarReservasUsuario(usuarioId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(reservas, response.getBody());
    }

    @Test
    public void buscarReservasUsuario_InvalidUsuarioId_ThrowsResourceNotFoundException() throws Exception {
        // Arrange
        Long usuarioId = 1L;

        Optional<Usuario> usuarioOptional = Optional.empty();
        when(usuarioService.findById(usuarioId)).thenReturn(usuarioOptional);

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            reservaController.buscarReservasUsuario(usuarioId);
        });

        assertEquals("No existe el usuario con id 1", exception.getMessage());
    }
}
