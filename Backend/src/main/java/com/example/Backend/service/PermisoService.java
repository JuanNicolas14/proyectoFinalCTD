package com.example.Backend.service;

import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Permiso;
import com.example.Backend.repository.PermisoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class PermisoService {
    private final PermisoRepository permisoRepository;

    @Autowired
    public PermisoService(PermisoRepository permisoRepository) {
        this.permisoRepository = permisoRepository;
    }

    private static final Logger logger = Logger.getLogger(PermisoService.class.getName());

    /**
     * Guarda un permiso en la base de datos
     * @param permiso permiso a guardar
     * @return Permiso guardado
     */
    public Permiso guardarPermiso(Permiso permiso) throws BadRequestException {
        if (permiso.getNombre() != null && permiso.getNombre().length() > 0) {
            String permisoFormateado = permiso.getNombre().replaceAll("\\s+", "").toUpperCase();
            permiso.setNombre(permisoFormateado);
            Optional<Permiso> permisoEncontrado = permisoRepository.findByNombre(permisoFormateado);
            if (!permisoEncontrado.isPresent()) {
                logger.info("Guardando rol: " + permiso.toString());

                return permisoRepository.save(permiso);
            } else {
                logger.warning("Error. No se pudo guardar el permiso porque está repetido.");
                throw new BadRequestException("Error. No se pudo guardar el permiso porque está repetido.");
            }
        } else {
            logger.warning("Error. No se pudo guardar el permiso. Alguno de los campos de registro del permiso está incompleto.");
            throw new BadRequestException("Error. No se pudo guardar el permiso. Alguno de los campos de registro del permiso está incompleto.");
        }
    }


    /**
     * Busca un permiso por su id
     * @param id id del permiso a buscar
     * @return Permiso buscado
     */
    public Optional<Permiso> buscarPermiso (Long id) throws ResourceNotFoundException {
        Optional<Permiso> permisoABuscar = permisoRepository.findById(id);
        if (permisoABuscar.isPresent()){
            this.logger.info("Buscando permiso con id: " + id);
            return permisoABuscar;
        }else {
            this.logger.warning("No se encontró el permiso con id: " + id);
            throw new ResourceNotFoundException("No se encontró el permiso con id: " + id);
        }

    }

    /**
     * Busca todos los permisos
     * @return Lista de permisos
     */
    public List<Permiso> buscarTodosPermisos() {
        List<Permiso> listaPermisos = permisoRepository.findAll();
        logger.info("Listando todos los permisos");
        return listaPermisos;

    }

    /**
     * Método para actualizar un rol
     * @param permiso UsuarioRol con los datos a actualizar
     */
    public Permiso actualizarPermiso(Permiso permiso) throws ResourceNotFoundException, BadRequestException {
        Optional<Permiso> permisoBuscado = permisoRepository.findById(permiso.getId());
        if (permisoBuscado.isPresent()){
            return permisoRepository.save(permiso);
        }else{
            logger.warning("No se pudo actualizar, no existe el permiso con Id = "+ permiso.getId());
            throw new ResourceNotFoundException("Error. No existe el permiso con id = "+ permiso.getId());
        }
    }

    /**
     * Elimina un permiso por su id
     * @param id del permiso a eliminar
     */
    public void eliminarPermiso(Long id) throws ResourceNotFoundException {
        Optional<Permiso> permisoBuscado = permisoRepository.findById(id);
        if (permisoBuscado.isPresent()){
            permisoRepository.deleteById(id);
        }else{
            logger.warning("No se pudo eliminar permiso con Id = "+id);
            throw new ResourceNotFoundException("Error. No existe el rpermisool con id = "+id);
        }
    }

}