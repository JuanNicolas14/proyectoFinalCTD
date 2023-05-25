package com.example.Backend.repository;

import com.example.Backend.models.UsuarioRol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRolRepository extends JpaRepository<UsuarioRol,Long> {
    //Buscar usuario por rol
    Optional<UsuarioRol> findByRol(String rol);
}
