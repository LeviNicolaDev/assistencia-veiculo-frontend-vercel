import { useEffect, useState } from "react";
import { api } from "../../api/api";
import "./style.css";

export default function VeiculoForm({ veiculo, onClose, onSaved }) {
  const [modelo, setModelo] = useState(veiculo?.modelo || "");
  const [placa, setPlaca] = useState(veiculo?.placa || "");
  const [grupoId, setGrupoId] = useState(veiculo?.grupoId || "");
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    api.get("/grupos").then(res => setGrupos(res.data.grupo));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { id: veiculo?.id, modelo, placa, grupoId };

    try {
      if (veiculo?.id) {
        await api.put(`/veiculos`, payload);
      } else {
        await api.post("/veiculos", payload);
      }
      onSaved();
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.errors) {
        const erros = error.response.data.errors;
        let mensagem = "";
        for (const campo in erros) {
          if (erros.hasOwnProperty(campo)) {
            mensagem += `${erros[campo].join(", \n")}\n`;
          }
        }
        window.alert(mensagem);
      } else {
        console.error("Erro ao salvar veiculo:", error);
        window.alert("Ocorreu um erro ao salvar o veículo.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>{veiculo?.id ? "Editar Veículo" : "Novo Veículo"}</h3>

      <label>Modelo</label>
      <input value={modelo} onChange={e => setModelo(e.target.value)} placeholder="Ex: Corolla, Onix..." />

      <label>Placa</label>
      <input value={placa} onChange={e => setPlaca(e.target.value)} placeholder="ABC-1234" />

      <label>Grupo</label>
      <select value={grupoId} onChange={e => setGrupoId(e.target.value)} required>
        <option value="">Selecione o Grupo</option>
        {grupos.map(g => (
          <option key={g.id} value={g.id}>{g.nome}</option>
        ))}
      </select>

      <div className="form-buttons">
        <button type="submit" className="btn-primary">Salvar</button>
        <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
      </div>
    </form>
  );
}
