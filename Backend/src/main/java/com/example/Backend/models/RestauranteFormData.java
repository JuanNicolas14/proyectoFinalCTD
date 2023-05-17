package com.example.Backend.models;

import org.springframework.web.multipart.MultipartFile;

public class RestauranteFormData {
    private String nombre;
    private MultipartFile imagen;
    private Long plan_id;
    private String descripcion;
    private double precio;
    private String calle;
    private String numero;
    private String localidad;
    private String ciudad;
    private Long pais_id;

    public RestauranteFormData(String nombre, Long plan_id, String descripcion, double precio, String calle, String numero, String localidad, String ciudad, Long pais_id) {
        this.nombre = nombre;
        this.plan_id = plan_id;
        this.descripcion = descripcion;
        this.precio = precio;
        this.calle = calle;
        this.numero = numero;
        this.localidad = localidad;
        this.ciudad = ciudad;
        this.pais_id = pais_id;
    }

    @Override
    public String toString() {
        return "RestauranteFormData{" +
                "nombre='" + nombre + '\'' +
                ", plan_id=" + plan_id +
                ", descripcion='" + descripcion + '\'' +
                ", precio=" + precio +
                ", calle=" + calle +
                ", numero=" + numero +
                ", localidad=" + localidad +
                ", ciudad=" + ciudad +
                ", pais_id=" + pais_id +
                '}';
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public MultipartFile getImagen() {
        return imagen;
    }

    public void setImagen(MultipartFile imagen) {
        this.imagen = imagen;
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

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public Long getPais_id() {
        return pais_id;
    }

    public void setPais_id(Long pais_id) {
        this.pais_id = pais_id;
    }
}
