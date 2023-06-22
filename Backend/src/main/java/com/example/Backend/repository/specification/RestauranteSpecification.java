package com.example.Backend.repository.specification;

import com.example.Backend.models.Ciudad;
import com.example.Backend.models.Domicilio;
import com.example.Backend.models.Plan;
import com.example.Backend.models.Restaurante;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class RestauranteSpecification implements Specification<Restaurante> {
    private String plan;
    private String ciudad;
    private String hora;

    public RestauranteSpecification(String plan, String ciudad, String hora) {
        this.plan = plan;
        this.ciudad = ciudad;
        this.hora = hora;
    }

    @Override
    public Predicate toPredicate(Root<Restaurante> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (plan != null) {
            Join<Restaurante, Plan> planJoin = root.join("plan");
            Predicate planPredicate = criteriaBuilder.equal(planJoin.get("nombre"), plan);
            predicates.add(planPredicate);
        }

        if (ciudad != null) {
            Join<Restaurante, Domicilio> domicilioJoin = root.join("domicilio");
            Join<Domicilio, Ciudad> ciudadJoin = domicilioJoin.join("ciudad");

            Predicate ciudadPredicate = criteriaBuilder.equal(ciudadJoin.get("nombreCiudad"), ciudad);
            predicates.add(ciudadPredicate);
        }

        if (hora != null) {
            predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("horaApertura"),hora )));
            //predicates.add(criteriaBuilder.and(
            //        criteriaBuilder.lessThanOrEqualTo(root.get("horaApertura"), hora),
            //        criteriaBuilder.greaterThanOrEqualTo(root.get("horaCierre"), hora)
            //));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
