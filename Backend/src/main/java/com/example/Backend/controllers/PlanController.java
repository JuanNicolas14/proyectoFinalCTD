package com.example.Backend.controllers;

import com.amazonaws.services.s3.AmazonS3;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.*;
import com.example.Backend.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.File;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/plan")
@CrossOrigin(origins = "*")
public class PlanController {

    @Autowired
    private AmazonS3 clienteS3;
    private String bucketName = "bucket-grupo-7";
    @Value("${aws.region}")
    private String region;
    private Logger logger = Logger.getLogger(Restaurante.class.getName());
    private PlanService planService;


    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    /**
     * Endpoint para guardar un plan
     * @param planFormData objeto con los datos del plan
     * @return ResponseEntity con el plan guardado
     */

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, path = "/registrar")
    public ResponseEntity<Plan> guardarPlan(@ModelAttribute PlanFormData planFormData) {
        this.logger.info("Guardando plan: " + planFormData.toString());

        //subir la imagen a S3
        String imagenUrl = null;
        try {
            File file = File.createTempFile("temp", null);
            planFormData.getImagenPlan().transferTo(file);
            clienteS3.putObject(bucketName, planFormData.getImagenPlan().getOriginalFilename(), file);
            imagenUrl = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + planFormData.getImagenPlan().getOriginalFilename();
        } catch (Exception e) {
            this.logger.warning("Error al subir la imagen: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Plan plan = new Plan(
                planFormData.getNombre(),
                planFormData.getDescripcionPlan(),
                imagenUrl
        );

        plan = planService.registrarPlan(plan);

        return new ResponseEntity<>(plan, HttpStatus.CREATED);
    }

    /**
     * Endpoint para eliminar un plan(categoría)
     * @param id id del plan a eliminar
     * @return ResponseEntity con el mensaje de éxito
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPlan (@PathVariable Long id){
        this.logger.info("Eliminando plan con id: " + id);
        planService.eliminarPlan(id);
        return ResponseEntity.ok("Plan eliminado");
    }

    /**
     * Endpoint para listar todas las categorias
     * @return Lista de planes
     */
    @GetMapping
    public ResponseEntity<List<Plan>> listarPlanes () {
        this.logger.info("Listando planes");
        List<Plan> planes = planService.buscarTodosPlanes();
        this.logger.info("Se encontraron " + planes.size() + " planes");
        return ResponseEntity.ok(planes);
    }

    /**
     * Endpoint para listar plan por id
     * @return Plan encontrado
     */
    @GetMapping("/{id}")
    public ResponseEntity<Plan> listarPlanPorId (@PathVariable Long id) throws ResourceNotFoundException{
        this.logger.info("Buscando Plan con id: " + id);
        Plan planBuscado = planService.buscarPlan(id);
        if (planBuscado== null) {
            this.logger.warning("No se encontró el plan con id: " + id);
            throw new ResourceNotFoundException("No se encontró el plan con id: " + id);
        }
        this.logger.info("Se encontró el plan: " + planBuscado);
        return ResponseEntity.ok(planBuscado);
    }

    /**
     * Endpoint para actualizar un plan
     * @param planFormData objeto con los datos del plan
     * @return ResponseEntity con el plan actualizado
     */
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, path = "/actualizar/{id}")
    public ResponseEntity<Plan> actualizarPlan(@PathVariable Long id, @ModelAttribute PlanFormData planFormData) {
        this.logger.info("Actualizando plan con id: " + id);

        // Verificar si el plan existe antes de actualizarlo
        Plan planExistente = planService.buscarPlan(id);
        if (planExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Actualizar los datos del plan
        planExistente.setNombre(planFormData.getNombre());
        planExistente.setDescripcion(planFormData.getDescripcionPlan());

        // Subir la nueva imagen solo si se proporciona una
        if (planFormData.getImagenPlan() != null) {
            String imagenUrl = null;
            try {
                File file = File.createTempFile("temp", null);
                planFormData.getImagenPlan().transferTo(file);
                clienteS3.putObject(bucketName, planFormData.getImagenPlan().getOriginalFilename(), file);
                imagenUrl = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + planFormData.getImagenPlan().getOriginalFilename();
                planExistente.setImagen(imagenUrl);
            } catch (Exception e) {
                this.logger.warning("Error al subir la nueva imagen: " + e.getMessage());
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        // Guardar los cambios actualizados
        Plan planActualizado = planService.actualizarPlan(planExistente);

        return new ResponseEntity<>(planActualizado, HttpStatus.OK);
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

