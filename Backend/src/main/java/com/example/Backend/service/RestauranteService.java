package com.example.Backend.service;

import com.example.Backend.models.Restaurante;
import com.example.Backend.repository.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    /**
     * Busca un restaurante por su id
     * @param id id del restaurante a buscar
     * @return Restaurante buscado
     */
    public Optional<Restaurante> buscarRestaurante(Long id) {
        return restauranteRepository.findById(id);
    }

    /**
     * Busca todos los restaurantes
     * @return Lista de restaurantes
     */
    public List<Restaurante> buscarTodosRestaurantes() {
        return restauranteRepository.findAll();
    }

}
