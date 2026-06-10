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
        categoryId: Number(categoryId)
      });

      setName("");
      setDescription("");
      setImageUrl("");
      setCategoryId("");

      load();

    } catch (e) {
      console.log(e);
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
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Panel Administrador</h1>

      <div style={styles.form}>

        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" style={styles.input} />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" style={styles.input} />
        <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="URL imagen" style={styles.input} />

        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} style={styles.input}>
          <option value="">Categoría</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <Link to="/admin/categories">Administrar Categorías</Link>

        <button onClick={create} style={styles.createButton}>
          Crear producto
        </button>

      </div>

      <div style={styles.grid}>
        {products.map(p => (
          <div key={p.id} style={styles.card}>
            <img src={p.imageUrl} style={styles.image} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>

            <button onClick={() => remove(p.id)} style={styles.deleteButton}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: { marginTop: "100px", padding: "20px" },
  title: { fontSize: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px" },
  createButton: { background: "hotpink", color: "white", padding: "10px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" },
  card: { padding: "10px", border: "1px solid #ccc" },
  image: { width: "100%" },
  deleteButton: { background: "red", color: "white" }
};