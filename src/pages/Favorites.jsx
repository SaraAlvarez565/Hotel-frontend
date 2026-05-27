import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return navigate("/login");
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get(`/favorites/user/${user.id}`);
      setFavorites(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (productId) => {
    await api.post("/favorites", {
      user: { id: user.id },
      product: { id: productId }
    });
    load();
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Tus favoritos</h1>
        <p style={styles.subtitle}>
          Lugares guardados para tus próximas estancias
        </p>
      </div>

      {favorites.length === 0 && (
        <div style={styles.empty}>
          <h2>No tienes favoritos aún</h2>
          <p>Guarda alojamientos que te gusten para verlos aquí.</p>
        </div>
      )}

      <div style={styles.grid}>
        {favorites.map((f) => (
          <div key={f.id} style={styles.card}>
            <div style={styles.imgBox}>
              <img
                src={f.product.imageUrl || "https://picsum.photos/500"}
                alt={f.product.name}
                style={styles.img}
              />
              <button
                style={styles.heart}
                onClick={() => remove(f.product.id)}
              >
                ♥
              </button>
            </div>

            <div style={styles.content}>
              <h3 style={styles.name}>{f.product.name}</h3>
              <p style={styles.desc}>
                {f.product.description || "Sin descripción"}
              </p>
              <button
                style={styles.btn}
                onClick={() => navigate(`/product/${f.product.id}`)}
              >
                Ver detalle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff0f5", // rosa claro de marca
    padding: "40px 20px",
    fontFamily: "Arial",
    color: "#2b2b2b"
  },

  header: {
    textAlign: "center",
    marginBottom: 30
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ff6f91" // color principal de marca
  },

  subtitle: {
    color: "#6b6b6b"
  },

  empty: {
    textAlign: "center",
    padding: 40,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 22
  },

  card: {
    background: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease"
  },

  imgBox: {
    position: "relative"
  },

  img: {
    width: "100%",
    height: 180,
    objectFit: "cover"
  },

  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "rgba(255,255,255,0.9)",
    border: "none",
    borderRadius: "50%",
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 16,
    color: "#ff6f91" // corazón rosado
  },

  content: {
    padding: 15
  },

  name: {
    fontSize: 18,
    marginBottom: 6,
    color: "#2b2b2b"
  },

  desc: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12
  },

  btn: {
    width: "100%",
    padding: "10px",
    borderRadius: 10,
    border: "1px solid #ff6f91",
    background: "#fff0f5", // rosa claro
    color: "#ff6f91",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s",
  }
};