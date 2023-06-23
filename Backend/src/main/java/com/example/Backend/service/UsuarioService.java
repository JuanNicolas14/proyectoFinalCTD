package com.example.Backend.service;

import com.example.Backend.dto.UsuarioDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Permiso;
import com.example.Backend.models.Usuario;
import com.example.Backend.models.UsuarioRol;
import com.example.Backend.repository.UsuarioRepository;
import com.example.Backend.repository.UsuarioRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioRolRepository usuarioRolRepository;
    private static final Logger logger = Logger.getLogger(UsuarioService.class.getName());

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, UsuarioRolRepository usuarioRolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioRolRepository = usuarioRolRepository;
    }

    public UsuarioDTO guardarUsuario(UsuarioDTO usuarioDTO) throws BadRequestException {
        if(usuarioDTO.getNombre() != null && usuarioDTO.getApellido() != null && usuarioDTO.getEmail() != null &&
                usuarioDTO.getPassword() != null) {

            BCryptPasswordEncoder cifradorContrasena= new BCryptPasswordEncoder();
            usuarioDTO.setPassword(cifradorContrasena.encode(usuarioDTO.getPassword()));
            usuarioDTO.setRol("USER");

            Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(usuarioDTO.getEmail());
            if (usuarioExistente.isPresent()) {
                throw new BadRequestException("Error. El email ya está registrado.");
            } else {
                Usuario usuario = convertirUsuarioDTOaUsuario(usuarioDTO);
                logger.info("Guardando usuario: " + usuarioDTO);
                return convertirUsuarioaUsuarioDTO(usuarioRepository.save(usuario));
            }

        } else {
            logger.warning("Error. No se pudo guardar el usuario. Alguno de los campos de registro del usuario está incompleto");
            throw new BadRequestException("Error. No se pudo guardar el usuario. Alguno de los campos de registro del usuario está incompleto");
        }
    }


    public Optional<UsuarioDTO> buscarUsuario (Long id) throws ResourceNotFoundException {
        Optional<Usuario> usuarioABuscar=usuarioRepository.findById(id);
        if (usuarioABuscar.isPresent()){
            Optional<UsuarioDTO> usuarioDTO = Optional.of(convertirUsuarioaUsuarioDTO(usuarioABuscar.get()));
            UsuarioRol usuarioRolEncontrado = usuarioRolRepository.findById(usuarioABuscar.get().getUsuarioRol().getId()).get();
            List<String> permisosParaUsuarioDTO = new ArrayList<>();
            for (Permiso permiso: usuarioRolEncontrado.getPermisos()) {
                permisosParaUsuarioDTO.add(permiso.getNombre());
            }
            usuarioDTO.get().setPermisos(permisosParaUsuarioDTO);
            return usuarioDTO;
        }else {
            throw new ResourceNotFoundException("No se encontró el usuario con id: " + id);
        }
    }

    public List<UsuarioDTO> buscarTodosUsuarios() {
        List<Usuario> listaUsuarios = usuarioRepository.findAll();
        List<UsuarioDTO> listaUsuariosDTO = new ArrayList<>();
        for (Usuario listaUsuario : listaUsuarios) {
            Optional<UsuarioDTO> usuarioDTO = Optional.of(convertirUsuarioaUsuarioDTO(listaUsuario));
            UsuarioRol usuarioRolEncontrado = usuarioRolRepository.findById(listaUsuario.getUsuarioRol().getId()).get();
            List<String> permisosParaUsuarioDTO = new ArrayList<>();
            for (Permiso permiso: usuarioRolEncontrado.getPermisos()) {
                permisosParaUsuarioDTO.add(permiso.getNombre());
            }
            usuarioDTO.get().setPermisos(permisosParaUsuarioDTO);
            listaUsuariosDTO.add(usuarioDTO.get());
        }
        logger.info("Listando todos los usuarios");

        return listaUsuariosDTO;
    }


    public void eliminarUsuario(Long id) throws ResourceNotFoundException {
        Optional<Usuario> usuarioBuscado = usuarioRepository.findById(id);
        if (usuarioBuscado.isPresent()){
            usuarioRepository.deleteById(id);
        }else{
            logger.warning("No se pudo eliminar usuario con Id= "+id);
            throw new ResourceNotFoundException("Error. No existe el usuario con id= "+id);
        }

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.info("Buscando usuario con email: " + email);
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        if (usuario.isPresent()){
            logger.info("Usuario encontrado: " + usuario.get());
            return usuario.get();
        }
        else{
            logger.warning("Error. Usuario no encontrado en la BD");
            throw new UsernameNotFoundException("Error. Usuario no encontrado en la BD");
        }
    }

    /**
     * Método para actualizar un usuario
     * @param usuarioDTO UsuarioDTO con los datos a actualizar
     */
    public UsuarioDTO actualizarUsuario(UsuarioDTO usuarioDTO) throws ResourceNotFoundException {
        Optional<Usuario> usuarioBuscado = usuarioRepository.findById(usuarioDTO.getId());
        if (usuarioBuscado.isPresent()){
            Usuario usuario = convertirUsuarioDTOaUsuario(usuarioDTO);
            logger.info("Actualizando usuario: " + usuarioDTO.toString());
            return convertirUsuarioaUsuarioDTO(usuarioRepository.save(usuario));
        }else{
            logger.warning("No se pudo actualizar usuario con Id= "+usuarioDTO.getId());
            throw new ResourceNotFoundException("Error. No existe el usuario con id= "+usuarioDTO.getId());
        }
    }

    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }


    private Usuario convertirUsuarioDTOaUsuario(UsuarioDTO usuarioDTO){
        Usuario usuario = new Usuario();
        Optional<UsuarioRol> usuarioRolBuscado;

        usuario.setId(usuarioDTO.getId());
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setApellido(usuarioDTO.getApellido());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setPassword(usuarioDTO.getPassword());
        usuarioRolBuscado = usuarioRolRepository.findByRol(usuarioDTO.getRol());
        usuario.setUsuarioRol(usuarioRolBuscado.get());
        usuario.setValidado(usuarioDTO.getValidado());
        usuario.setFechaCreacion(usuarioDTO.getFechaCreacion());

        return usuario;
    }

    private UsuarioDTO convertirUsuarioaUsuarioDTO(Usuario usuario){
        UsuarioDTO usuarioDTO = new UsuarioDTO();

        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setNombre(usuario.getNombre());
        usuarioDTO.setApellido(usuario.getApellido());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setPassword(usuario.getPassword());
        usuarioDTO.setRol(usuario.getUsuarioRol().getRol());
        usuarioDTO.setValidado(usuario.getValidado());
        usuarioDTO.setFechaCreacion(usuario.getFechaCreacion());

        return usuarioDTO;
    }

}
