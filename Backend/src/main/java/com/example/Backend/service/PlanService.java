package com.example.Backend.service;

import com.example.Backend.models.Plan;
import com.example.Backend.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {

    private PlanRepository planRepository;

    @Autowired
    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public Plan buscarPlan(Long id) {
        return planRepository.findById(id).orElse(null);
    }

    public Plan registrarPlan(Plan plan) {
        return planRepository.save(plan);
    }
    public void eliminarPlan(Long id) {
        planRepository.deleteById(id);
    }

    public List<Plan> buscarTodosPlanes() {
        return planRepository.findAll();
    }

    public Plan actualizarPlan(Plan plan){
        return planRepository.save(plan);
    }
}
