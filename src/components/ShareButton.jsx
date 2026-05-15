export default function ShareButton({ product }) {

  const shareUrl = window.location.href;

  const text = `${product.name} - ${product.description}`;

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      "_blank"
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${text} ${shareUrl}`,
      "_blank"
    );
  };

  return (
    <div style={styles.shareBox}>

      <h4 style={styles.title}>
        Compartir producto
      </h4>

      <div style={styles.buttons}>

        <button
          style={styles.button}
          onClick={shareFacebook}
        >
          Facebook
        </button>

        <button
          style={styles.button}
          onClick={shareTwitter}
        >
          Twitter
        </button>

        <button
          style={styles.button}
          onClick={shareWhatsApp}
        >
          WhatsApp
        </button>

      </div>

    </div>
  );
}

const styles = {

  shareBox: {
    marginTop: "20px",
    background: "#fff5f8",
    padding: "20px",
    borderRadius: "15px"
  },

  title: {
    marginBottom: "10px",
    color: "#2b2b2b"
  },

  buttons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  button: {
    background: "#ff6f91",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer"
  }

};