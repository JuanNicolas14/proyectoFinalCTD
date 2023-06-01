package com.example.Tests;

import com.example.Backend.BackendApplication;
import com.example.Tests.configs.TestConfig;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest(classes = {BackendApplication.class, TestConfig.class})
@TestPropertySource("classpath:application-test.properties")
@ActiveProfiles("test")
public class BackendApplicationTests {
}
