package com.example.Backend.enums;

/**
 * Enum relacionado con el envío de correos electrónicos
 */
public enum MailEnum {
    VALIDACION_CUENTA("Validación de cuenta"),
    BIENVENIDA("Bienvenido a la aplicación"),
    RESERVA("Reserva realizada");

    private final String asunto;

    MailEnum(String asunto) {
        this.asunto = asunto;
    }

    @Override
    public String toString() {
        return this.asunto;
    }
}
