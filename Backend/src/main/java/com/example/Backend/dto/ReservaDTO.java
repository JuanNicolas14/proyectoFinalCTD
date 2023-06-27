package com.example.Backend.dto;

import java.util.Date;

public class ReservaDTO {
    private String nombreRestaurante;
    private String nombrePlan;
    private Date fechaInicio;
    private Date fechaFinalizacion;
    private String direccionEntrega;
    private String nombreCiudad;
    private String horaEntrega;
    private double precio;
    private String telefonoUsuario;

    public ReservaDTO(
        String nombreRestaurante,
        String nombrePlan,
        Date fechaInicio,
        Date fechaFinalizacion,
        String direccionEntrega,
        String nombreCiudad,
        String horaEntrega,
        double precio,
        String telefonoUsuario
    ) {
        this.nombreRestaurante = nombreRestaurante;
        this.nombrePlan = nombrePlan;
        this.fechaInicio = fechaInicio;
        this.fechaFinalizacion = fechaFinalizacion;
        this.direccionEntrega = direccionEntrega;
        this.nombreCiudad = nombreCiudad;
        this.horaEntrega = horaEntrega;
        this.precio = precio;
        this.telefonoUsuario = telefonoUsuario;
    }

    public ReservaDTO() {
    }

    public String getNombreRestaurante() {
        return nombreRestaurante;
    }

    public void setNombreRestaurante(String nombreRestaurante) {
        this.nombreRestaurante = nombreRestaurante;
    }

    public String getNombrePlan() {
        return nombrePlan;
    }

    public void setNombrePlan(String nombrePlan) {
        this.nombrePlan = nombrePlan;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFinalizacion() {
        return fechaFinalizacion;
    }

    public void setFechaFinalizacion(Date horaReserva) {
        this.fechaFinalizacion = horaReserva;
    }

    public String getDireccionEntrega() {
        return direccionEntrega;
    }

    public void setDireccionEntrega(String direccionEntrega) {
        this.direccionEntrega = direccionEntrega;
    }

    public String getNombreCiudad() {
        return nombreCiudad;
    }

    public void setNombreCiudad(String ciudad) {
        this.nombreCiudad = ciudad;
    }

    public String getHoraEntrega() {
        return horaEntrega;
    }

    public void setHoraEntrega(String horaEntrega) {
        this.horaEntrega = horaEntrega;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getTelefonoUsuario() {
        return telefonoUsuario;
    }

    public void setTelefonoUsuario(String telefonoUsuario) {
        this.telefonoUsuario = telefonoUsuario;
    }

    @Override
    public String toString() {
        return "ReservaDTO{" +
            "nombreRestaurante='" + nombreRestaurante + '\'' +
            ", nombrePlan='" + nombrePlan + '\'' +
            ", fechaInicio=" + fechaInicio +
            ", fechaFinalizacion=" + fechaFinalizacion +
            ", direccionEntrega='" + direccionEntrega + '\'' +
            ", nombreCiudad='" + nombreCiudad + '\'' +
            ", horaEntrega='" + horaEntrega + '\'' + ", telefonoUsuario='" + telefonoUsuario + '\'' +
            '}';
    }
}
