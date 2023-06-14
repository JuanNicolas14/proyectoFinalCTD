package com.example.Backend.service;

import com.example.Backend.dto.RolDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Permiso;
import com.example.Backend.models.UsuarioRol;
import com.example.Backend.repository.PermisoRepository;
import com.example.Backend.repository.UsuarioRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class RolService {
    private final UsuarioRolRepository usuarioRolRepository;
    private final PermisoRepository permisoRepository;

    @Autowired
    public RolService(UsuarioRolRepository usuarioRolRepository, PermisoRepository permisoRepository) {
        this.usuarioRolRepository = usuarioRolRepository;
        this.permisoRepository = permisoRepository;
    }

    private static final Logger logger = Logger.getLogger(RolService.class.getName());

    /**
     * Guarda un rol en la base de datos
     * @param rolDTO rol a guardar
     * @return UsuarioRol guardado
     */

    public RolDTO guardarRol(RolDTO rolDTO) throws BadRequestException {
        if (rolDTO.getRol() != null && rolDTO.getRol().length() > 0) {
            String rolFormateado = rolDTO.getRol().replaceAll("\\s+", "").toUpperCase();
            rolDTO.setRol(rolFormateado);
            Optional<UsuarioRol> usuarioRolEncontrado = usuarioRolRepository.findByRol(rolDTO.getRol());
            if (!usuarioRolEncontrado.isPresent()) {
                UsuarioRol usuarioRol = convertirRolDTOaRol(rolDTO);
                logger.info("Guardando rol: " + rolDTO.getRol());

                return convertirRolaRolDTO(usuarioRolRepository.save(usuarioRol));
            } else {
                logger.warning("Error. No se pudo guardar el rol porque está repetido.");
                throw new BadRequestException("Error. No se pudo guardar el rol porque está repetido.");
            }
        } else {
            logger.warning("Error. No se pudo guardar el rol. Alguno de los campos de registro del rol está incompleto.");
            throw new BadRequestException("Error. No se pudo guardar el rol. Alguno de los campos de registro del rol está incompleto.");
        }
    }


    /**
     * Busca un rol por su id
     * @param id id del rol a buscar
     * @return UsuarioRol buscado
     */
    public Optional<RolDTO> buscarRol (Long id) throws ResourceNotFoundException {
        Optional<UsuarioRol> rolABuscar = usuarioRolRepository.findById(id);
        if (rolABuscar.isPresent()){
            this.logger.info("Buscando rol con id: " + id);
            return  Optional.of(convertirRolaRolDTO(rolABuscar.get()));
        }else {
            this.logger.warning("No se encontró el rol con id: " + id);
            throw new ResourceNotFoundException("No se encontró el rol con id: " + id);
        }
    }

    /**
     * Busca todos los roles
     * @return Lista de roles
     */
    public List<RolDTO> buscarTodosRoles() {
        List<UsuarioRol> listaRoles = usuarioRolRepository.findAll();
        List<RolDTO> listaRolesDTO = new ArrayList<>();
        for (UsuarioRol listaUsuarioRol : listaRoles) {
            listaRolesDTO.add(convertirRolaRolDTO(listaUsuarioRol));
        }
        logger.info("Listando todos los roles");
        return listaRolesDTO;

    }

    /**
     * Método para actualizar un rol
     * @param rolDTO UsuarioRol con los datos a actualizar
     */
    public RolDTO actualizarRol(RolDTO rolDTO) throws ResourceNotFoundException, BadRequestException {
        Optional<UsuarioRol> rolBuscado = usuarioRolRepository.findById(rolDTO.getId());
        if (rolBuscado.isPresent()){
            UsuarioRol usuarioRol = convertirRolDTOaRol(rolDTO);
            logger.info("Actualizando rol: " + rolDTO.toString());
            return convertirRolaRolDTO(usuarioRolRepository.save(usuarioRol));

        }else{
            logger.warning("No se pudo actualizar, no existe el rol con Id= "+ rolDTO.getId());
            throw new ResourceNotFoundException("Error. No existe el rol con id= "+ rolDTO.getId());
        }
    }

    /**
     * Elimina un rol por su id
     * @param id id del rol a eliminar
     */
    public void eliminarRol(Long id) throws ResourceNotFoundException {
        Optional<UsuarioRol> rolBuscado = usuarioRolRepository.findById(id);
        if (rolBuscado.isPresent()){
            usuarioRolRepository.deleteById(id);
        }else{
            logger.warning("No se pudo eliminar rol con Id = "+id);
            throw new ResourceNotFoundException("Error. No existe el rol con id = "+id);
        }
    }

    private UsuarioRol convertirRolDTOaRol(RolDTO rolDTO){
        UsuarioRol usuarioRol = new UsuarioRol();
        List<Permiso> permisosEncontrados = new ArrayList<>();

        usuarioRol.setId(rolDTO.getId());
        usuarioRol.setRol(rolDTO.getRol());
        List<String> permisos = rolDTO.getPermisos();
        for (String permiso:permisos ) {
            permisosEncontrados.add(permisoRepository.findByNombre(permiso).get());
        }
        usuarioRol.setPermisos(permisosEncontrados);

        return usuarioRol;
    }

    private RolDTO convertirRolaRolDTO(UsuarioRol usuarioRol){
        RolDTO rolDTO = new RolDTO();
        List<String> permisosEncontrados = new ArrayList<>();

        rolDTO.setId(usuarioRol.getId());
        rolDTO.setRol(usuarioRol.getRol());
        List<Permiso> permisos = usuarioRol.getPermisos();
        for (Permiso permiso:permisos ) {
            permisosEncontrados.add(permiso.getNombre());
        }
        rolDTO.setPermisos(permisosEncontrados);

        return rolDTO;
    }

}
