import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import VeiculosPage from "../pages/Veiculos";
import PlanosPage from "../pages/PlanosAssistencia";
import GruposPage from "../pages/GruposVeiculos";
import EmpresasPage from "../pages/EmpresasAssistencia";
import AssociacoesPage from "../pages/Associacoes";
import HomePage from "../pages/Home/HomePage";
import Navbar from "../components/NavBar";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/veiculos" element={<VeiculosPage />} />
        <Route path="/grupos" element={<GruposPage />} />
        <Route path="/empresas" element={<EmpresasPage />} />
        <Route path="/planos" element={<PlanosPage />} />
        <Route path="/associacoes" element={<AssociacoesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
