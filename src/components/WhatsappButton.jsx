export default function WhatsAppButton() {

  const phone = "34600000000";

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      style={styles.button}
    >
      💬
    </a>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "green",
    color: "white",
    padding: "15px",
    borderRadius: "50%",
    fontSize: "20px",
    textDecoration: "none"
  }
};

