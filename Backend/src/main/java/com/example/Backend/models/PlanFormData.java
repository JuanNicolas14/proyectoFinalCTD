package com.example.Backend.models;

import org.springframework.web.multipart.MultipartFile;

public class PlanFormData {
    private String nombre;
    private String descripcionPlan;
    private MultipartFile imagenPlan;

    public PlanFormData(String nombre, String descripcionPlan, MultipartFile imagenPlan) {
        this.nombre = nombre;
        this.descripcionPlan = descripcionPlan;
        this.imagenPlan = imagenPlan;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcionPlan() {
        return descripcionPlan;
    }

    public void setDescripcionPlan(String descripcionPlan) {
        this.descripcionPlan = descripcionPlan;
    }

    public MultipartFile getImagenPlan() {
        return imagenPlan;
    }

    public void setImagenPlan(MultipartFile imagenPlan) {
        this.imagenPlan = imagenPlan;
    }

    @Override
    public String toString() {
        return "PlanFormData{" +
                "nombre='" + nombre + '\'' +
                ", descripcionPlan='" + descripcionPlan + '\'' +
                ", imagenPlan=" + imagenPlan +
                '}';
    }
}
