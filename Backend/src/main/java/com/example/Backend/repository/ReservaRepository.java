package com.example.Backend.repository;


import com.example.Backend.models.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva,Long> {

    @Query(value = "SELECT * FROM reserva WHERE usuario_id = ?1", nativeQuery = true)
    List<Reserva> findByUsuarioId(Long id);
}
