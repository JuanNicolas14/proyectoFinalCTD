package com.example.Backend.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="usuario_rol")
public class UsuarioRol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String rol;
    @OneToMany(mappedBy = "usuarioRol")
    private List<Usuario> usuarios;

    public UsuarioRol(String rol) {
        this.rol = rol;
    }

    public UsuarioRol() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
