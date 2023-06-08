package com.example.Backend.models;

import javax.persistence.*;
@Entity
@Table(name = "domicilio")
public class Domicilio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String calle;
    @Column
    private String numero;
    @Column
    private String localidad;

    @OneToOne
    @JoinColumn(name = "pais_id",referencedColumnName = "id")
    private Pais pais;

    @ManyToOne
    @JoinColumn(name= "ciudad_id", referencedColumnName="id")
    private Ciudad ciudad;

    public Domicilio(String calle, String numero, String localidad, Pais pais, Ciudad ciudad) {
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.pais = pais;
        this.ciudad = ciudad;
    }

    public Domicilio() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public Pais getPais() {
        return pais;
    }

    public void setPais(Pais pais) {
        this.pais = pais;
    }

}

