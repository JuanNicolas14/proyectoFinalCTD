package com.example.Backend.service;

import com.example.Backend.dto.RestauranteDTO;
import com.example.Backend.models.Restaurante;
import com.example.Backend.repository.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.ArrayList;

@Service
public class RestauranteService {
    private RestauranteRepository restauranteRepository;

    private Logger logger = Logger.getLogger(RestauranteService.class.getName());

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
    public Optional<RestauranteDTO> buscarRestaurante(Long id) {
        Optional<Restaurante> restaurante = restauranteRepository.findById(id);
        if (restaurante.isEmpty()) {
            return Optional.empty();
        }
        RestauranteDTO restauranteDTO = convertirRestauranteARestauranteDTO(restaurante.get());
        return Optional.of(restauranteDTO);
    }

    /**
     * Busca todos los restaurantes
     * @return Lista de restaurantes
     */
    public List<RestauranteDTO> buscarTodosRestaurantes(Specification specification) {
        List<Restaurante> restaurantes = restauranteRepository.findAll(specification);
        List<RestauranteDTO> restaurantesDTO = new ArrayList<>();
        for (Restaurante restaurante:restaurantes) {
            restaurantesDTO.add(
                convertirRestauranteARestauranteDTO(restaurante)
            );
        }

        return restaurantesDTO;
    }

    /**
     * Busca todos los restaurantes filtrando por plan
     * @param plan nombre del plan
     * @return Lista de restaurantes
     */
    public List<RestauranteDTO> buscarPorPlan(String plan){
        List<Restaurante> restaurantes = restauranteRepository.findByPlan(plan);
        List<RestauranteDTO> restaurantesDTO = new ArrayList<>();
        logger.info("Convirtiendo restaurantes a DTO");
        for (Restaurante restaurante:restaurantes) {
            restaurantesDTO.add(
                    convertirRestauranteARestauranteDTO(restaurante)
            );
        }

        return restaurantesDTO;
    }

    /**
     * Elimina un restaurante por su id
     * @param id id del restaurante a eliminar
     */
    public void eliminarRestaurante(Long id) {
        restauranteRepository.deleteById(id);
    }

    /**
     * Convierte un restaurante a restauranteDTO
     * @param restaurante Restaurante a convertir
     * @return restauranteDTO
     */
    private RestauranteDTO convertirRestauranteARestauranteDTO(Restaurante restaurante) {
        RestauranteDTO restauranteDTO = new RestauranteDTO();
        restauranteDTO.setId(restaurante.getId());
        restauranteDTO.setNombre(restaurante.getNombre());
        restauranteDTO.setDescripcion(restaurante.getDescripcion());
        if (restaurante.getImagen() != null) {
            restauranteDTO.setImagenes(restaurante.getImagen());
        } else {
            restauranteDTO.setImagenes(null);
        }
        restauranteDTO.setCiudad(restaurante.getDomicilio().getCiudad().getNombreCiudad());
        restauranteDTO.setLatitud(restaurante.getDomicilio().getLatitud());
        restauranteDTO.setLongitud(restaurante.getDomicilio().getLongitud());
        restauranteDTO.setPais(restaurante.getDomicilio().getPais().getNombre());
        restauranteDTO.setPlan(restaurante.getPlan().getNombre());
        restauranteDTO.setPrecio(restaurante.getPrecio());

        if (restaurante.getPuntuaciones() != null) {
            restauranteDTO.setNumeroValoraciones(restaurante.getPuntuaciones().size());
            restauranteDTO.setPuntuacionPromedio(restaurante.getPuntuacionPromedio());
        } else {
            restauranteDTO.setNumeroValoraciones(0);
            restauranteDTO.setPuntuacionPromedio(0);
        }
        restauranteDTO.setReglas(restaurante.getReglas());
        restauranteDTO.setSaludYseguridad(restaurante.getSaludYseguridad());
        restauranteDTO.setPoliticas(restaurante.getPoliticas());
        restauranteDTO.setMenu(restaurante.getMenu());
        restauranteDTO.setHoraApertura(restaurante.getHoraApertura());
        restauranteDTO.setHoraCierre(restaurante.getHoraCierre());

        return restauranteDTO;
    }

    /**
     * Busca todos los restaurantes filtrando por ciudad y categoria
     * @param ciudad nombre de la ciudad
     * @param plan nombre de la categoria
     * @return Lista de restaurantes
     */
    public List<RestauranteDTO> buscarPorCiudadYPlan(String ciudad, String plan){
        List<Restaurante> restaurantes = restauranteRepository.findByCiudadAndPlan(ciudad, plan);
        List<RestauranteDTO> restaurantesDTO = new ArrayList<>();
        logger.info("Convirtiendo restaurantes filtrado por ciudad y plan a DTO");
        for (Restaurante restaurante:restaurantes) {
            restaurantesDTO.add(
                    convertirRestauranteARestauranteDTO(restaurante)
            );
        }

        return restaurantesDTO;
    }

    public Optional<Restaurante> findById(Long id) {
        return restauranteRepository.findById(id);
    }
}
