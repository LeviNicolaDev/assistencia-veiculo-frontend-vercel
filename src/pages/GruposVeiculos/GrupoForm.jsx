import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function GrupoForm({ grupo, onClose, onSaved }) {
  const [nome, setNome] = useState(grupo?.nome || "");
  const [descricao, setDescricao] = useState(grupo?.descricao || "");

const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        id: grupo?.id,
        nome,
        descricao
        };

    try 
    {
      if (grupo?.id) {
        await api.put(`/grupos`, payload);
      } else {
        await api.post("/grupos", payload);
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

        window.alert(mensagem); // mais tarde posso exibir de outra forma no UI
      } else {
        console.error("Erro ao salvar grupo:", error);
        window.alert("Ocorreu um erro ao salvar o grupo de veiculos.");
      }
    }
};


  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>{grupo?.id ? "Editar Grupo" : "Novo Grupo"}</h3>

      <label>Nome</label>
      <input value={nome} onChange={e => setNome(e.target.value)} />

      <label>Descrição</label>
      <input value={descricao} onChange={e => setDescricao(e.target.value)}/>
      
      <div className="form-buttons">
        <button type="submit"  className="btn-primary">Salvar</button>
        <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
      </div>
    </form>
  );
}
