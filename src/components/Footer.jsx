export default function Footer() {

  return (

    <footer style={styles.footer}>

      <h3>🌸 StayBloom</h3>

      <p>
        Sentirte como en casa, donde sea que vayas
      </p>

      <p style={{ marginTop: "10px" }}>
        © 2026 StayBloom
      </p>

    </footer>
  );
}

const styles = {

  footer: {
    marginTop: "50px",
    background: "#2b2b2b",
    color: "white",
    padding: "40px",
    textAlign: "center"
  }

};