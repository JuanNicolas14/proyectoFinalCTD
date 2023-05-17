/**
 * Define los endpoints para el controlador de Restaurante
 */
package com.example.Backend.controllers;

import com.amazonaws.services.s3.AmazonS3;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.*;
import com.example.Backend.service.DomicilioService;
import com.example.Backend.service.PaisService;
import com.example.Backend.service.PlanService;
import com.example.Backend.service.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;


/**
 * Define los endpoints para el controlador de Restaurante
 * Provee los métodos para listar, guardar, actualizar y eliminar Restaurante
 */
@RestController
@RequestMapping("/restaurante")
@CrossOrigin(origins = "*")
public class RestauranteController {
    // TODO: Proteger algunos endpoints con roles
    @Autowired
    private AmazonS3 clienteS3;
    private String bucketName = "bucket-grupo-7";
    @Value("${aws.region}")
    private String region;
    private Logger logger = Logger.getLogger(Restaurante.class.getName());
    private RestauranteService restauranteService;
    private DomicilioService domicilioService;
    private PaisService paisService;
    private PlanService planService;

    /**
     * Constructor de RestauranteController
     * @param restauranteService servicio de Restaurante
     * @param domicilioService servicio de Domicilio
     * @param paisService servicio de Pais
     */

    @Autowired
    public RestauranteController(RestauranteService restauranteService, DomicilioService domicilioService, PaisService paisService, PlanService planService){
        this.restauranteService = restauranteService;
        this.domicilioService = domicilioService;
        this.paisService = paisService;
        this.planService = planService;
    }


    /**
     * Endpoint para guardar un restaurante
     * @param imagen imagen del restaurante
     * @param restauranteFormData datos del restaurante
     * @return ResponseEntity con el restaurante guardado
     */

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Restaurante> guardarRestaurante(@RequestParam("imagen") MultipartFile imagen, @ModelAttribute RestauranteFormData restauranteFormData) {
        // TODO: Se debe validar que el restaurante no exista con el mismo nombre
        this.logger.info("Guardando restaurante: " + restauranteFormData.toString());
        // Subir la imagen a s3
        File file = null;
        try {
            file = File.createTempFile("temp", null);
            imagen.transferTo(file);
        } catch (Exception e) {
            this.logger.warning("Error al subir la imagen: " + e.getMessage());
        }
        clienteS3.putObject(bucketName, imagen.getOriginalFilename(), file);
        String imagenUrl  = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + imagen.getOriginalFilename();

        // TODO: Levantar excepción si no se encuentra el pais
        Pais pais = paisService.buscarPais(restauranteFormData.getPais_id());

        Domicilio domicilio = new Domicilio(
                restauranteFormData.getCalle(),
                restauranteFormData.getNumero(),
                restauranteFormData.getLocalidad(),
                restauranteFormData.getCiudad(),
                pais
        );
        domicilioService.guardarDomicilio(domicilio);

        // TODO: Levantar excepción si no se encuentra el plan
        Plan plan = planService.buscarPlan(restauranteFormData.getPlan_id());

        Restaurante restaurante = new Restaurante(
                restauranteFormData.getNombre(),
                restauranteFormData.getDescripcion(),
                imagenUrl,
                restauranteFormData.getPrecio(),
                domicilio,
                plan
        );
        Restaurante restauranteGuardado = restauranteService.guardarRestaurante(restaurante);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                restauranteGuardado
        );
    }


    /**
     * Endpoint para listar todos los restaurantes
     * @param id id del restaurante a buscar
     * @return ResponseEntity con el restaurante buscado
     * @throws ResourceNotFoundException si no se encuentra el restaurante
     */
    @GetMapping("/{id}")
    public ResponseEntity<Restaurante> buscarRestaurante(@PathVariable Long id) throws ResourceNotFoundException {
        this.logger.info("Buscando restaurante con id: " + id);
        Optional<Restaurante> restauranteBuscado = restauranteService.buscarRestaurante(id);
        if (restauranteBuscado.isEmpty()) {
            this.logger.warning("No se encontró el restaurante con id: " + id);
            throw new ResourceNotFoundException("No se encontró el restaurante con id: " + id);
        }
        this.logger.info("Se encontró el restaurante: " + restauranteBuscado);
        return ResponseEntity.ok(restauranteBuscado.get());
    }

    /**
     * Endpoint para listar todos los restaurantes
     * @return ResponseEntity con la lista de restaurantes
     */
    @GetMapping
    public List<Restaurante> listarRestaurantes() {
        this.logger.info("Listando restaurantes");
        List<Restaurante> restaurantes = restauranteService.buscarTodosRestaurantes();
        this.logger.info("Se encontraron " + restaurantes.size() + " restaurantes");
        return restaurantes;
    }

    /**
     * Endpoint para eliminar un restaurante
     * @param id id del restaurante a eliminar
     * @return ResponseEntity con el mensaje de éxito
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarRestaurante(@PathVariable Long id) throws ResourceNotFoundException {
        this.logger.info("Eliminando restaurante con id: " + id);
        Optional<Restaurante> restauranteBuscado = restauranteService.buscarRestaurante(id);
        if (restauranteBuscado.isEmpty()) {
            this.logger.warning("No se encontró el restaurante con id: " + id);
            throw new ResourceNotFoundException("No se encontró el restaurante con id: " + id);
        }
        restauranteService.eliminarRestaurante(id);
        this.logger.info("Se eliminó el restaurante con id: " + id);
        return ResponseEntity.ok("Se eliminó el restaurante con id: " + id);
    }


    /**
     * Maneja la excepción SQLException y retorna un ResponseEntity con el mensaje de error
     * @param exc instancia de SQLException
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<String> handleSQLException(SQLException exc) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exc.getMessage());
    }

    /**
     * Maneja la excepción ResourceNotFoundException y retorna un ResponseEntity con el mensaje de error
     * @param exc instancia de ResourceNotFoundException
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException exc) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exc.getMessage());
    }
}
