package com.example.Backend.models;

import java.sql.Date;

public class ReservaForm {
    private String horaEntrega;
    private Date fechaInicio;
    private Date fechaFinalizacion;
    private String direccionEntrega;
    private Long usuarioId;
    private Long restauranteId;
    private Long ciudadId;

    public ReservaForm(String horaEntrega, Date fechaInicio, Date fechaFinalizacion, String direccionEntrega, Long usuarioId, Long restauranteId, Long ciudadId) {
        this.horaEntrega = horaEntrega;
        this.fechaInicio = fechaInicio;
        this.fechaFinalizacion = fechaFinalizacion;
        this.direccionEntrega = direccionEntrega;
        this.usuarioId = usuarioId;
        this.restauranteId = restauranteId;
        this.ciudadId = ciudadId;
    }

    public String getHoraEntrega() {
        return horaEntrega;
    }

    public void setHoraEntrega(String horaEntrega) {
        this.horaEntrega = horaEntrega;
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

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuario) {
        this.usuarioId = usuario;
    }

    public Long getRestauranteId() {
        return restauranteId;
    }

    public void setRestauranteId(Long restaurante) {
        this.restauranteId = restaurante;
    }

    public Long getCiudadId() {
        return ciudadId;
    }

    public void setCiudadId(Long ciudad) {
        this.ciudadId = ciudad;
    }

    @Override
    public String toString() {
        return "ReservaForm{" +
                "horaEntrega='" + horaEntrega + '\'' +
                ", fechaInicio=" + fechaInicio +
                ", fechaFinalizacion=" + fechaFinalizacion +
                ", direccionEntrega='" + direccionEntrega + '\'' +
                ", usuarioId=" + usuarioId +
                ", restauranteId=" + restauranteId +
                ", ciudadId=" + ciudadId +
                '}';
    }
}
