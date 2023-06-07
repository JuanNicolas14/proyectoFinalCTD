package com.example.Backend.service;

import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

import com.example.Backend.exceptions.MailSenderException;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Component
@EnableAsync
public class MailService {

    @Autowired
    private JavaMailSender emailSender;

    private final static Logger logger = Logger.getLogger(MailService.class.getName());

    @Value("${spring.mail.username}")
    private String username;

    /**
     * Envía un correo electrónico
     * @param to Correo electrónico del destinatario
     * @param subject Asunto del correo
     * @param body Cuerpo del correo en html
     * @throws MailSenderException Excepción en caso de que no se pueda enviar el correo
     */
    @Async
    public void sendMail(String to, String subject, String body) throws MailSenderException {
        logger.info("Begin sendMail");
        try {
            MimeMessage message = emailSender.createMimeMessage();
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setFrom(new InternetAddress(username));
            message.setSubject(subject);
            message.setContent(body, "text/html");
            emailSender.send(message);
        } catch (Exception e) {
            logger.warning(e.getMessage());
            throw new MailSenderException(e.getMessage());
        } finally {
            logger.info("End sendMail");
        }
    }
}
