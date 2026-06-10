import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {

    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {

      const res = await login({
        email,
        password
      });
      const user = {
        ...res.data,
        role: res.data.role.replace("ROLE_", "")
      };

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert("Login correcto");

      window.location.href = "/";

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Error al iniciar sesión"
      );

    }
  };

  return (
    <div>

      <div style={styles.page}>

        <div style={styles.card}>

          <h1 style={styles.title}>
            Bienvenido 🌸
          </h1>

          <p style={styles.subtitle}>
            Inicia sesión para continuar
          </p>

          {message && (
            <p style={styles.message}>
              {message}
            </p>
          )}

          <input
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            style={styles.button}
            onClick={submit}
          >
            Ingresar
          </button>

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff5f8",
    padding: "20px"
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "25px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  title: {
    textAlign: "center",
    fontSize: "35px"
  },

  subtitle: {
    textAlign: "center",
    color: "#777"
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd"
  },

  button: {
    background: "#ff6f91",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  message: {
    color: "#ff4d6d",
    textAlign: "center"
  }

};