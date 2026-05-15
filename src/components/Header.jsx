import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  {
    user?.role === "ADMIN" && (
      <Link to="/admin">Admin</Link>
    )
  }

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };



  return (

    <header style={styles.header}>

      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        style={styles.logo}
      >
        🌸 StayBloom
      </div>

      {/* NAV */}
      <nav style={styles.nav}>

        <Link to="/" style={styles.link}>
          Home
        </Link>

        {user && (
          <Link to="/favorites" style={styles.link}>
            Favoritos
          </Link>
        )}

        {user && (
          <Link to="/history" style={styles.link}>
            Reservas
          </Link>
        )}

        {/* ADMIN */}
        {user?.role === "ADMIN" && (
          <Link to="/admin" style={styles.adminLink}>
            Admin
          </Link>
        )}

        {/* NO LOGUEADO */}
        {!user ? (
          <>

            <button
              onClick={() => navigate("/login")}
              style={styles.loginBtn}
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              style={styles.registerBtn}
            >
              Register
            </button>

          </>
        ) : (

          <>
            <span style={styles.userName}>
              Hola, {user.name}
            </span>

            <button
              onClick={logout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </>
        )}

      </nav>

    </header>
  );
}

const styles = {

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "white",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    flexWrap: "wrap",
    gap: "10px"
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ff6f91",
    cursor: "pointer"
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap"
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500"
  },

  adminLink: {
    textDecoration: "none",
    color: "#ff4d6d",
    fontWeight: "bold"
  },

  loginBtn: {
    border: "none",
    background: "#ff6f91",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  registerBtn: {
    border: "none",
    background: "#ffe4ec",
    color: "#333",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  logoutBtn: {
    border: "none",
    background: "#2b2b2b",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  userName: {
    color: "#555",
    fontWeight: "500"
  }
};