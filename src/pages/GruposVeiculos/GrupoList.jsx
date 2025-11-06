import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function GruposList({ onEdit }) {
    const [grupos, setGrupos] = useState([]);

    const loadData = async () => {
    try {
        const resGrupos = await api.get("/grupos");
        setGrupos(resGrupos.data.grupo);
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
    };

  const deleteItem = async (id) => {
    await api.delete(`/grupos/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h2>Grupos de Veículos</h2>
      <button onClick={() => onEdit({})}>Novo Grupo</button>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {grupos.length > 0 ? (
            grupos.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.nome}</td>
              <td>{v.descricao}</td>
              <td>
                <button onClick={() => onEdit(v)}>Editar</button>
                <button onClick={() => deleteItem(v.id)}>Excluir</button>
              </td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan="4" align="center">
                Nenhum grupo encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
