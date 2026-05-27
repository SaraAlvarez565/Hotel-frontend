import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {

    if (!name || !lastname || !email || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {

      await register({
        name,
        lastname,
        email,
        password
      });

      alert("Usuario creado correctamente");

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Error al registrar"
      );

    }
  };

  return (
    <div style={styles.page}>


      <div style={styles.container}>

        {/* IZQUIERDA */}
        <div style={styles.left}>

          <h1 style={styles.title}>
            🌸 StayBloom
          </h1>

          <p style={styles.subtitle}>
            Crea tu cuenta y comienza a descubrir alojamientos increíbles alrededor del mundo.
          </p>

          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
            alt="hotel"
            style={styles.image}
          />

        </div>

        {/* DERECHA */}
        <div style={styles.right}>

          <h2 style={styles.formTitle}>
            Crear cuenta
          </h2>

          <input
            style={styles.input}
            placeholder="Nombre"
            onChange={e => setName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Apellido"
            onChange={e => setLastname(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Correo electrónico"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Contraseña"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />

          <button
            style={styles.button}
            onClick={submit}
          >
            Registrarse
          </button>

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#fff5f8",
    paddingTop: "90px",
    paddingInline: "20px"
  },

  container: {
    maxWidth: "1100px",
    marginInline: "auto",
    background: "white",
    borderRadius: "25px",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns:
      window.innerWidth < 768
        ? "1fr"
        : "1fr 1fr",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  left: {
    background: "#ffe4ec",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  title: {
    fontSize: "40px",
    color: "#ff6f91",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#555",
    marginBottom: "30px",
    lineHeight: "1.6"
  },

  image: {
    width: "100%",
    borderRadius: "20px",
    objectFit: "cover",
    maxHeight: "350px"
  },

  right: {
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "15px"
  },

  formTitle: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "#2b2b2b"
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none"
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#ff6f91",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer"
  }
};