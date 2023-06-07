package com.example.Backend.models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "restaurante")
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

    // Constructor


    public Restaurante(String nombre, String descripcion, Set<Imagen> imagen, double precio, Domicilio domicilio, Plan plan) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.domicilio = domicilio;
        this.plan = plan;
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

        return (double) sumaPuntuaciones / totalPuntuaciones;
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
                ", puntuaciónPromedio=" + puntuacionPromedio +
                ", numeroValoraciones=" + numeroValoraciones +
                '}';
    }
}
