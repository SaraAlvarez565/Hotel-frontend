import { useState, useEffect } from "react";
import api from "../services/api";

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

    try {

      await api.post("/products", {
        name,
        description,
        imageUrl,
        category: { id: categoryId }
      });

      setName("");
      setDescription("");
      setImageUrl("");
      setCategoryId("");

      load();

    } catch {
      alert("Error al crear producto");
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      load();
    } catch (e) {
      console.log(e);
      alert("Error eliminando producto");
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "ADMIN") {
      return (
        <div style={{ marginTop: "120px", textAlign: "center" }}>
          <h2>No autorizado</h2>
        </div>
      );
    }
  };


  return (
    <div>


      <div style={styles.container}>

        <h1 style={styles.title}>
          Panel Administrador
        </h1>

        <div style={styles.form}>

          <input
            style={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nombre"
          />

          <input
            style={styles.input}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descripción"
          />

          <input
            style={styles.input}
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="URL imagen"
          />

          <select
            style={styles.input}
            onChange={e => setCategoryId(e.target.value)}
          >

            <option value="">
              Categoría
            </option>

            {categories.map(c => (

              <option
                key={c.id}
                value={c.id}
              >
                {c.name}
              </option>

            ))}

          </select>


          <div style={styles.categoriesGrid}>
            {categories.map(c => (
              <div
                key={c.id}
                onClick={() => setCategoryId(c.id)}
                style={styles.categoryCard}
              >
                <img
                  src={c.imageUrl || "https://picsum.photos/200"}
                  style={styles.categoryImage}
                />

                <h4>{c.name}</h4>
              </div>
            ))}
          </div>

          <button
            style={styles.createButton}
            onClick={create}
          >
            Crear producto
          </button>

        </div>

        <div style={styles.grid}>

          {products.map(p => (

            <div
              key={p.id}
              style={styles.card}
            >

              <img
                src={p.imageUrl || "https://picsum.photos/400"}
                alt={p.name}
                style={styles.image}
              />

              <div style={{ padding: "20px" }}>

                <h3>{p.name}</h3>

                <p>{p.description}</p>

                <button
                  style={styles.deleteButton}
                  onClick={() => remove(p.id)}
                >
                  Eliminar
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
    marginTop: "100px",
    padding: "30px",
    maxWidth: "1200px",
    marginInline: "auto"
  },

  title: {
    fontSize: "35px",
    marginBottom: "30px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 2px 15px rgba(0,0,0,0.08)"
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd"
  },

  createButton: {
    background: "#ff6f91",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "12px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "40px",
    paddingBottom:"50px"
  },

  card: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  },

  deleteButton: {
    background: "#ff4d6d",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    marginTop: "10px",
    cursor: "pointer"
  }

};