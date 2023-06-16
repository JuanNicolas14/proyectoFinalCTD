package com.example.Backend.service;

import com.example.Backend.dto.RolDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Ciudad;
import com.example.Backend.models.UsuarioRol;
import com.example.Backend.repository.CiudadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class CiudadService {
    private final CiudadRepository ciudadRepository;

    private static final Logger logger = Logger.getLogger(CiudadService.class.getName());

    @Autowired
    public CiudadService(CiudadRepository ciudadRepository) {
        this.ciudadRepository = ciudadRepository;
    }
    public Ciudad registrarCiudad(Ciudad ciudad){
        return ciudadRepository.save(ciudad);
    }

    public Ciudad actualizarCiudad(Ciudad ciudad) throws ResourceNotFoundException, BadRequestException {
        Optional<Ciudad> ciudadBuscada = ciudadRepository.findById(ciudad.getId());
        if (ciudadBuscada.isPresent()){
            logger.info("Actualizando ciudad: " + ciudad.toString());
            return ciudadRepository.save(ciudad);

        }else{
            logger.warning("No se pudo actualizar, no existe la ciudad con Id= "+ ciudad.getId());
            throw new ResourceNotFoundException("Error. No existe la ciudad con id= "+ ciudad.getId());
        }
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
