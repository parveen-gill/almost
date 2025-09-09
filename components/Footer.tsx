import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Almostus.in — Reconnect with the moments that almost slipped away.
    </footer>
  );
}
