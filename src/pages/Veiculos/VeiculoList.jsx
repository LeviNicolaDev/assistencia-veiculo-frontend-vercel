import { useEffect, useState } from "react";
import { api } from "../../api/api";
import "./style.css";

export default function VeiculoList({ onEdit }) {
  const [veiculos, setVeiculos] = useState([]);
  const [grupos, setGrupos] = useState([]);

  const loadData = async () => {
    try {
      const resVeiculos = await api.get("/veiculos");
      setVeiculos(resVeiculos.data.veiculos);

      const resGrupos = await api.get("/grupos");
      setGrupos(resGrupos.data.grupo);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const deleteItem = async (id) => {
    await api.delete(`/veiculos/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const getNomeGrupo = (grupoId) => {
    const grupo = grupos.find(g => g.id === grupoId);
    return grupo ? grupo.nome : "—";
  };

  return (
    <div className="container">
      <h2>Veículos</h2>
      <button onClick={() => onEdit({})}>Novo</button>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Placa</th>
            <th>Grupo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.length > 0 ? (
            veiculos.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.modelo}</td>
              <td>{v.placa}</td>
              <td>{getNomeGrupo(v.grupoId)}</td>
              <td>
                <button onClick={() => onEdit(v)}>Editar</button>
                <button onClick={() => deleteItem(v.id)}>Excluir</button>
              </td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan="4" align="center">
                Nenhum veiculo encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}