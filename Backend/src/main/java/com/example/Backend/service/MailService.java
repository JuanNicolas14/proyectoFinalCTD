package com.example.Backend.service;

import java.util.logging.Logger;

import com.example.Backend.dto.ReservaDTO;
import com.example.Backend.dto.UsuarioDTO;
import com.example.Backend.enums.MailEnum;
import com.example.Backend.utils.MailUtil;
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

    @Value("${frontend.url}")
    private String frontendUrl;

    private final MailUtil mailUtil = new MailUtil();

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

    /**
     * Envía un correo de validación de cuenta
     * @param usuarioDTO Usuario al que se le enviará el correo
     * @throws Exception Excepción en caso de que no se pueda enviar el correo
     */
    @Async
    public void enviarCorreoValidacion(UsuarioDTO usuarioDTO) throws Exception {
        String url = frontendUrl + "usuario/validar/" + usuarioDTO.getId();
        String body = mailUtil.correoValidacion(url, usuarioDTO.getNombre() + " " + usuarioDTO.getApellido());
        sendMail(usuarioDTO.getEmail(), MailEnum.VALIDACION_CUENTA.toString(), body);
    }

    /**
     * Envía correo de bienvenida al usuario
     * @param usuarioDTO Usuario al que se le enviará el correo
     * @throws Exception Excepción en caso de que no se pueda enviar el correo
     */
    @Async
    public void enviarCorreoBienvenida(UsuarioDTO usuarioDTO) throws Exception {
        String body = mailUtil.correoBienvenida(usuarioDTO.getNombre() + " " + usuarioDTO.getApellido());
        sendMail(usuarioDTO.getEmail(), MailEnum.BIENVENIDA.toString(), body);
    }

    /**
     * Envia correo de registro de reserva
     * 
     * @param reserva Informacion de la reserva
     * @param email Email del usuario al que se le enviará el correo
     * @throws Exception Excepción en caso de que no se pueda enviar el correo
     */
    @Async
    public void enviarCorreoReserva(String email, ReservaDTO reserva) throws Exception {
        String body = mailUtil.correoReserva(reserva);
        sendMail(email, MailEnum.RESERVA.toString(), body);
    }
}
