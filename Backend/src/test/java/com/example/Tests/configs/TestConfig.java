package com.example.Tests.configs;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

@Profile("test")
@Configuration
public class TestConfig {

    //@Bean
    //@Primary
    //public CargadoraDeDatos cargadoraDeDatos() {
    //    return Mockito.mock(CargadoraDeDatos.class);
    //}

}
