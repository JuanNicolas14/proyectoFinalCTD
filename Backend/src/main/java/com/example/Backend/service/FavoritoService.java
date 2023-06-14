package com.example.Backend.service;

import com.amazonaws.services.dlm.model.ResourceNotFoundException;
import com.example.Backend.models.Restaurante;
import com.example.Backend.models.Usuario;
import com.example.Backend.repository.RestauranteRepository;
import com.example.Backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class FavoritoService {

    private UsuarioRepository usuarioRepository;
    private RestauranteRepository restauranteRepository;

    @Autowired
    public FavoritoService(UsuarioRepository usuarioRepository, RestauranteRepository restauranteRepository) {
        this.usuarioRepository = usuarioRepository;
        this.restauranteRepository = restauranteRepository;
    }

    public void agregarFavorito (Long usuarioId, Long restauranteId) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        Restaurante restaurante = restauranteRepository.findById(restauranteId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurante no encontrado"));
        usuario.agregarRestauranteFavorito(restaurante);
        usuarioRepository.save(usuario);
    }

    public void eliminarRestauranteFavorito(Long usuarioId, Long restauranteId) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        Restaurante restaurante = restauranteRepository.findById(restauranteId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurante no encontrado"));
        usuario.eliminarRestauranteFavorito(restaurante);
        usuarioRepository.save(usuario);
    }

    public Set<Restaurante> listarFavoritos (Long usuarioId) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return usuario.getRestaurantesFavoritos();
    }
}