package com.example.Backend.service;

import com.example.Backend.models.Restaurante;
import com.example.Backend.repository.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestauranteService {
    private RestauranteRepository restauranteRepository;

    @Autowired
    public RestauranteService(RestauranteRepository restauranteRepository) {
        this.restauranteRepository = restauranteRepository;
    }

    /**
     * Guarda un restaurante en la base de datos
     * @param restaurante restaurante a guardar
     * @return Restaurante guardado
     */
    public Restaurante guardarRestaurante(Restaurante restaurante) {
        return restauranteRepository.save(restaurante);
    }

}
