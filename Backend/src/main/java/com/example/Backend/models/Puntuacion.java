package com.example.Backend.models;

import javax.persistence.*;

@Entity
@Table(name = "puntuacion")
public class Puntuacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "puntuacion")
    private int puntuacion;

    @ManyToOne
    @JoinColumn(name = "restaurante_id", referencedColumnName = "id")
    private Restaurante restaurante;

    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    @Column(name = "comentario")
    private String comentario;

    // Constructor
    public Puntuacion(Long id, int puntuacion, Restaurante restaurante, Usuario usuario, String comentario) {
        this.id = id;
        this.puntuacion = puntuacion;
        this.restaurante = restaurante;
        this.usuario = usuario;
        this.comentario = comentario;
    }

    public Puntuacion() {
    }

    //Getters y setters

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

    public Restaurante getRestaurante() {
        return restaurante;
    }

    public void setRestaurante(Restaurante restaurante) {
        this.restaurante = restaurante;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    @Override
    public String toString() {
        return "Calificacion{" +
                "id=" + id +
                ", puntuacion=" + puntuacion +
                ", restaurante=" + restaurante +
                ", usuario=" + usuario +
                ", comentario=" + comentario +
                '}';
    }
}
