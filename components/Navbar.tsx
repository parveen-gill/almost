import Link from "next/link";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link href="/" className="logo">
        Almostus
      </Link>

      {/* Search bar */}
      <input type="text" placeholder="Search location..." className="search" />

      {/* Right side */}
      <div className="nav-links">
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
