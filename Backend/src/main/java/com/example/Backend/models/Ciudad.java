package com.example.Backend.models;

import javax.persistence.*;

@Entity
@Table(name= "ciudad")
public class Ciudad {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;
    @Column (name ="nombreCiudad")
    private String nombreCiudad;

    public Ciudad(String nombreCiudad) {
        this.nombreCiudad = nombreCiudad;
    }

    public Ciudad() {
    }

    public String getNombreCiudad() {
        return nombreCiudad;
    }

    public void setNombreCiudad(String nombreCiudad) {
        this.nombreCiudad = nombreCiudad;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Ciudad{" +
                "id=" + id +
                ", nombreCiudad='" + nombreCiudad + '\'' +
                '}';
    }

    public void setNombre(String nombre) {
        this.nombreCiudad = nombre;
    }
}
