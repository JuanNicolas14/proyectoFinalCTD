package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "plan")
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @OneToMany(mappedBy = "plan")
    @JsonIgnore
    private Set<Restaurante> restaurantes= new HashSet<>();

    public Plan(String nombre) {
        this.nombre = nombre;
    }

    public Plan() {
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

}
