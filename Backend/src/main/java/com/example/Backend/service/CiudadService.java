package com.example.Backend.service;

import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Ciudad;
import com.example.Backend.repository.CiudadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CiudadService {
    private CiudadRepository ciudadRepository;

    @Autowired
    public CiudadService(CiudadRepository ciudadRepository) {
        this.ciudadRepository = ciudadRepository;
    }
    public Ciudad registrarCiudad(Ciudad ciudad){
        return ciudadRepository.save(ciudad);
    }
    public Ciudad actualizarCiudad(Ciudad ciudad){
        return ciudadRepository.save(ciudad);
    }
    public List<Ciudad> buscarTodasCiudades(){
        return ciudadRepository.findAll();
    }
    public Optional<Ciudad> buscarCiudad (Long id){
        return ciudadRepository.findById(id);
    }
    public void eliminarCiudad(Long id) throws ResourceNotFoundException {
        Optional<Ciudad> ciudadBuscada = ciudadRepository.findById(id);
        if(ciudadBuscada.isPresent()){
            ciudadRepository.deleteById(id);
        }
        else{
            throw new ResourceNotFoundException("Error. No existe la ciudad");
        }

    }

}
