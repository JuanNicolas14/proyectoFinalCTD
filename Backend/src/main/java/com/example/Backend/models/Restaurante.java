package com.example.Backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurante")
public class Restaurante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "imagen")
    private String imagen;

    private Long plan_id;

    // Constructor

    public Restaurante(String nombre, String descripcion, String imagen, Long plan_id) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.plan_id = plan_id;
    }

    public Restaurante() {
    }

    // Getters and setters

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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Long getPlan_id() {
        return plan_id;
    }

    public void setPlan_id(Long plan_id) {
        this.plan_id = plan_id;
    }

    // toString method

    /**
     * Retorna una representación en string del objeto
     * @return representación del objeto
     */
    @Override
    public String toString() {
        return "Restaurante{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripción='" + descripcion + '\'' +
                ", imagen='" + imagen + '\'' +
                '}';
    }
}
