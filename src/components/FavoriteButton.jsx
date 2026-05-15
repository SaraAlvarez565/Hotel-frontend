import { useState } from "react";
import api from "../services/api";

export default function FavoriteButton({ productId }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const [saved, setSaved] = useState(false);

  const toggleFavorite = async () => {

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    try {

      await api.post("/favorites", {
        user: { id: user.id },
        product: { id: productId }
      });

      setSaved(!saved);

    } catch (error) {
      alert("Error al actualizar favorito");
    }
  };

    return (

  <button
    onClick={toggleFavorite}
    style={{
      ...styles.button,
      background: saved
        ? "linear-gradient(135deg,#ff4d6d,#ff758f)"
        : "white",
      color: saved ? "white" : "#ff4d6d",
      border: saved
        ? "none"
        : "1px solid #ffd6de"
    }}
  >

    {saved ? "❤️ Guardado" : "🤍 Favorito"}

  </button>

);
}

const styles = {

  button: {
    padding: "10px 16px",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "0.3s",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  }

};

