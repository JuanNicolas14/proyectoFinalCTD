package com.example.Backend.models;

import javax.persistence.*;

import java.util.Date;

@Entity
@Table(name="reserva")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String horaEntrega;

    @Column
    private Date fechaInicio;

    @Column
    private Date fechaFinalizacion;

    @Column
    private String direccionEntrega;

    @Column
    private String telefonoUsuario;

    @ManyToOne
    @JoinColumn(name = "ciudad_id", referencedColumnName = "id")
    private Ciudad ciudad;

    @ManyToOne
    @JoinColumn(name = "usuario_id" ,referencedColumnName = "id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "restaurante_id" ,referencedColumnName = "id")
    private Restaurante restaurante;

    public Reserva(String horaEntrega, Date fechaInicio, Date fechaFinalizacion, Usuario usuario, Restaurante restaurante, String direccionEntrega,Ciudad ciudad, String telefonoUsuario) {
        this.horaEntrega = horaEntrega;
        this.fechaInicio = fechaInicio;
        this.fechaFinalizacion = fechaFinalizacion;
        this.usuario = usuario;
        this.restaurante = restaurante;
        this.direccionEntrega = direccionEntrega;
        this.ciudad = ciudad;
        this.telefonoUsuario = telefonoUsuario;
    }

    public Reserva() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setFechaInicio(Date horaReserva) {
        this.fechaInicio = horaReserva;
    }

    public Date getFechaFinalizacion() {
        return fechaFinalizacion;
    }

    public void setFechaFinalizacion(Date horaReserva) {
        this.fechaFinalizacion = horaReserva;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Restaurante getRestaurante() {
        return restaurante;
    }

    public void setRestaurante(Restaurante restaurante) {
        this.restaurante = restaurante;
    }

    public String getDireccionEntrega() {
        return direccionEntrega;
    }

    public void setDireccionEntrega(String direccionEntrega) {
        this.direccionEntrega = direccionEntrega;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public String getTelefonoUsuario() {
        return telefonoUsuario;
    }

    public void setTelefonoUsuario(String telefonoUsuario) {
        this.telefonoUsuario = telefonoUsuario;
    }

    @Override
    public String toString() {
        return "Reserva{" +
                "id=" + id +
                ", horaEntrega='" + horaEntrega + '\'' +
                ", fechaInicio=" + fechaInicio +
                ", fechaFinalizacion=" + fechaFinalizacion +
                ", direccionEntrega='" + direccionEntrega + '\'' +
                ", usuario=" + usuario +
                ", restaurante=" + restaurante +
                ", telefonoUsuario=" + telefonoUsuario +
                '}';
    }
}
