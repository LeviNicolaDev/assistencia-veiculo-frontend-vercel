import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function EmpresasList({ onEdit }) {
  const [empresas, setEmpresas] = useState([]);

  const loadData = async () => {
    try {
        const resEmpresas = await api.get("/empresas");
        setEmpresas(resEmpresas.data.empresas);
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
  };

  const deleteItem = async (id) => {
    await api.delete(`/empresas/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h2>Lista de Empresas</h2>
      <button onClick={() => onEdit({})}>Nova Empresa</button>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.length > 0 ? (
            empresas.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.nome}</td>
              <td>{e.endereco}</td>
              <td>
                <button onClick={() => onEdit(e)}>Editar</button>
                <button onClick={() => deleteItem(e.id)}>Excluir</button>
              </td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan="4" align="center">
                Nenhuma empresa encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
