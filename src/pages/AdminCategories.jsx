import { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../components/Header";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const create = async () => {
    if (!name.trim()) {
      alert("Nombre requerido");
      return;
    }

    try {
      await api.post("/categories", {
        name,
        description,
        imageUrl: "https://via.placeholder.com/200",
      });

      setName("");
      setDescription("");

      load();

      alert("Categoría creada correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al crear categoría");
    }
  };

  const remove = async (id) => {
    const ok = window.confirm(
      "¿Eliminar categoría? Esto puede afectar productos."
    );

    if (!ok) return;

    try {
      await api.delete(`/categories/${id}`);

      load();

      alert("Categoría eliminada");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar categoría");
    }
  };

  return (
    <div>
      <Header />

      <div style={styles.container}>
        <h1 style={styles.title}>
          Gestión de Categorías
        </h1>

        <div style={styles.formCard}>
          <h2>Nueva Categoría</h2>

          <input
            placeholder="Nombre de la categoría"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />

          <button
            onClick={create}
            style={styles.createButton}
          >
            Crear Categoría
          </button>
        </div>

        <h2 style={styles.listTitle}>
          Categorías ({categories.length})
        </h2>

        <div style={styles.grid}>
          {categories.map((c) => (
            <div
              key={c.id}
              style={styles.card}
            >
              <div>
                <h3 style={styles.cardTitle}>
                  {c.name}
                </h3>

                <p style={styles.cardText}>
                  {c.description || "Sin descripción"}
                </p>
              </div>

              <button
                onClick={() => remove(c.id)}
                style={styles.deleteButton}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "100px auto 40px",
    padding: "20px",
  },

  title: {
    textAlign: "center",
    color: "#ff6f91",
    marginBottom: "30px",
  },

  formCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },

  textarea: {
    minHeight: "120px",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    resize: "vertical",
    fontSize: "15px",
  },

  createButton: {
    background: "#ff6f91",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  listTitle: {
    marginTop: "40px",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "15px",
  },

  cardTitle: {
    marginBottom: "10px",
    color: "#333",
  },

  cardText: {
    color: "#666",
    lineHeight: "1.5",
  },

  deleteButton: {
    border: "none",
    background: "#ff6f91",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};