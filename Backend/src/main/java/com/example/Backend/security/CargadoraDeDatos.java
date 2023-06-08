package com.example.Backend.security;


import com.example.Backend.models.Usuario;
import com.example.Backend.models.UsuarioRol;
import com.example.Backend.repository.UsuarioRepository;
import com.example.Backend.repository.UsuarioRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;
/*
@Component
public class CargadoraDeDatos implements ApplicationRunner {
    private UsuarioRepository usuarioRepository;
    private UsuarioRolRepository usuarioRolRepository;

    @Autowired
    public CargadoraDeDatos(UsuarioRepository usuarioRepository, UsuarioRolRepository usuarioRolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioRolRepository = usuarioRolRepository;
    }


    @Override
    public void run(ApplicationArguments args) {
        BCryptPasswordEncoder cifrador= new BCryptPasswordEncoder();
        String passACifrarAdmin="12345";
        String passCifradaAdmin=cifrador.encode(passACifrarAdmin);


        Optional<UsuarioRol> usuarioRol = usuarioRolRepository.findByRol("ADMIN");
        Usuario admin= new Usuario("Maria","Perez", "admin@gmail.com",passCifradaAdmin, usuarioRol.get(), null, null);

        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByEmail(admin.getEmail());

        if(!usuarioEncontrado.isPresent()){
            usuarioRepository.save(admin);
        }

    }
}
*/
