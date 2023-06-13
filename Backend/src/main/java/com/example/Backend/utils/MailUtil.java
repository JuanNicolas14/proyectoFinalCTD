package com.example.Backend.utils;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.IOException;

public class MailUtil {
    @Value("${frontend.url}")
    private String frontendUrl;

    public MailUtil() {
    }

    /**
     * Método que genera el correo de validación de cuenta
     * @param url URL de validación de cuenta
     * @param user Usuario al que se le envía el correo
     * @return Cuerpo del correo de validación de cuenta
     */
    public String correoValidacion(String url, String user) throws IOException {
        File template = new File("src/main/resources/templates/validacion.html");
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
     * @param user Usuario al que se le envía el correo
     * @return Cuerpo del correo de bienvenida
     */
    public String correoBienvenida(String user) throws IOException {
        File template = new File("src/main/resources/templates/bienvenida.html");
        Document doc = Jsoup.parse(template, "UTF-8");

        Element mainTitle = doc.getElementById("main-title");
        if (mainTitle == null) {
            throw new IOException("No se ha encontrado el elemento con id main-title");
        }
        mainTitle.after("<h2 style='font-size: 30px'>¡Hola " + user + "!</h2>");

        return doc.toString();
    }
}
