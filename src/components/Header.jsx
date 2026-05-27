import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);

  }, []);

  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <header style={styles.header}>

      <div
        onClick={() => navigate("/")}
        style={styles.logo}
      >
        🌸 StayBloom
      </div>

      <nav style={styles.nav}>

        <Link to="/" style={styles.link}>
          Home
        </Link>

        {user && (
          <Link to="/favorites" style={styles.link}>
            Favoritos
          </Link>
        )}

        {user?.role === "ADMIN" && (
          <Link to="/admin" style={styles.link}>
            Admin
          </Link>
        )}

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
          <div style={styles.userBox}>

            <span>
              Hola, {user.name}
            </span>

            <button
              onClick={logout}
              style={styles.logoutBtn}
            >
              Logout
            </button>

          </div>
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
    padding: "14px 25px",
    background: "white",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    flexWrap: "wrap"
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
    gap: "15px",
    flexWrap: "wrap"
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500"
  },

  loginBtn: {
    background: "#ff6f91",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  registerBtn: {
    background: "#ffe4ec",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  logoutBtn: {
    background: "#ff4d6d",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }
};

