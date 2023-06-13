package com.example.Backend.models;

import javax.persistence.*;
import java.math.BigDecimal;
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
    @Column
    private BigDecimal latitud;
    @Column
    private BigDecimal longitud;

    @OneToOne
    @JoinColumn(name = "pais_id",referencedColumnName = "id")
    private Pais pais;

    @ManyToOne
    @JoinColumn(name= "ciudad_id", referencedColumnName="id")
    private Ciudad ciudad;

    public Domicilio(String calle, String numero, String localidad, BigDecimal latitud, BigDecimal longitud, Pais pais, Ciudad ciudad) {
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.latitud = latitud;
        this.longitud = longitud;
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

    public BigDecimal getLatitud() {
        return latitud;
    }

    public void setLatitud(BigDecimal latitud) {
        this.latitud = latitud;
    }

    public BigDecimal getLongitud() {
        return longitud;
    }

    public void setLongitud(BigDecimal longitud) {
        this.longitud = longitud;
    }

}

