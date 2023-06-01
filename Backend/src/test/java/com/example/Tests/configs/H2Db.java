package com.example.Tests.configs;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;

public class H2Db {
    private static String datasourceUrl;

    private static String dbUsername;

    private static String dbPassword;

    private static String dbDriverClassName;

    public static Connection getConnection() throws Exception {
        Properties props = new Properties();
        FileInputStream input = new FileInputStream("src/test/resources/application-test.properties");
        props.load(input);

        datasourceUrl = props.getProperty("spring.datasource.url");
        dbUsername = props.getProperty("spring.datasource.username");
        dbPassword = props.getProperty("spring.datasource.password");
        dbDriverClassName = props.getProperty("spring.datasource.driver-class-name");

        DriverManager.getConnection(datasourceUrl, dbUsername, dbPassword);
        return DriverManager.getConnection(datasourceUrl, dbUsername, dbPassword);
    }

    public static Long crearPais() throws Exception {
        Connection connection = getConnection();
        String sql = "INSERT INTO pais (nombre) VALUES ('Colombia')";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.executeUpdate();
        sql = "SELECT id FROM pais WHERE nombre = 'Colombia'";
        preparedStatement = connection.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();
        resultSet.next();
        return resultSet.getLong("id");
    }

    public static Long crearDomicilio(Long paisId) throws Exception {
        Connection connection = getConnection();
        String sql = "INSERT INTO domicilio (calle, ciudad, localidad, numero, pais_id) VALUES ('Calle 1', 'Bogota', 'Bogota', '123', ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setLong(1, paisId);
        preparedStatement.executeUpdate();
        sql = "SELECT id FROM domicilio WHERE calle = 'Calle 1'";
        preparedStatement = connection.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();
        resultSet.next();
        return resultSet.getLong("id");
    }

    public static Long crearPlan() throws Exception {
        Connection connection = getConnection();
        String sql = "INSERT INTO plan (descripcion, nombre) VALUES ('Plan 1', 'Plan 1')";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.executeUpdate();
        sql = "SELECT id FROM plan WHERE nombre = 'Plan 1'";
        preparedStatement = connection.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();
        resultSet.next();
        return resultSet.getLong("id");
    }

    public static Long crearImagen(Long restauranteId) throws Exception {
        Connection connection = getConnection();
        String sql = "INSERT INTO imagen (url, restaurante_id) VALUES ('https://www.google.com', ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setLong(1, restauranteId);
        preparedStatement.executeUpdate();
        sql = "SELECT id FROM imagen WHERE url = 'https://www.google.com'";
        preparedStatement = connection.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();
        resultSet.next();
        return resultSet.getLong("id");
    }
}
