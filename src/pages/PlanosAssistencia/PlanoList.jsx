import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function PlanoList({ onEdit }) {
  const [planos, setPlanos] = useState([]);
  const [empresas, setEmpresas] = useState([]);

  const loadData = async () => {
    try {
      const resPlanos = await api.get("/planos");
      setPlanos(resPlanos.data.plano || []);

      const resEmpresas = await api.get("/empresas");
      setEmpresas(resEmpresas.data.empresas || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const deleteItem = async (id) => {
    await api.delete(`/planos/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const getNomeEmpresa = (empresaId) => {
    const empresa = empresas.find(e => e.id === empresaId);
    return empresa ? empresa.nome : "—";
  };

  return (
    <div className="container">
      <h2>Planos de Assistência</h2>
      <button onClick={() => onEdit({})}>Novo Plano de Assistência</button>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Cobertura</th>
            <th>Empresa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {planos.length > 0 ? (
            planos.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.descricao}</td>
              <td>{e.cobertura}</td>
              <td>{getNomeEmpresa(e.empresaId)}</td>
              <td>
                <button onClick={() => onEdit(e)}>Editar</button>
                <button onClick={() => deleteItem(e.id)}>Excluir</button>
              </td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan="4" align="center">
                Nenhum plano encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}