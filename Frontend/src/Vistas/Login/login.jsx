import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const { token } = data;
      console.log(data);
      setToken(token);
    } else {
      console.log("Error al iniciar sesión");
    }
  };
  
  return (
    <main>
      <section className="form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="icono">
              <ion-icon
                id="togglePassword"
                name="eye-outline"
                onclick="togglePasswordVisibility()"
              ></ion-icon>
            </span>
          </div>
          <button type="submit">Ingresar</button>
          <p>
            ¿Aún no tienes cuenta?{" "}
            <span>
              <Link to="/usuario/registrar">Regístrate</Link>
            </span>
          </p>
        </form>
        {token && <p>Token: {token}</p>}
      </section>
    </main>
  );
};

export default Login;
