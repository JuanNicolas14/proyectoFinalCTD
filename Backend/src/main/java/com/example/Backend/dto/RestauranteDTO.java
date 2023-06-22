package com.example.Backend.dto;

import java.math.BigDecimal;
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
    private double precio;
    private double puntuacionPromedio;
    private int numeroValoraciones;
    private String reglas;
    private String saludYseguridad;
    private String politicas;

    private String menu;

    private BigDecimal latitud;
    private BigDecimal longitud;

    private String horaApertura;

    private String horaCierre;

    // Constructor
    public RestauranteDTO() {}

    // Getters and Setters

    public String getHoraApertura() {
        return horaApertura;
    }

    public void setHoraApertura(String horaApertura) {
        this.horaApertura = horaApertura;
    }

    public String getHoraCierre() {
        return horaCierre;
    }

    public void setHoraCierre(String horaCierre) {
        this.horaCierre = horaCierre;
    }

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

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public double getPuntuacionPromedio() {
        return puntuacionPromedio;
    }

    public void setPuntuacionPromedio(double puntuacionPromedio) {
        this.puntuacionPromedio = puntuacionPromedio;
    }

    public int getNumeroValoraciones() {
        return numeroValoraciones;
    }

    public void setNumeroValoraciones(int numeroValoraciones) {
        this.numeroValoraciones = numeroValoraciones;
    }

    public String getReglas() {
        return reglas;
    }

    public void setReglas(String reglas) {
        this.reglas = reglas;
    }

    public String getSaludYseguridad() {
        return saludYseguridad;
    }

    public void setSaludYseguridad(String saludYseguridad) {
        this.saludYseguridad = saludYseguridad;
    }

    public String getPoliticas() {
        return politicas;
    }

    public void setPoliticas(String politicas) {
        this.politicas = politicas;
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

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }

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
                ", precio=" + precio +
                ", puntuacionPromedio=" + puntuacionPromedio +
                ", numeroValoraciones=" + numeroValoraciones +
                ", reglas='" + reglas + '\'' +
                ", saludYseguridad='" + saludYseguridad + '\'' +
                ", politicas='" + politicas + '\'' +
                ", menu='" + menu + '\'' +
                '}';
    }
}
