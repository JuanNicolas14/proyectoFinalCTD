package com.example.Tests.service;

import com.example.Backend.BackendApplication;
import com.example.Backend.dto.RestauranteDTO;
import com.example.Backend.models.*;
import com.example.Backend.repository.RestauranteRepository;
import com.example.Backend.service.PaisService;
import com.example.Backend.service.PlanService;
import com.example.Backend.service.RestauranteService;
import com.example.Tests.configs.H2Db;
import com.example.Tests.configs.TestConfig;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.util.*;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Clase para probar la clase RestauranteService
 */
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = {BackendApplication.class, TestConfig.class})
@TestPropertySource("classpath:application-test.properties")
@ActiveProfiles("test")
public class RestauranteServiceTest {
/*
    @Autowired
    private RestauranteService restauranteService;

    @Autowired
    private PaisService paisService;

    @Autowired
    private PlanService planService;

    @Autowired
    private RestauranteRepository restauranteRepository;

    private final Logger logger = Logger.getLogger(RestauranteServiceTest.class.getName());

    @AfterEach
    public void tearDown(){
        // Eliminar todos los restaurantes
        restauranteRepository.deleteAll();
    }

    public Long crearRestaurante() throws Exception {
        // Insertar pais
        Long paisId = H2Db.crearPais();

        // Insertar domicilio
        H2Db.crearDomicilio(paisId);

        // Insertar plan
        Long planId = H2Db.crearPlan();

        Domicilio domicilio = new Domicilio("Calle 1", "123", "Bogota", "Bogota", paisService.buscarPais(paisId));

        Restaurante restauranteAGuardar = new Restaurante("Sabor Saludable","Disfruta los mejores sabores",null, 130000,domicilio,planService.buscarPlan(planId),"Reglas del restaurante","Salud y seguridad en restaurante","Politicas que maneja el restaurante");

        Restaurante restauranteGuardado = restauranteService.guardarRestaurante(restauranteAGuardar);

        // Insertar imagen
        H2Db.crearImagen(restauranteGuardado.getId());

        return restauranteGuardado.getId();
    }

    /**
     * Prueba para guardar un restaurante
     * expected: Se guarda el restaurante
     */
    @Test
    @Order(1)
    @DisplayName("Guardar Restaurante")
    public void guardarRestaurante() {
        /*
        // Arrange
        logger.info("Probando guardarRestaurante");
        Restaurante restauranteAGuardar = new Restaurante("Sabor Saludable","Disfruta los mejores sabores",null, 130000,null,null);

        // Act
        Restaurante restauranteGuardado = restauranteService.guardarRestaurante(restauranteAGuardar);
        logger.info("Asserting restauranteGuardado == restauranteAGuardar");
        logger.info("restauranteGuardado: " + restauranteGuardado);
        logger.info("restauranteAGuardar: " + restauranteAGuardar);

        assertEquals(1L, restauranteGuardado.getId());

         */
    }

    /**
     * Prueba para buscar un restaurante por ID
     * expected: Se encuentra el restaurante
     */
    @Test
    @Order(2)
    @DisplayName("Buscar Restaurante por ID")
    public void buscarRestaurantePorIDTest() throws Exception {
        /*
        // Arrange
        logger.info("Probando buscarRestaurantePorIDTest");
        Long restauranteId = crearRestaurante();

        // Act
        Optional<RestauranteDTO> restauranteBuscado = restauranteService.buscarRestaurante(restauranteId);

        // Assert
        logger.info("Asserting restauranteBuscado.isPresent()");
        logger.info("restauranteBuscado: " + restauranteBuscado.toString());
        assertTrue(restauranteBuscado.isPresent());

         */
    }

    /**
     * Prueba para buscar todos los restaurantes
     * expected: Se encuentran todos los restaurantes creados
     */
    @Test
    @Order(3)
    @DisplayName("Buscar todos los restaurantes")
    public void buscarTodosRestaurantes() throws Exception {
        /*
        // Arrange
        logger.info("Probando buscarTodosRestaurantes");
        int cantidadRestaurantes = 5;
        for (int i = 0; i < cantidadRestaurantes; i++) {
            crearRestaurante();
        }

        // Act
        List<RestauranteDTO> restaurantes = restauranteService.buscarTodosRestaurantes();

        // Assert
        assertEquals(cantidadRestaurantes, restaurantes.size());

         */
    }

    /**
     * Prueba para buscar restaurantes por nombre de plan
     * expected: Se encuentran todos los restaurantes con el nombre de plan dado
     */
    @Test
    @Order(4)
    @DisplayName("Buscar restaurantes por nombre de plan")
    public void buscarPorPlan() throws Exception {
        /*
        // Arrange
        logger.info("Probando buscarPorPlan");
        String nombrePlan = "Plan 1";
        int cantidadRestaurantes = 3;
        for (int i = 0; i < cantidadRestaurantes; i++) {
            crearRestaurante();
        }

        // Act
        List<RestauranteDTO> restaurantes = restauranteService.buscarPorPlan(nombrePlan);

        // Assert
        assertEquals(cantidadRestaurantes, restaurantes.size());

         */
    }

    /**
     * Prueba para eliminar un restaurante
     * expected: Se elimina el restaurante dado
     */
    @Test
    @Order(5)
    @DisplayName("Eliminar Restaurante")
    public void eliminarRestaurante() throws Exception {
        /*
        // Arrange
        logger.info("Probando eliminarRestaurante");
        Long restauranteId = crearRestaurante();

        // Act
        restauranteService.eliminarRestaurante(restauranteId);

        // Assert
        Assertions.assertFalse(restauranteService.buscarRestaurante(restauranteId).isPresent());

         */
    }

}