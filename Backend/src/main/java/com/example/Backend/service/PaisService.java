package com.example.Backend.service;

import com.example.Backend.models.Pais;
import com.example.Backend.repository.PaisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaisService {
    private PaisRepository paisRepository;

    @Autowired
    public PaisService(PaisRepository paisRepository) {
        this.paisRepository = paisRepository;
    }

    public List<Pais> listarPaises(){
        return paisRepository.findAll();
    }
    public Pais buscarPais(Long id) {
        return paisRepository.findById(id).orElse(null);
    }

}
