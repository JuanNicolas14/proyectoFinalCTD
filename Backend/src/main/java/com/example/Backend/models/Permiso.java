package com.example.Backend.models;

import javax.persistence.*;

@Entity
@Table(name = "permiso")
public class Permiso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nombre;

    public Permiso(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public Permiso() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Permiso{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}
