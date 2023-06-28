package com.example.Backend.security;

import com.example.Backend.security.jwt.JwtRequestFilter;
import com.example.Backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UsuarioService authenticationService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authenticationService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers(
                        "/ciudades",
                    "/ciudades/**",
                    "/favoritos/**",
                    "/login",
                    "/mail/**",
                    "/permiso",
                    "/plan/**",
                    "/puntuacion/**",
                    "/restaurante/**",
                    "/rol/**",
                    "/usuario",
                    "/usuario/{id}",
                    "/usuario/detalle",
                    "/usuario/registrar",
                    "/usuario/validar/{id}",
                    "/usuario/actualizar/{id}",
                    "/paises/**",
                    "/reserva/**"
                ).permitAll()
                // TODO: Como MVP se deja que el usuario pueda eliminar perfiles, pero en un futuro solo el admin podrá hacerlo o un cron job
                .antMatchers(HttpMethod.DELETE, "/usuario/{id}").hasAnyAuthority("USER", "ADMIN")
                .antMatchers("/reserva/**").hasAnyAuthority("USER", "ADMIN")
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors();
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
