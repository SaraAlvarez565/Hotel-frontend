import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Favorites() {

  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    load();
  }, []);

  const load = async () => {

    const res = await api.get(`/favorites/user/${user.id}`);

    setFavorites(res.data);
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

      {/* HERO */}

      <div style={styles.hero}>

        <h1 style={styles.heroTitle}>
          ❤️ Tus lugares favoritos
        </h1>

        <p style={styles.heroText}>
          Guarda los alojamientos que más te gusten y vuelve a ellos fácilmente.
        </p>

      </div>

      {/* EMPTY */}

      {favorites.length === 0 && (

        <div style={styles.emptyBox}>

          <h2>No tienes favoritos aún ✨</h2>

          <p>
            Explora alojamientos y guarda tus favoritos.
          </p>

        </div>

      )}

      {/* GRID */}

      <div style={styles.grid}>

        {favorites.map(f => (

          <div
            key={f.id}
            style={styles.card}
          >

            <div style={styles.imageContainer}>

              <img
                src={f.product.imageUrl || "https://picsum.photos/500"}
                alt={f.product.name}
                style={styles.image}
              />

              <button
                style={styles.favoriteBadge}
                onClick={() => remove(f.product.id)}
              >
                ❤️
              </button>

            </div>

            <div style={styles.content}>

              <h2 style={styles.name}>
                {f.product.name}
              </h2>

              <p style={styles.description}>
                {f.product.description}
              </p>

              <button
                style={styles.viewButton}
                onClick={() => navigate(`/product/${f.product.id}`)}
              >
                Ver alojamiento
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
    marginTop: "90px",
    padding: "30px",
    maxWidth: "1400px",
    marginInline: "auto"
  },

  hero: {
    background: "linear-gradient(135deg,#fff0f5,#ffe4ec)",
    padding: "50px",
    borderRadius: "35px",
    marginBottom: "50px"
  },

  heroTitle: {
    fontSize: "45px",
    color: "#2b2b2b",
    marginBottom: "10px"
  },

  heroText: {
    color: "#666",
    fontSize: "17px"
  },

  emptyBox: {
    background: "white",
    padding: "60px",
    borderRadius: "30px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.06)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "30px"
  },

  card: {
    background: "white",
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    transition: "0.3s"
  },

  imageContainer: {
    position: "relative"
  },

  image: {
    width: "100%",
    height: "260px",
    objectFit: "cover"
  },

  favoriteBadge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: "none",
    background: "white",
    cursor: "pointer",
    fontSize: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)"
  },

  content: {
    padding: "25px"
  },

  name: {
    marginBottom: "10px",
    color: "#2b2b2b"
  },

  description: {
    color: "#777",
    lineHeight: "1.6",
    marginBottom: "25px"
  },

  viewButton: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "15px",
    background: "linear-gradient(135deg,#ff6f91,#ff8fab)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: "0 8px 20px rgba(255,111,145,0.25)"
  }

};