package com.example.Backend.controllers;

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
}
