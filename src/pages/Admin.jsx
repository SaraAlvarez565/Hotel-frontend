import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Admin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    load();
    loadCategories();
  }, []);

  const load = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const create = async () => {
    if (!name.trim() || !description.trim() || !categoryId) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await api.post("/products", {
        name,
        description,
        imageUrl,
        categoryId: Number(categoryId),
      });

      setName("");
      setDescription("");
      setImageUrl("");
      setCategoryId("");

      load();

      alert("Producto creado correctamente");
    } catch (e) {
      console.log(e);
      alert("Error al crear producto");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;

    try {
      await api.delete(`/products/${id}`);
      load();
    } catch (e) {
      console.log(e);
      alert("Error eliminando producto");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Panel Administrador</h1>

      <div style={styles.formCard}>
        <h2>Crear nuevo producto</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          style={styles.input}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          style={styles.textarea}
        />

        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL imagen"
          style={styles.input}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={styles.input}
        >
          <option value="">Selecciona categoría</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <Link style={styles.link} to="/admin/categories">
          Administrar categorías
        </Link>

        <button onClick={create} style={styles.createButton}>
          Crear producto
        </button>
      </div>

      <h2 style={{ marginTop: "40px" }}>
        Productos ({products.length})
      </h2>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={
                p.imageUrl ||
                "https://via.placeholder.com/400x250"
              }
              alt={p.name}
              style={styles.image}
            />

            <h3>{p.name}</h3>

            <p style={styles.description}>
              {p.description}
            </p>

            <button
              onClick={() => remove(p.id)}
              style={styles.deleteButton}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1300px",
    margin: "100px auto 50px",
    padding: "20px",
  },

  title: {
    textAlign: "center",
    marginBottom: "35px",
    color: "#ff6f91",
    fontSize: window.innerWidth < 768 ? "30px" : "42px",
    fontWeight: "700",
  },

  formCard: {
    background: "#ffffff",
    padding: window.innerWidth < 768 ? "20px" : "35px",
    borderRadius: "25px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "900px",
    margin: "0 auto",
  },

  input: {
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    fontSize: "15px",
    outline: "none",
  },

  textarea: {
    minHeight: "140px",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    fontSize: "15px",
    resize: "vertical",
    outline: "none",
  },

  createButton: {
    background: "#ff6f91",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    transition: "0.3s",
  },

  link: {
    color: "#ff6f91",
    fontWeight: "600",
    textDecoration: "none",
  },

  grid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns:
      window.innerWidth < 768
        ? "1fr"
        : "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
  },

  image: {
    width: "100%",
    height: window.innerWidth < 768 ? "200px" : "240px",
    objectFit: "cover",
  },

  description: {
    padding: "0 18px",
    color: "#666",
    lineHeight: "1.6",
    flexGrow: 1,
  },

  deleteButton: {
    width: "100%",
    border: "none",
    background: "#ff6f91",
    color: "white",
    padding: "15px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
  },
};