package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "restaurante")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Restaurante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurante_id")
    private Set<Imagen> imagen;

    @Column(name = "precio")
    private double precio;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "domicilio_id", referencedColumnName = "id")
    private Domicilio domicilio;

    @ManyToOne
    @JoinColumn(name = "plan_id", referencedColumnName = "id")
    private Plan plan;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurante_id")
    private Set<Puntuacion> puntuaciones;

    @Column(name = "puntuacion_promedio")
    private double puntuacionPromedio;

    @Column(name = "numero_valoraciones")
    private int numeroValoraciones;

    @Column(name = "reglas_restaurante")
    private String reglas;

    @Column(name = "salud_seguridad")
    private String saludYseguridad;

    @Column(name = "politicas")
    private String politicas;

    @Column(name = "menu", length = 500)
    private String menu;

    @JsonIgnore
    @ManyToMany(mappedBy = "restaurantesFavoritos")
    private Set<Usuario> usuariosFavoritos;

    @Column(name = "hora_apertura")
    private String horaApertura;

    @Column(name = "hora_cierre")
    private String horaCierre;

    // Constructor


    @Override
    public String toString() {
        return "Restaurante{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", imagen=" + imagen +
                ", precio=" + precio +
                ", domicilio=" + domicilio +
                ", plan=" + plan +
                ", puntuacionPromedio=" + puntuacionPromedio +
                ", numeroValoraciones=" + numeroValoraciones +
                ", reglas='" + reglas + '\'' +
                ", saludYseguridad='" + saludYseguridad + '\'' +
                ", politicas='" + politicas + '\'' +
                ", menu='" + menu + '\'' +
                ", horaApertura='" + horaApertura + '\'' +
                ", horaCierre='" + horaCierre + '\'' +
                '}';
    }

    public Restaurante(String nombre, String descripcion, Set<Imagen> imagen, double precio, Domicilio domicilio, Plan plan, String reglas, String saludYseguridad, String politicas, String menu, String horaApertura, String horaCierre) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.domicilio = domicilio;
        this.plan = plan;
        this.reglas = reglas;
        this.saludYseguridad = saludYseguridad;
        this.politicas = politicas;
        this.menu = menu;
        this.horaApertura = horaApertura;
        this.horaCierre = horaCierre;
    }

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

    public Restaurante() {
    }

    //Calificacion Promedio
    public double calcularPromedioCalificaciones() {
        if (puntuaciones.isEmpty()) {
            return 0.0; // Retorna 0 si no hay puntuaciones
        }

        int totalPuntuaciones = puntuaciones.size();
        int sumaPuntuaciones = 0;

        for (Puntuacion puntuacion : puntuaciones) {
            sumaPuntuaciones += puntuacion.getPuntuacion();
        }

        double promedio = (double) sumaPuntuaciones / totalPuntuaciones;
        return Math.round(promedio * 10.0) / 10.0; // Redondea el resultado a un decimal
    }


    // Getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Imagen> getImagen() {
        return imagen;
    }

    public void setImagen(Set<Imagen> imagen) {
        this.imagen = imagen;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public Domicilio getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(Domicilio domicilio) {
        this.domicilio = domicilio;
    }

    public Plan getPlan() {
        return plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public Set<Puntuacion> getPuntuaciones() {
        return puntuaciones;
    }

    public void setPuntuaciones(Set<Puntuacion> puntuaciones) {
        this.puntuaciones = puntuaciones;
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

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }

}
