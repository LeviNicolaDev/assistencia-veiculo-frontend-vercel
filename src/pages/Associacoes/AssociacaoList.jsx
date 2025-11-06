import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function AssociacoesList({ onEdit, onNova }) {
  const [associacoes, setAssociacoes] = useState([]);

  const loadData = async () => {
    try {
      const res = await api.get("/assistencia/Listar");
      setAssociacoes(res.data.associacoes);
    } catch (error) {
      console.error("Erro ao carregar associações:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja desassociar este veículo?")) return;
    try {
      await api.delete(`/assistencia/desassociar/${id}`);
      loadData();
    } catch (error) {
      console.error("Erro ao desassociar:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h2>Associações de Veículos e Planos</h2>
      <button onClick={onNova}>Nova Associação</button>

      <table border="1" cellPadding="8" style={{ marginTop: 10, width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Veículo</th>
            <th>Plano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {associacoes.length > 0 ? (
            associacoes.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>
                  {a.veiculo
                    ? `${a.veiculo.modelo} (${a.veiculo.placa})`
                    : `ID: ${a.veiculoId}`}
                </td>
                <td>
                  {a.plano ? a.plano.descricao : `ID: ${a.planoId}`}
                </td>
                <td>
                  <button onClick={() => onEdit(a)}>Editar</button>{" "}
                  <button onClick={() => handleDelete(a.id)}>Desassociar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" align="center">
                Nenhuma associação encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
