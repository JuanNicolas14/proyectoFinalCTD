package com.example.Tests.controllers;
//package com.example.Backend.controllers;
import com.example.Backend.controllers.AutenticacionController;
import com.example.Backend.models.AuthenticationRequest;
import com.example.Backend.models.AuthenticationResponse;
import com.example.Backend.security.jwt.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AutenticacionControllerTest {
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private UserDetailsService userDetailsService;
    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AutenticacionController autenticacionController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void createAuthenticationToken_ValidCredentials_ReturnsToken() {
        String email = "test@example.com";
        String password = "password";
        String jwt = "jwtToken";

        AuthenticationRequest authenticationRequest = new AuthenticationRequest(email, password);
        UserDetails userDetails = mock(UserDetails.class);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null);
        when(userDetailsService.loadUserByUsername(email)).thenReturn(userDetails);
        when(jwtUtil.generateToken(userDetails)).thenReturn(jwt);

        ResponseEntity<?> responseEntity = autenticacionController.createAuthenticationToken(authenticationRequest);

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertTrue(responseEntity.getBody() instanceof AuthenticationResponse);

        AuthenticationResponse response = (AuthenticationResponse) responseEntity.getBody();
        assertEquals(jwt, response.getJwt());

        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userDetailsService, times(1)).loadUserByUsername(email);
        verify(jwtUtil, times(1)).generateToken(userDetails);
    }

//    @Test
//    public void createAuthenticationToken_InvalidCredentials_ReturnsUnauthorized() {
//        String email = "test@example.com";
//        String password = "password";
//
//        AuthenticationRequest authenticationRequest = new AuthenticationRequest(email, password);
//
//        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
//                .thenThrow(AuthenticationException.class);
//
//        ResponseEntity<?> responseEntity = autenticacionController.createAuthenticationToken(authenticationRequest);
//
//        assertNotNull(responseEntity);
//        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
//        assertNotNull(responseEntity.getBody());
//        assertEquals("Credenciales de inicio de sesión incorrectas", responseEntity.getBody());
//
//        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
//        verify(userDetailsService, never()).loadUserByUsername(anyString());
//        verify(jwtUtil, never()).generateToken(any(UserDetails.class));
//    }
}

