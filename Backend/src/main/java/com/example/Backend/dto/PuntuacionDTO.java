package com.example.Backend.dto;

public class PuntuacionDTO {

    private Long id;
    private int puntuacion;
    private Long restaurante_id;

    private Long usuario_id;

    private String comentario;

    private String nombreCompleto;

    public PuntuacionDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(int puntuacion) {
        this.puntuacion = puntuacion;
    }

    public Long getRestaurante_id() {
        return restaurante_id;
    }

    public void setRestaurante_id(Long restaurante_id) {
        this.restaurante_id = restaurante_id;
    }

    public Long getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Long usuario_id) {
        this.usuario_id = usuario_id;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    @Override
    public String toString() {
        return "CalificacionDTO{" +
                "id=" + id +
                ", puntuacion=" + puntuacion +
                ", restaurante_id=" + restaurante_id +
                ", usuario_id=" + usuario_id +
                ", comentario=" + comentario +
                ", nombreCompleto=" + nombreCompleto +
                '}';
    }
}
