package com.example.Backend.service;

import com.example.Backend.dto.PuntuacionDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Puntuacion;
import com.example.Backend.models.Restaurante;
import com.example.Backend.models.Usuario;
import com.example.Backend.repository.PuntuacionRepository;
import com.example.Backend.repository.RestauranteRepository;
import com.example.Backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class PuntuacionService {

    private PuntuacionRepository puntuacionRepository;
    private RestauranteRepository restauranteRepository;
    private UsuarioRepository usuarioRepository;

    @Autowired
    public PuntuacionService(PuntuacionRepository puntuacionRepository, RestauranteRepository restauranteRepository, UsuarioRepository usuarioRepository) {
        this.puntuacionRepository = puntuacionRepository;
        this.restauranteRepository = restauranteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    private static final Logger logger = Logger.getLogger(PuntuacionService.class.getName());

    public PuntuacionDTO guardarPuntuacion(PuntuacionDTO puntuacionDTO) throws BadRequestException {
        if(puntuacionDTO.getPuntuacion() >= 1 && puntuacionDTO.getPuntuacion()<=5){
            Optional<Restaurante> restauranteBuscado = restauranteRepository.findById(puntuacionDTO.getRestaurante_id());
            Optional<Usuario> usuarioBuscado = usuarioRepository.findById(puntuacionDTO.getUsuario_id());

            Puntuacion puntuacion = puntuacionRepository.save(convertirPuntuacionDTOAPuntuacion(puntuacionDTO));

            restauranteBuscado.get().setPuntuacionPromedio(restauranteBuscado.get().calcularPromedioCalificaciones());
            restauranteBuscado.get().setNumeroValoraciones(restauranteBuscado.get().getPuntuaciones().size());
            restauranteRepository.save(restauranteBuscado.get());

            return convertirPuntuacionAPuntuacionDTO(puntuacion);
        }else {
            logger.warning("Error. Puntuación fuera del rango de 1 a 5");
            throw new BadRequestException("Error. Puntuación fuera del rango de 1 a 5");
        }

    }


    public Optional<PuntuacionDTO> buscarPuntuacion(Long id) throws ResourceNotFoundException {
        Optional<Puntuacion> puntuacionABuscar = puntuacionRepository.findById(id);
        if (puntuacionABuscar.isPresent()) {
            return Optional.of(convertirPuntuacionAPuntuacionDTO(puntuacionABuscar.get()));
        } else {
            throw new ResourceNotFoundException("No se encontró la puntuacion con id: " + id);
        }

    }

    public List<PuntuacionDTO> buscarTodasPuntuaciones() {
        List<Puntuacion> listaPuntuaciones = puntuacionRepository.findAll();
        List<PuntuacionDTO> listaPuntuacionesDTO = new ArrayList<>();

        for (Puntuacion listaPuntuacion : listaPuntuaciones) {
            listaPuntuacionesDTO.add(convertirPuntuacionAPuntuacionDTO(listaPuntuacion));
        }
        logger.info("Listando todos las Puntuaciones");

        return listaPuntuacionesDTO;
    }

    private Puntuacion convertirPuntuacionDTOAPuntuacion(PuntuacionDTO puntuacionDTO){
        Puntuacion puntuacion = new Puntuacion();

        puntuacion.setId(puntuacionDTO.getId());
        puntuacion.setPuntuacion(puntuacionDTO.getPuntuacion());
        puntuacion.setComentario(puntuacionDTO.getComentario());
        Optional<Restaurante> restauranteBuscado = restauranteRepository.findById(puntuacionDTO.getRestaurante_id());
        Optional<Usuario> usuarioBuscado = usuarioRepository.findById(puntuacionDTO.getUsuario_id());
        puntuacion.setRestaurante(restauranteBuscado.get());
        puntuacion.setUsuario(usuarioBuscado.get());

        return puntuacion;
    }

    private PuntuacionDTO convertirPuntuacionAPuntuacionDTO(Puntuacion puntuacion){
        PuntuacionDTO puntuacionDTO = new PuntuacionDTO();

        puntuacionDTO.setId(puntuacion.getId());
        puntuacionDTO.setPuntuacion(puntuacion.getPuntuacion());
        puntuacionDTO.setRestaurante_id(puntuacion.getRestaurante().getId());
        puntuacionDTO.setUsuario_id(puntuacion.getUsuario().getId());
        puntuacionDTO.setComentario(puntuacion.getComentario());
        Optional<Usuario> usuarioBuscado = usuarioRepository.findById(puntuacion.getUsuario().getId());
        puntuacionDTO.setNombreCompleto(usuarioBuscado.get().getNombre()+ " "+ usuarioBuscado.get().getApellido());

        return puntuacionDTO;
    }
}
