package com.example.Backend.utils;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;

import com.example.Backend.dto.ReservaDTO;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class MailUtil {
    @Value("${frontend.url}")
    private String frontendUrl;

    private final ClassLoader classLoader = getClass().getClassLoader();

    public MailUtil() {
    }

    /**
     * Método que genera el correo de validación de cuenta
     * 
     * @param url  URL de validación de cuenta
     * @param user Usuario al que se le envía el correo
     * @return Cuerpo del correo de validación de cuenta
     */
    public String correoValidacion(String url, String user) throws IOException {
        String template = new String(classLoader.getResourceAsStream("templates/validacion.html").readAllBytes(),
                StandardCharsets.UTF_8);

        Document doc = Jsoup.parse(template, "UTF-8");

        Elements homeLinks = doc.getElementsByClass("home-link");
        homeLinks.attr("href", frontendUrl);

        Element mainTitle = doc.getElementById("main-title");
        if (mainTitle == null) {
            throw new IOException("No se ha encontrado el elemento con id main-title");
        }
        mainTitle.after("<h2 style='font-size: 30px'>¡Hola " + user + "!</h2>");

        Element validateLink = doc.getElementById("validate-link");
        if (validateLink == null) {
            throw new IOException("No se ha encontrado el elemento con id validate-link");
        }
        validateLink.attr("href", url);

        return doc.toString();
    }

    /**
     * Método que genera el correo de bienvenida
     * 
     * @param user Usuario al que se le envía el correo
     * @return Cuerpo del correo de bienvenida
     */
    public String correoBienvenida(String user) throws IOException {
        String template = new String(classLoader.getResourceAsStream("templates/bienvenida.html").readAllBytes(),
                StandardCharsets.UTF_8);
        Document doc = Jsoup.parse(template, "UTF-8");

        Element mainTitle = doc.getElementById("main-title");
        if (mainTitle == null) {
            throw new IOException("No se ha encontrado el elemento con id main-title");
        }
        mainTitle.after("<h2 style='font-size: 30px'>¡Hola " + user + "!</h2>");

        return doc.toString();
    }

    /**
     * Metodo que genera el correo de registro de registro de reserva
     * 
     * @param reserva Reserva que se ha registrado
     * @return Cuerpo del correo de registro de reserva
     */
    public String correoReserva(ReservaDTO reserva) throws Exception {
        String template = new String(classLoader.getResourceAsStream("templates/reserva.html").readAllBytes(),
                StandardCharsets.UTF_8);
        Document doc = Jsoup.parse(template, "UTF-8");

        Element restaurante = doc.getElementById("restaurante");
        restaurante.after("<p>" + reserva.getNombreRestaurante() + "</p>");

        Element plan = doc.getElementById("plan");
        plan.after("<p>" + reserva.getNombrePlan() + "</p>");

        Element precio = doc.getElementById("precio");
        precio.after("<p>" + reserva.getPrecio() + "</p>");

        Element fechaInicio = doc.getElementById("fecha-inicio");
        fechaInicio.after("<p>" + reserva.getFechaInicio() + "</p>");

        Element fechaFinalizacion = doc.getElementById("fecha-finalizacion");
        fechaFinalizacion.after("<p>" + reserva.getFechaFinalizacion() + "</p>");

        Element horaEntrega = doc.getElementById("hora-entrega");
        horaEntrega.after("<p>" + reserva.getHoraEntrega() + "</p>");

        Element direccionEntrega = doc.getElementById("direccion-entrega");
        direccionEntrega.after("<p>" + reserva.getDireccionEntrega() + "</p>");

        Element ciudad = doc.getElementById("ciudad");
        ciudad.after("<p>" + reserva.getNombreCiudad() + "</p>");

        return doc.toString();
    }
}
