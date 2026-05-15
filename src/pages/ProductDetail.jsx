import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import ShareButton from "../components/ShareButton";
import FavoriteButton from "../components/FavoriteButton";
export default function ProductDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [reservations, setReservations] = useState([]);

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [avg, setAvg] = useState(0);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        if (id) {
            loadProduct();
            loadReservations();
            loadReviews();
            loadAvg();
        }
    }, [id]);

    const loadProduct = async () => {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
    };

    const loadReservations = async () => {
        const res = await api.get(`/reservations/product/${id}`);
        setReservations(res.data);
    };

    const loadReviews = async () => {
        const res = await api.get(`/reviews/product/${id}`);
        setReviews(res.data);
    };

    const loadAvg = async () => {
        const res = await api.get(`/reviews/average/${id}`);
        setAvg(res.data);
    };

    const goReserve = () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            navigate("/login", {
                state: {
                    message: "Debes iniciar sesión para reservar"
                }
            });
            return;
        }

        navigate(`/reserve/${id}`);
    };

    const isDateBlocked = (start, end) => {

        return reservations.some(r => {

            const rStart = new Date(r.startDate);
            const rEnd = new Date(r.endDate);

            const newStart = new Date(start);
            const newEnd = new Date(end);

            return (newStart <= rEnd && newEnd >= rStart);
        });
    };

    const reserve = async () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            navigate("/login", {
                state: {
                    message: "Debes iniciar sesión para reservar"
                }
            });
            return;
        }

        if (!startDate || !endDate) {
            alert("Selecciona fechas");
            return;
        }

        if (isDateBlocked(startDate, endDate)) {
            alert("Estas fechas no están disponibles");
            return;
        }

        await api.post("/reservations", {
            startDate,
            endDate,
            product: { id },
            user: { id: user.id }
        });

        navigate("/success");
    };

    const sendReview = async () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Debes iniciar sesión");
            return;
        }

        await api.post("/reviews", {
            rating,
            comment,
            user: { id: user.id },
            product: { id }
        });

        setComment("");

        loadReviews();
        loadAvg();
    };

    if (!product) return <p>Cargando...</p>;

    return (
        <div>


            <div style={styles.container}>

                {/* HERO IMAGE */}
                <img
                    src={product.imageUrl || "https://picsum.photos/1200/500"}
                    alt={product.name}
                    style={styles.heroImage}
                />

                {/* TITLE */}
                <h1 style={styles.title}>
                    {product.name}
                </h1>

                {/* DESCRIPTION */}
                <p style={styles.description}>
                    {product.description || "Sin descripción"}
                </p>

                {/* SHARE */}
                <div style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px"
                }}>

                    <ShareButton product={product} />

                    <FavoriteButton productId={product.id} />

                </div>


                <div style={styles.bookingWrapper}>

                    <div style={styles.bookingLeft}>

                        <h2 style={styles.bookingTitle}>
                            Reserva este alojamiento ✨
                        </h2>

                        <p style={styles.bookingSubtitle}>
                            Disfruta una experiencia cómoda, moderna y segura.
                        </p>

                        <div style={styles.inputsRow}>

                            <div style={styles.inputBox}>

                                <label style={styles.label}>
                                    Check-in
                                </label>

                                <input
                                    type="date"
                                    style={styles.bookingInput}
                                    onChange={e => setStartDate(e.target.value)}
                                />

                            </div>

                            <div style={styles.inputBox}>

                                <label style={styles.label}>
                                    Check-out
                                </label>

                                <input
                                    type="date"
                                    style={styles.bookingInput}
                                    onChange={e => setEndDate(e.target.value)}
                                />

                            </div>

                        </div>

                    </div>

                    <div style={styles.bookingRight}>

                        <button
                            style={styles.reserveBigButton}
                            onClick={reserve}
                        >
                            Reservar ahora
                        </button>

                    </div>

                </div>




                {/* CARACTERÍSTICAS */}
                <div style={styles.section}>

                    <h3>Características</h3>

                    <div style={styles.featuresGrid}>

                        {product.features?.length > 0 ? (

                            product.features.map(f => (
                                <div
                                    key={f.id}
                                    style={styles.featureCard}
                                >

                                    <span style={{ fontSize: "25px" }}>
                                        {f.icon || "✨"}
                                    </span>

                                    <p>{f.name}</p>

                                </div>
                            ))

                        ) : (

                            <>
                                <div style={styles.featureCard}>📶 Wifi</div>
                                <div style={styles.featureCard}>🏊 Piscina</div>
                                <div style={styles.featureCard}>🍽 Restaurante</div>
                                <div style={styles.featureCard}>🚗 Parqueadero</div>
                            </>

                        )}

                    </div>

                </div>

                {/* DISPONIBILIDAD */}
                <div style={styles.section}>

                    <h3>Fechas ocupadas</h3>

                    {reservations.length > 0 ? (

                        reservations.map((r, i) => (
                            <div
                                key={i}
                                style={styles.reservationCard}
                            >
                                {r.startDate} → {r.endDate}
                            </div>
                        ))

                    ) : (

                        <p>No hay reservas aún</p>

                    )}

                </div>

                {/* REVIEWS */}
                <div style={styles.section}>

                    <h3>
                        ⭐ Calificación promedio: {avg}
                    </h3>

                    <div style={styles.reviewForm}>

                        <select
                            style={styles.input}
                            value={rating}
                            onChange={e => setRating(Number(e.target.value))}
                        >
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>

                        <input
                            style={styles.input}
                            placeholder="Comentario"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />

                        <button
                            style={styles.confirmButton}
                            onClick={sendReview}
                        >
                            Enviar reseña
                        </button>

                    </div>

                    <h4 style={{ marginTop: "20px" }}>
                        Reseñas
                    </h4>

                    {reviews.length === 0 && (
                        <p>No hay reseñas todavía</p>
                    )}

                    {reviews.map(r => (

                        <div
                            key={r.id}
                            style={styles.reviewCard}
                        >

                            <p>⭐ {r.rating}</p>

                            <p>{r.comment}</p>

                            <small>{r.date}</small>

                        </div>

                    ))}

                </div>

                {/* POLÍTICAS */}
                <div style={styles.policies}>

                    <h3 style={styles.policyTitle}>
                        Políticas del producto
                    </h3>

                    <div style={styles.policyGrid}>

                        <div style={styles.policyCard}>
                            <h4>Cancelación</h4>
                            <p>
                                Cancelación gratuita hasta 24 horas antes.
                            </p>
                        </div>

                        <div style={styles.policyCard}>
                            <h4>Check-in</h4>
                            <p>
                                Disponible desde las 3:00 PM.
                            </p>
                        </div>

                        <div style={styles.policyCard}>
                            <h4>Check-out</h4>
                            <p>
                                Hasta las 11:00 AM.
                            </p>
                        </div>

                        <div style={styles.policyCard}>
                            <h4>Normas</h4>
                            <p>
                                No se permiten mascotas ni fumar.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

