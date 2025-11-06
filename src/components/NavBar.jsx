import { Link } from "react-router-dom";
import "./style.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <h1>Home</h1>
          </Link>
        <div className="navbar-links">
          <Link to="/veiculos">Veículos</Link>
          <Link to="/grupos">Grupos</Link>
          <Link to="/empresas">Empresas</Link>
          <Link to="/planos">Planos</Link>
          <Link to="/associacoes">Associações</Link>
        </div>
      </div>
    </nav>
  );
}
