package com.example.Backend.repository;

import com.example.Backend.models.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestauranteRepository extends JpaRepository<Restaurante, Long>, JpaSpecificationExecutor<Restaurante> {

    @Query(value = "SELECT r.* FROM restaurante r JOIN plan p ON p.id = r.plan_id WHERE p.nombre = :plan", nativeQuery = true)
    List<Restaurante> findByPlan(@Param("plan") String plan);

    // Método personalizado para buscar productos por categoría y ciudad
    @Query( value = "SELECT r.* " +
            "FROM restaurante r " +
            "JOIN domicilio d ON d.id = r.domicilio_id " +
            "JOIN plan p on p.id = r.plan_id " +
            "JOIN ciudad c on d.ciudad_id = c.id " +
            "where c.nombre_ciudad = :ciudad " +
            " and p.nombre = :plan", nativeQuery = true)
    List<Restaurante> findByCiudadAndPlan(String ciudad, String plan);
}