const styles = {

    container: {
        marginTop: "80px",
        padding: "20px",
        maxWidth: "1200px",
        marginInline: "auto"
    },

    heroImage: {
        width: "100%",
        height: "420px",
        objectFit: "cover",
        borderRadius: "20px",
        marginBottom: "25px"
    },

    title: {
        fontSize: "40px",
        marginBottom: "10px",
        color: "#2b2b2b"
    },

    description: {
        fontSize: "17px",
        color: "#666",
        lineHeight: "1.7"
    },

    reserveButton: {
        marginTop: "20px",
        padding: "15px 25px",
        border: "none",
        borderRadius: "12px",
        background: "#ff6f91",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer"
    },

    section: {
        marginTop: "40px"
    },

    dateContainer: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "15px"
    },

    input: {
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        minWidth: "200px"
    },

    confirmButton: {
        marginTop: "15px",
        padding: "12px 20px",
        border: "none",
        borderRadius: "10px",
        background: "#2b2b2b",
        color: "white",
        cursor: "pointer"
    },

    featuresGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "15px",
        marginTop: "20px"
    },

    featureCard: {
        background: "#fff5f8",
        borderRadius: "15px",
        padding: "20px",
        textAlign: "center",
        fontWeight: "bold"
    },

    reservationCard: {
        background: "#f5f5f5",
        padding: "12px",
        borderRadius: "10px",
        marginTop: "10px"
    },

    reviewForm: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "15px"
    },

    reviewCard: {
        background: "white",
        padding: "15px",
        borderRadius: "15px",
        marginTop: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
    },

    policies: {
        width: "100%",
        marginTop: "40px",
        padding: "25px",
        background: "#f5f5f5",
        borderRadius: "20px"
    },

    policyTitle: {
        marginBottom: "20px"
    },

    policyGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "15px"
    },

    policyCard: {
        background: "white",
        padding: "20px",
        borderRadius: "15px"
    },

    bookingCard: {
        marginTop: "40px",
        background: "white",
        padding: "30px",
        borderRadius: "25px",
        boxShadow: "0 2px 15px rgba(0,0,0,0.08)"
    },

    bookingTitle: {
        fontSize: "28px",
        marginBottom: "10px",
        color: "#2b2b2b"
    },

    bookingText: {
        color: "#666",
        marginBottom: "25px"
    },

    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },

    reserveMainButton: {
        marginTop: "25px",
        width: "100%",
        padding: "16px",
        border: "none",
        borderRadius: "15px",
        background: "#ff6f91",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s"
    },

    bookingWrapper: {
    marginTop: "40px",
    background: "white",
    borderRadius: "30px",
    padding: "35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    flexWrap: "wrap",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
},

bookingLeft: {
    flex: 1,
    minWidth: "280px"
},

bookingRight: {
    display: "flex",
    alignItems: "center"
},

bookingTitle: {
    fontSize: "32px",
    marginBottom: "10px",
    color: "#2b2b2b"
},

bookingSubtitle: {
    color: "#777",
    marginBottom: "25px",
    lineHeight: "1.6"
},

inputsRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
},

inputBox: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
},

label: {
    fontSize: "14px",
    color: "#555",
    fontWeight: "600"
},

bookingInput: {
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #eee",
    minWidth: "220px",
    fontSize: "15px",
    background: "#fafafa"
},

reserveBigButton: {
    background: "linear-gradient(135deg, #ff6f91, #ff8fab)",
    color: "white",
    border: "none",
    padding: "18px 35px",
    borderRadius: "18px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(255,111,145,0.3)",
    transition: "0.3s"
},

};

