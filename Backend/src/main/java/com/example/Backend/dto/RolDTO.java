package com.example.Backend.dto;

import java.util.List;

public class RolDTO {
    private Long id;
    private String rol;
    private List<String> permisos;

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

    public List<String> getPermisos() {
        return permisos;
    }

    public void setPermisos(List<String> permisos) {
        this.permisos = permisos;
    }

    @Override
    public String toString() {
        return "RolDTO{" +
                "id=" + id +
                ", rol='" + rol + '\'' +
                ", permisos=" + permisos +
                '}';
    }
}