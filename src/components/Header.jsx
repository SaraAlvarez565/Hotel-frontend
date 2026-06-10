import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const isMobile = window.innerWidth < 768;

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

      {isMobile && (
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      <nav
        style={{
          ...styles.nav,
          ...(isMobile
            ? {
                display: menuOpen
                  ? "flex"
                  : "none"
              }
            : {})
        }}
      >
        <Link
          to="/"
          style={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        {user && (
          <Link
            to="/favorites"
            style={styles.link}
            onClick={() => setMenuOpen(false)}
          >
            Favoritos
          </Link>
        )}

        {user?.role === "ADMIN" && (
          <Link
            to="/admin"
            style={styles.link}
            onClick={() => setMenuOpen(false)}
          >
            Admin
          </Link>
        )}

        {!user ? (
          <>
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              style={styles.loginBtn}
            >
              Login
            </button>

            <button
              onClick={() => {
                navigate("/register");
                setMenuOpen(false);
              }}
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
    padding: "14px 20px",
    background: "white",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ff6f91",
    cursor: "pointer"
  },

  hamburger: {
    border: "none",
    background: "transparent",
    fontSize: "28px",
    cursor: "pointer",
    color: "#ff6f91"
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "15px",

    position:
      window.innerWidth < 768
        ? "absolute"
        : "static",

    top: "70px",
    right: "20px",

    flexDirection:
      window.innerWidth < 768
        ? "column"
        : "row",

    background:
      window.innerWidth < 768
        ? "white"
        : "transparent",

    padding:
      window.innerWidth < 768
        ? "20px"
        : "0",

    borderRadius:
      window.innerWidth < 768
        ? "15px"
        : "0",

    boxShadow:
      window.innerWidth < 768
        ? "0 10px 30px rgba(0,0,0,0.1)"
        : "none"
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
    gap: "10px",
    flexDirection:
      window.innerWidth < 768
        ? "column"
        : "row"
  }
};