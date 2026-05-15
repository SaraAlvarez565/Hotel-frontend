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
    await api.post("/categories", {
      name,
      description,
      imageUrl: "https://via.placeholder.com/200"
    });

    setName("");
    setDescription("");
    load();
  };

  const remove = async (id) => {
    const ok = window.confirm("¿Eliminar categoría? Esto puede afectar productos.");
    if (ok) {
      await api.delete(`/categories/${id}`);
      load();
    }
  };

  return (
    <div>

      <Header />

      <div style={{ marginTop: "80px", padding: "20px" }}>

        <h2>Categorías</h2>

        <input placeholder="Nombre" onChange={e => setName(e.target.value)} />
        <input placeholder="Descripción" onChange={e => setDescription(e.target.value)} />

        <button onClick={create}>Crear categoría</button>

        <h3>Lista</h3>

        {categories.map(c => (
          <div key={c.id} style={{ border: "1px solid #ccc", margin: "10px" }}>
            <h4>{c.name}</h4>
            <p>{c.description}</p>
            <button onClick={() => remove(c.id)}>Eliminar</button>
          </div>
        ))}

      </div>
    </div>
  );
}