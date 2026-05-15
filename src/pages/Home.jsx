import { useEffect, useState } from "react";
import api from "../services/api";

import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category?.id == selectedCategory)
    : products;

  return (
    <div>


      <div style={styles.container}>

        {/* HERO */}
        <div style={styles.hero}>

          <h1 style={styles.heroTitle}>
            Encuentra el lugar perfecto 🌸
          </h1>

          <p style={styles.heroText}>
            Hospedajes únicos, cómodos y modernos.
          </p>

        </div>

        {/* CATEGORÍAS */}
        <h2 style={styles.sectionTitle}>
          Buscar por tipo de alojamiento
        </h2>

        <div style={styles.categoriesGrid}>

          {categories.map(c => (

            <div
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              style={styles.categoryCard}
            >

              <img
                src={c.imageUrl || "https://picsum.photos/300"}
                alt={c.name}
                style={styles.categoryImage}
              />

              <h4 style={{ padding: "10px" }}>
                {c.name}
              </h4>

            </div>

          ))}

        </div>

        {/* PRODUCTOS */}
        <h2 style={styles.sectionTitle}>
          Alojamientos
        </h2>

        <div style={styles.productsGrid}>

          {filteredProducts.map(product => (

            <div
              key={product.id}
              style={styles.card}
            >

              <img
                src={product.imageUrl || "https://picsum.photos/400"}
                alt={product.name}
                style={styles.image}
              />

              <div style={styles.cardContent}>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <button
                  style={styles.button}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Ver más
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    marginTop: "90px",
    padding: "20px",
    maxWidth: "1300px",
    marginInline: "auto"
  },

  hero: {
    background: "#fff5f8",
    padding: "60px 30px",
    borderRadius: "25px",
    textAlign: "center",
    marginBottom: "40px"
  },

  heroTitle: {
    fontSize: "45px",
    color: "#2b2b2b"
  },

  heroText: {
    color: "#666",
    marginTop: "10px"
  },

  sectionTitle: {
    marginTop: "40px",
    marginBottom: "20px",
    fontSize: "30px"
  },

  categoriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  categoryCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
  },

  categoryImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  },

  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 2px 15px rgba(0,0,0,0.08)"
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover"
  },

  cardContent: {
    padding: "20px"
  },

  button: {
    marginTop: "15px",
    background: "#ff6f91",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer"
  }

};