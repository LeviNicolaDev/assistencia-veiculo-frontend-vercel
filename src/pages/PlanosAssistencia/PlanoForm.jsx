import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function PlanoForm({ plano, onClose, onSaved }) {
  const [descricao, setDescricao] = useState(plano?.descricao || "");
  const [cobertura, setCobertura] = useState(plano?.cobertura || "");
  const [empresaId, setEmpresaId] = useState(plano?.empresaId || "");
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    api.get("/empresas").then(res => setEmpresas(res.data.empresas));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: plano?.id,
      descricao,
      cobertura,
      empresaId
    };
    try {
      if (plano?.id) {
        await api.put(`/planos`, payload);
      } else {
        await api.post("/planos", payload);
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
        console.error("Erro ao salvar plano de assistencia:", error);
        window.alert("Ocorreu um erro ao salvar um plano de assistencia.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}  className="form-container">
      <h3>{plano?.id ? "Editar Plano de Assistencia" : "Novo Plano de Assistencia"}</h3>

      <label>Descrição</label>
      <input value={descricao} onChange={e => setDescricao(e.target.value)}/>

      <label>Cobertura</label>
      <input value={cobertura} onChange={e => setCobertura(e.target.value)}/>

      <label>Selecione a Empresa</label>
      <select value={empresaId} onChange={e => setEmpresaId(e.target.value)} required>
        <option value="">Nome da Empresa</option>
        {empresas.map(e => (
          <option key={e.id} value={e.id}>{e.nome}</option>
        ))}
      </select>
      <div className="form-buttons">
        <button type="submit"  className="btn-primary">Salvar</button>
        <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
      </div>
    </form>
  );
}
