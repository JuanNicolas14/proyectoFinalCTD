package com.example.Backend.models;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.util.List;

public class RestauranteFormData {
    private String nombre;
    private List<MultipartFile> imagenes;
    private Long plan_id;
    private String descripcion;
    private double precio;
    private String calle;
    private String numero;
    private String localidad;
    private Long ciudad_id;
    private Long pais_id;
    private String reglas;
    private String saludYseguridad;
    private String politicas;

    public RestauranteFormData(String nombre, List<MultipartFile> imagenes, Long plan_id, String descripcion, double precio, String calle, String numero, String localidad, Long ciudad_id, Long pais_id,String reglas,String saludYseguridad, String politicas) {
        this.nombre = nombre;
        this.imagenes = imagenes;
        this.plan_id = plan_id;
        this.descripcion = descripcion;
        this.precio = precio;
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.ciudad_id = ciudad_id;
        this.pais_id = pais_id;
        this.reglas = reglas;
        this.saludYseguridad = saludYseguridad;
        this.politicas = politicas;
    }

    @Override
    public String toString() {
        return "RestauranteFormData{" +
                "nombre='" + nombre + '\'' +
                ", imagenes=" + imagenes +
                ", plan_id=" + plan_id +
                ", descripcion='" + descripcion + '\'' +
                ", precio=" + precio +
                ", calle='" + calle + '\'' +
                ", numero='" + numero + '\'' +
                ", localidad='" + localidad + '\'' +
                ", ciudad='" + ciudad_id + '\'' +
                ", pais_id=" + pais_id + '\'' +
                ", reglas=" + reglas + '\'' +
                ", saludYseguridad=" + saludYseguridad + '\'' +
                ", politicas=" + politicas +
                '}';
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<MultipartFile> getImagenes() {
        return imagenes;
    }

    public void setImagenes(List<MultipartFile> imagenes) {
        this.imagenes = imagenes;
    }

    public Long getPlan_id() {
        return plan_id;
    }

    public void setPlan_id(Long plan_id) {
        this.plan_id = plan_id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
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

    public Long getCiudad_id() {
        return ciudad_id;
    }

    public void setCiudad_id(Long ciudad_id) {
        this.ciudad_id = ciudad_id;
    }

    public Long getPais_id() {
        return pais_id;
    }

    public void setPais_id(Long pais_id) {
        this.pais_id = pais_id;
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
}
