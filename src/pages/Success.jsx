import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Success() {

  const navigate = useNavigate();

  return (
    <div>

      <Header />

      <div style={styles.container}>

        <div style={styles.card}>

          <h1 style={styles.title}>
            ✅ Reserva realizada
          </h1>

          <p style={styles.text}>
            Tu reserva fue registrada correctamente.
          </p>

          <button
            style={styles.button}
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff5f8",
    padding: "20px"
  },

  card: {
    background: "white",
    padding: "50px",
    borderRadius: "25px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
  },

  title: {
    marginBottom: "15px"
  },

  text: {
    color: "#666",
    marginBottom: "20px"
  },

  button: {
    background: "#ff6f91",
    color: "white",
    border: "none",
    padding: "14px 20px",
    borderRadius: "12px",
    cursor: "pointer"
  }
};