import { useEffect, useState } from "react";
import api from "../services/api";

export default function ReservationHistory() {

  const [reservations, setReservations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    load();
  }, []);

  const load = async () => {

    const res = await api.get(
      `/reservations/user/${user.id}`
    );

    setReservations(res.data);
  };

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        Mis reservas 🌸
      </h1>

      <div style={styles.grid}>

        {reservations.map(r => (

          <div
            key={r.id}
            style={styles.card}
          >

            <h3>{r.product.name}</h3>

            <p>
              {r.startDate}
            </p>

            <p>
              {r.endDate}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

const styles = {

  container: {
    marginTop: "120px",
    padding: "20px"
  },

  title: {
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
  }
};