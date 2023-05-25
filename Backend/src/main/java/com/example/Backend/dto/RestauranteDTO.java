package com.example.Backend.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.example.Backend.models.Imagen;

public class RestauranteDTO {
    // Atributos
    private Long id;
    private String nombre;
    private String descripcion;
    private List<String> imagenes;
    private String ciudad;
    private String pais;
    private String plan;

    // Constructor
    public RestauranteDTO() {}

    // Getters and Setters
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String description) {
        this.descripcion = description;
    }

    public List<String> getImagenes() {
        return this.imagenes;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public void setImagenes(Set<Imagen> imagenes) {
        this.imagenes = new ArrayList<>();
        for (Imagen imagen:imagenes) {
            this.imagenes.add(imagen.getUrl());
        }
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    // Metodos

    @Override
    public String toString() {
        return "RestauranteDTO{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", imagenes=" + imagenes +
                ", ciudad='" + ciudad + '\'' +
                ", pais='" + pais + '\'' +
                ", plan='" + plan + '\'' +
                '}';
    }
}
