package com.example.Backend.exceptions;

/**
 * ResourceNotFoundException clase utilizada para levantar errores cuando no se encuentra un item en la base de datos
 */
public class ResourceNotFoundException extends Exception {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
