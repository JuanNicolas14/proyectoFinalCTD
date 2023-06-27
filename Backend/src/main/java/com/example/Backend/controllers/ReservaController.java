package com.example.Backend.controllers;

import com.example.Backend.dto.ReservaDTO;
import com.example.Backend.exceptions.MailSenderException;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.models.Ciudad;
import com.example.Backend.models.Reserva;
import com.example.Backend.models.ReservaForm;
import com.example.Backend.models.Restaurante;
import com.example.Backend.models.Usuario;
import com.example.Backend.service.CiudadService;
import com.example.Backend.service.MailService;
import com.example.Backend.service.ReservaService;
import com.example.Backend.service.RestauranteService;
import com.example.Backend.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/reserva")
@CrossOrigin(origins = "*")
public class ReservaController {
    @Value("${frontend.url}")
    private String frontendUrl;

    private final ReservaService reservaService;

    private final CiudadService ciudadService;

    private final UsuarioService usuarioService;

    private final RestauranteService restauranteService;

    private final MailService mailService;

    private final Logger logger = Logger.getLogger(ReservaController.class.getName());

    @Autowired
    public ReservaController(ReservaService reservaService, MailService mailService, CiudadService ciudadService, UsuarioService usuarioService, RestauranteService restauranteService) {
        this.reservaService = reservaService;
        this.mailService = mailService;
        this.ciudadService = ciudadService;
        this.usuarioService = usuarioService;
        this.restauranteService = restauranteService;
    }

    /**
     *Endpoint para registrar una reserva
     * @param reservaForm Formulario con los datos de la reserva
     * @return ResponseEntity con informacion de la reserva registrada
     */
    @PostMapping("/registrar")
    public ResponseEntity<ReservaDTO> registrarReserva(@ModelAttribute ReservaForm reservaForm) throws Exception {
        this.logger.info("Registrando reserva" + reservaForm.toString());

        Optional<Ciudad> ciudad = ciudadService.buscarCiudad(reservaForm.getCiudadId());
        if (ciudad.isEmpty()) {
            this.logger.warning("No existe la ciudad con id " + reservaForm.getCiudadId());
            throw new ResourceNotFoundException("No existe la ciudad con id " + reservaForm.getCiudadId());
        }

        Optional<Usuario> usuario = usuarioService.findById(reservaForm.getUsuarioId());
        if (usuario.isEmpty()) {
            this.logger.warning("No existe el usuario con id " + reservaForm.getUsuarioId());
            throw new ResourceNotFoundException("No existe el usuario con id " + reservaForm.getUsuarioId());
        }

        Optional<Restaurante> restaurante = restauranteService.findById(reservaForm.getRestauranteId());
        if (restaurante.isEmpty()) {
            this.logger.warning("No existe el restaurante con id " + reservaForm.getRestauranteId());
            throw new ResourceNotFoundException("No existe el restaurante con id " + reservaForm.getRestauranteId());
        }

        ReservaDTO reservaGuardada = reservaService.guardarReserva(new Reserva(
            reservaForm.getHoraEntrega(),
            reservaForm.getFechaInicio(),
            reservaForm.getFechaFinalizacion(),
            usuario.get(),
            restaurante.get(),
            reservaForm.getDireccionEntrega(),
            ciudad.get(),
            reservaForm.getTelefonoUsuario()

        ));

        // TODO: Enviar correo de registro de reserva
        mailService.enviarCorreoReserva(usuario.get().getEmail(), reservaGuardada);

        return ResponseEntity.status(HttpStatus.CREATED).body(reservaGuardada);
    }

    /**
     * Endpoint para listar las reservas de un usuario
     * @param usuarioId Id del usuario
     * @return ResponseEntity con la lista de reservas del usuario
     */
    @GetMapping("/buscar/{usuarioId}")
    public ResponseEntity<List<ReservaDTO>> buscarReservasUsuario(@PathVariable Long usuarioId) throws Exception {
        this.logger.info("Buscando reservas del usuario con id " + usuarioId);

        Optional<Usuario> usuario = usuarioService.findById(usuarioId);
        if (usuario.isEmpty()) {
            this.logger.warning("No existe el usuario con id " + usuarioId);
            throw new ResourceNotFoundException("No existe el usuario con id " + usuarioId);
        }

        List<ReservaDTO> reservas = reservaService.findByUserId(usuarioId);
        this.logger.info("Reservas encontradas: " + reservas.size());

        return ResponseEntity.ok(reservas);
    }


    /**
     * Maneja la excepción SQLException y retorna un ResponseEntity con el mensaje de error
     * @param exc instancia de SQLException
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<String> handleSQLException(SQLException exc) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exc.getMessage());
    }

    /**
     * Maneja la excepción ResourceNotFoundException y retorna un ResponseEntity con el mensaje de error
     * @param exc instancia de ResourceNotFoundException
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException exc) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exc.getMessage());
    }

    /**
     * Maneja la excepción MailSenderException y retorna un ResponseEntity con el mensaje de error
     * @param exc Mensaje de la excepción
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(MailSenderException.class)
    public ResponseEntity<String> handleMailSenderException(String exc) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(exc);
    }

    /**
     * Maneja la excepción IOException y retorna un ResponseEntity con el mensaje de error
     * @param exc Mensaje de la excepción
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleIOException(String exc) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exc);
    }

    /**
     * Maneja excepciones no controladas y retorna un ResponseEntity con el mensaje de error
     * @param exc Mensaje de la excepción
     * @return ResponseEntity con el mensaje de error
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception exc) {
        exc.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ha ocurrido un error inesperado!");
    }
}
