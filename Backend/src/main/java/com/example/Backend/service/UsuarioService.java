package com.example.Backend.service;

import com.example.Backend.dto.UsuarioDTO;
import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Usuario;
import com.example.Backend.models.UsuarioRol;
import com.example.Backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

;

@Service
public class UsuarioService {

    private UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    private static final Logger logger = Logger.getLogger(UsuarioService.class.getName());

    //@Override
    //public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    //    Optional<Usuario> usuarioBuscado=usuarioRepository.findByEmail(username);
    //    if (usuarioBuscado.isPresent()){
    //        logger.info("Usuario encontrado con email= "+username);
    //        return usuarioBuscado.get();
    //    }
    //    else{
    //        logger.warning("Error. Usuario con email "+username+" no encontrado en la BD");
    //        throw new UsernameNotFoundException("Error. Usuario con email "+username+" no encontrado en la BD");
    //    }
    //}


    public UsuarioDTO guardarUsuario(UsuarioDTO usuarioDTO) throws BadRequestException {
        if(usuarioDTO.getNombre() != null && usuarioDTO.getApellido() != null && usuarioDTO.getEmail() != null &&
                usuarioDTO.getPassword() != null && usuarioDTO.getRol_id() != null) {

            this.logger.info("Guardando usuario: " + usuarioDTO.toString());
            Usuario usuario = convertirUsuarioDTOaUsuario(usuarioDTO);
            return convertirUsuarioaUsuarioDTO(usuarioRepository.save(usuario));

        } else {
            logger.warning("Error. No se pudo guardar el usuario. Alguno de los campos de registro del usuario está incompleto");
            throw new BadRequestException("Error. No se pudo guardar el usuario. Alguno de los campos de registro del usuario está incompleto");
        }
    }


    public Optional<UsuarioDTO> buscarUsuario (Long id) throws ResourceNotFoundException {
        Optional<Usuario> usuarioABuscar=usuarioRepository.findById(id);
        if (usuarioABuscar.isPresent()){
            return  Optional.of(convertirUsuarioaUsuarioDTO(usuarioABuscar.get()));
        }else {
            throw new ResourceNotFoundException("No se encontró el usuario con id: " + id);
        }

    }

    public List<UsuarioDTO> buscarTodosUsuarios() {
        List<Usuario> listaUsuarios = usuarioRepository.findAll();
        List<UsuarioDTO> listaUsuariosDTO = new ArrayList<>();
        for (Usuario listaUsuario : listaUsuarios) {
            listaUsuariosDTO.add(convertirUsuarioaUsuarioDTO(listaUsuario));
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

    private Usuario convertirUsuarioDTOaUsuario(UsuarioDTO usuarioDTO){
        Usuario usuario = new Usuario();
        UsuarioRol usuarioRol = new UsuarioRol();

        usuario.setId(usuarioDTO.getId());
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setApellido(usuarioDTO.getApellido());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setPassword(usuarioDTO.getPassword());
        usuarioRol.setId(usuarioDTO.getRol_id());
        usuario.setUsuarioRol(usuarioRol);

        return usuario;
    }

    private UsuarioDTO convertirUsuarioaUsuarioDTO(Usuario usuario){
        UsuarioDTO usuarioDTO = new UsuarioDTO();

        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setNombre(usuario.getNombre());
        usuarioDTO.setApellido(usuario.getApellido());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setPassword(usuario.getPassword());
        usuarioDTO.setRol_id(usuario.getUsuarioRol().getId());

        return usuarioDTO;
    }
}
