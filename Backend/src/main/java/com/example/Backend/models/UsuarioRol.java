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

    @ManyToMany
    @JoinTable(
            name = "rol_permiso",
            joinColumns = @JoinColumn(name = "rol_id"),
            inverseJoinColumns = @JoinColumn(name = "permiso_id")
    )
    private List<Permiso> permisos;

    public UsuarioRol(Long id, String rol, List<Permiso> permisos) {
        this.id = id;
        this.rol = rol;
        this.permisos = permisos;
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

    public List<Permiso> getPermisos() {
        return permisos;
    }

    public void setPermisos(List<Permiso> permisos) {
        this.permisos = permisos;
    }

    @Override
    public String toString() {
        return "UsuarioRol{" +
                "id=" + id +
                ", rol='" + rol + '\'' +
                '}';
    }
}
