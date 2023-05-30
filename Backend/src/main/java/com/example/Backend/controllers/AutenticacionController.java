package com.example.Backend.controllers;

import com.example.Backend.exceptions.BadRequestException;
import com.example.Backend.models.AuthenticationRequest;
import com.example.Backend.models.AuthenticationResponse;
import com.example.Backend.models.Restaurante;
import com.example.Backend.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "*")
public class AutenticacionController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    private Logger logger = Logger.getLogger(Restaurante.class.getName());
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (AuthenticationException e) {
            logger.warning("Credenciales de inicio de sesión incorrectas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales de inicio de sesión incorrectas");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        logger.info("Iniciando sesión");

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }


}
