import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function AssociacoesForm({ associacao, onClose, onSaved }) {
  const [veiculos, setVeiculos] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [veiculoId, setVeiculoId] = useState(associacao?.veiculoId || "");
  const [planoId, setPlanoId] = useState(associacao?.planoId || "");

  useEffect(() => {
    async function loadData() {
      try {
        const [resVeiculos, resPlanos] = await Promise.all([
          api.get("/veiculos"),
          api.get("/planos"),
        ]);
        setVeiculos(resVeiculos.data.veiculos);
        setPlanos(resPlanos.data.plano);
      } catch (error) {
        console.error("Erro ao carregar veículos/planos:", error);
      }
    }

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: associacao?.id,
      veiculoId,
      planoId,
    };

    try {
      if (associacao?.id) {
        await api.put("/assistencia/alterarAssociacao", payload);
      } else {
        await api.post(
          `/assistencia/AssociarVeiculosPorId?veiculoId=${veiculoId}&planoId=${planoId}`
        );
      }

      onSaved();
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.errors
      ) {
        const erros = error.response.data.errors;
        let mensagem = "";
        for (const campo in erros) {
          if (erros.hasOwnProperty(campo)) {
            mensagem += `${erros[campo].join(", \n")}\n`;
          }
        }
        window.alert(mensagem);
      } else {
        console.error("Erro ao salvar associação:", error);
        window.alert(
          error.response?.data?.mensagem ||
            "Ocorreu um erro ao salvar a associação."
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>{associacao?.id ? "Editar Associação" : "Nova Associação"}</h3>

      <label>Veiculo</label>
      <select value={veiculoId} onChange={(e) => setVeiculoId(e.target.value)} required >
        <option value="">Selecione o Veículo</option>
        {veiculos.map((v) => (
          <option key={v.id} value={v.id}>
            {v.modelo} ({v.placa})
          </option>
        ))}
      </select>

      <label>Plano</label>
      <select value={planoId} onChange={(e) => setPlanoId(e.target.value)} required >
        <option value="">Selecione o Plano</option>
        {planos.map((p) => (
          <option key={p.id} value={p.id}>
            {p.descricao}
          </option>
        ))}
      </select>

      <div className="form-buttons">
        <button type="submit" className="btn-primary"> {associacao?.id ? "Atualizar" : "Salvar"} </button>
        <button type="button" onClick={onClose} style={{ marginLeft: 10 }} className="btn-secondary"> Cancelar </button>
      </div>
    </form>
  );
}
