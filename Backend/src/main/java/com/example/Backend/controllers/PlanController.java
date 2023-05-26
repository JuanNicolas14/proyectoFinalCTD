package com.example.Backend.controllers;

import com.amazonaws.services.s3.AmazonS3;
import com.example.Backend.models.*;
import com.example.Backend.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.File;
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

}

