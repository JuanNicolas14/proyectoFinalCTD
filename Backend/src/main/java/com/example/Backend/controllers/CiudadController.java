package com.example.Backend.controllers;

import com.example.Backend.dto.RolDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Ciudad;
import com.example.Backend.service.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/ciudades")
public class CiudadController {

    @Autowired
    private CiudadService ciudadService;

    @PostMapping
    public ResponseEntity<Ciudad> agregarCiudad(@RequestBody Ciudad ciudad){
        return ResponseEntity.ok(ciudadService.registrarCiudad(ciudad));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ciudad> actualizarCiudad(@PathVariable Long id, @RequestBody Ciudad ciudad) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(ciudadService.actualizarCiudad(ciudad));
    }


    @GetMapping
    public ResponseEntity<List<Ciudad>> listarCiudades () {
        return ResponseEntity.ok(ciudadService.buscarTodasCiudades());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ciudad> buscarCiudad(@PathVariable Long id){
        Optional<Ciudad> ciudadBuscada = ciudadService.buscarCiudad(id);
        if(ciudadBuscada.isPresent()){
            return ResponseEntity.ok(ciudadBuscada.get());
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCiudad (@PathVariable Long id) throws ResourceNotFoundException {
        Optional <Ciudad> ciudadBuscada = ciudadService.buscarCiudad(id);
        if (ciudadBuscada.isPresent()){
            ciudadService.eliminarCiudad(id);
            return ResponseEntity.ok("Se eliminó la ciudad con id: "+id);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se elimino la ciudad con id:" +
                    " "+id);
        }
    }


}
