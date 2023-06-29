package com.example.Tests.controllers;
//package com.example.Backend.controllers;
import com.example.Backend.controllers.PlanController;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Plan;
import com.example.Backend.service.PlanService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class PlanControllerTest {

    @Mock
    private PlanService planService;

    private PlanController planController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        planController = new PlanController(planService);
    }

//    @Test
//    public void guardarPlan_ValidPlanFormData_ReturnsCreatedResponse() throws Exception {
//        // Arrange
//        PlanFormData planFormData = new PlanFormData();
//        planFormData.setNombre("Plan 1");
//        planFormData.setDescripcionPlan("Descripción del plan");
//        MultipartFile imageFile = new MockMultipartFile("image.jpg", new byte[0]);
//        planFormData.setImagenPlan(imageFile);
//
//        Plan plan = new Plan();
//        plan.setNombre(planFormData.getNombre());
//        plan.setDescripcion(planFormData.getDescripcionPlan());
//        plan.setImagen("https://example.com/image.jpg");
//
//        when(planService.registrarPlan(any(Plan.class))).thenReturn(plan);
//
//        // Act
//        ResponseEntity<Plan> response = planController.guardarPlan(planFormData);
//
//        // Assert
//        assertEquals(HttpStatus.CREATED, response.getStatusCode());
//        assertEquals(plan, response.getBody());
//        verify(planService).registrarPlan(any(Plan.class));
//    }

    @Test
    public void eliminarPlan_ExistingPlanId_ReturnsOkResponse() {
        // Arrange
        Long planId = 1L;

        // Act
        ResponseEntity<String> response = planController.eliminarPlan(planId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Plan eliminado", response.getBody());
        verify(planService).eliminarPlan(planId);
    }

    @Test
    public void listarPlanes_ExistingPlans_ReturnsListOfPlans() {
        // Arrange
        List<Plan> planes = new ArrayList<>();
        planes.add(new Plan("Plan 1", "Descripción del plan 1", "https://example.com/plan1.jpg"));
        planes.add(new Plan("Plan 2", "Descripción del plan 2", "https://example.com/plan2.jpg"));

        when(planService.buscarTodosPlanes()).thenReturn(planes);

        // Act
        ResponseEntity<List<Plan>> response = planController.listarPlanes();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(planes, response.getBody());
        verify(planService).buscarTodosPlanes();
    }

    @Test
    public void listarPlanPorId_ExistingPlanId_ReturnsPlan() throws ResourceNotFoundException {
        // Arrange
        Long planId = 1L;
        Plan plan = new Plan("Plan 1", "Descripción del plan", "https://example.com/plan1.jpg");

        when(planService.buscarPlan(planId)).thenReturn(plan);

        // Act
        ResponseEntity<Plan> response = planController.listarPlanPorId(planId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(plan, response.getBody());
        verify(planService).buscarPlan(planId);
    }

//    @Test
//    public void actualizarPlan_ExistingPlanIdAndValidPlanFormData_ReturnsOkResponse() throws Exception {
//        // Arrange
//        Long planId = 1L;
//
//        PlanFormData planFormData = new PlanFormData();
//        planFormData.setNombre("Plan 1 Actualizado");
//        planFormData.setDescripcionPlan("Descripción del plan actualizado");
//        MultipartFile imageFile = new MockMultipartFile("image.jpg", new byte[0]);
//        planFormData.setImagenPlan(imageFile);
//
//        Plan existingPlan = new Plan("Plan 1", "Descripción del plan", "https://example.com/plan1.jpg");
//        Plan updatedPlan = new Plan(planFormData.getNombre(), planFormData.getDescripcionPlan(), "https://example.com/image.jpg");
//
//        when(planService.buscarPlan(planId)).thenReturn(existingPlan);
//        when(planService.actualizarPlan(any(Plan.class))).thenReturn(updatedPlan);
//
//        // Act
//        ResponseEntity<Plan> response = planController.actualizarPlan(planId, planFormData);
//
//        // Assert
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(updatedPlan, response.getBody());
//        verify(planService).buscarPlan(planId);
//        verify(planService).actualizarPlan(any(Plan.class));
//    }
}
