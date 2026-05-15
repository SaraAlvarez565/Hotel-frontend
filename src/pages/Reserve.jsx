import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Reserve() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get(`/products/${id}`);
    setProduct(res.data);;

    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const confirm = async () => {

    try {

      await api.post("/reservations", {
        startDate: start,
        endDate: end,
        product: { id },
        user: { id: user.id }
      });

      navigate("/success");

    } catch {
      alert("Error en reserva");
    }
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div>

      <h2>Reservar: {product.name}</h2>

      {/* #29 usuario */}
      <p>{user?.name} {user?.lastname}</p>
      <p>{user?.email}</p>

      {/* #28 fechas */}
      <input type="date" onChange={e => setStart(e.target.value)} />
      <input type="date" onChange={e => setEnd(e.target.value)} />

      <p>
        Selección: {start} → {end}
      </p>

      <button onClick={confirm}>
        Confirmar reserva
      </button>

    </div>
  );
}
