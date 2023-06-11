package com.example.Backend.controllers;

import com.example.Backend.models.Pais;
import com.example.Backend.service.PaisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/paises")
public class PaisController {

    @Autowired
    private PaisService paisService;

    @GetMapping
    public ResponseEntity<List<Pais>> listarPaises () {
        return ResponseEntity.ok(paisService.listarPaises());
    }

}
